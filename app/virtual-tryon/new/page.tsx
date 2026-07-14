"use client";

import { useEffect, useState, FormEvent } from "react";
import Image from "next/image";
import Loader from "./Loader";
import ErrorModal from "@/app/components/ErrorModal";
import ResultModal from "./ResultModal";
import { useRouter } from "next/navigation";

type ResultData = {
  human_image_url: string;
  garment_image_url: string;
  result_image_url: string;
};

type WardrobeItem = {
  id: string;
  category: string;
  type: string;
  brand: string;
  color: string;
  image_url: string;
};

const MAX_UPLOAD_DIMENSION = 1280;
const MAX_UPLOAD_BYTES = 1_000_000;
const JPEG_QUALITY = 0.82;

function loadImage(sourceUrl: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new window.Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load image for upload."));
    image.src = sourceUrl;
  });
}

async function optimizeUploadImage(file: File) {
  if (file.size <= MAX_UPLOAD_BYTES) {
    return file;
  }

  const objectUrl = URL.createObjectURL(file);

  try {
    const image = await loadImage(objectUrl);
    const longestSide = Math.max(image.naturalWidth, image.naturalHeight);
    const scale = Math.min(1, MAX_UPLOAD_DIMENSION / longestSide);

    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext("2d");
    if (!context) {
      return file;
    }

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);
    context.drawImage(image, 0, 0, width, height);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/jpeg", JPEG_QUALITY);
    });

    if (!blob) {
      return file;
    }

    const baseName = file.name.replace(/\.[^.]+$/, "") || "upload";
    return new File([blob], `${baseName}.jpg`, { type: "image/jpeg" });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export default function VirtualTryOnForm() {
  const [humanImage, setHumanImage] = useState<File | null>(null);
  const [garmentImage, setGarmentImage] = useState<File | null>(null);
  const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>([]);
  const [selectedWardrobeItemId, setSelectedWardrobeItemId] = useState("");
  const [wardrobeLoading, setWardrobeLoading] = useState(false);
  const [wardrobeError, setWardrobeError] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultData, setResultData] = useState<ResultData | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchWardrobeItems = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        setWardrobeLoading(true);
        setWardrobeError("");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wardrobe-items`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (response.ok && data.success) {
          setWardrobeItems(data.data.items ?? []);
        } else {
          setWardrobeError(data.detail || "Failed to load wardrobe items.");
        }
      } catch {
        setWardrobeError("Failed to load wardrobe items.");
      } finally {
        setWardrobeLoading(false);
      }
    };

    fetchWardrobeItems().catch(console.error);
  }, []);

  const formatWardrobeItemLabel = (item: WardrobeItem) =>
    [item.brand, item.category, item.type, item.color]
      .filter(Boolean)
      .join(" · ");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setMessage("");
    setShowError(false);
    setShowResultModal(false);
    setResultData(null);

    if (!humanImage) {
      setMessage("Human image is required.");
      setShowError(true);
      return;
    }

    if (!garmentImage && !selectedWardrobeItemId) {
      setMessage("All fields are required.");
      setShowError(true);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Authorization token missing.");
      setShowError(true);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      const optimizedHumanImage = await optimizeUploadImage(humanImage);
      formData.append("human_image", optimizedHumanImage);

      if (selectedWardrobeItemId) {
        const selectedItem = wardrobeItems.find(
          (item) => item.id === selectedWardrobeItemId,
        );

        if (!selectedItem) {
          throw new Error("Selected wardrobe item could not be found.");
        }

        const imageResponse = await fetch(
          `/api/image-proxy?url=${encodeURIComponent(selectedItem.image_url)}`,
        );
        if (!imageResponse.ok) {
          throw new Error("Failed to load the selected wardrobe image.");
        }

        const imageBlob = await imageResponse.blob();
        const fileExtension = imageBlob.type.split("/")[1] || "jpg";
        const garmentFile = new File(
          [imageBlob],
          `${selectedItem.category || "wardrobe-item"}-${selectedItem.id}.${fileExtension}`,
          { type: imageBlob.type || "image/jpeg" },
        );

        formData.append(
          "garment_image",
          await optimizeUploadImage(garmentFile),
        );
      } else if (garmentImage) {
        formData.append(
          "garment_image",
          await optimizeUploadImage(garmentImage),
        );
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/virtual-tryon`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        },
      );

      const data = await res.json();

      if (res.ok && data.success) {
        const { human_image_url, garment_image_url, result_image_url } =
          data.data;
        setResultData({ human_image_url, garment_image_url, result_image_url });
        setShowResultModal(true);
      } else {
        throw new Error(data.detail || "Try-on failed.");
      }
    } catch (err) {
      setMessage(
        err instanceof Error ? err.message : "Unknown error occurred.",
      );
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <ResultModal show={showResultModal} result={resultData} />
      <ErrorModal
        show={showError}
        message={message}
        onClose={() => setShowError(false)}
      />

      <div className="flex h-screen justify-center items-center mt-6">
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            New Virtual Try-on
          </h2>
          <p className="text-gray-600 text-sm">
            Upload a human image and choose a garment from your wardrobe or
            upload a custom file.
          </p>

          <div>
            <label
              htmlFor="humanImage"
              className="block text-base font-medium text-gray-800 mb-2"
            >
              Human Image
            </label>
            <input
              id="humanImage"
              type="file"
              accept="image/*"
              onChange={(e) => setHumanImage(e.target.files?.[0] || null)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200 transition cursor-pointer"
            />
          </div>

          <div>
            <label
              htmlFor="garmentImage"
              className="block text-base font-medium text-gray-800 mb-2"
            >
              Garment Image
            </label>
            <div className="space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Choose from wardrobe
                </label>
                {wardrobeLoading && (
                  <p className="mt-2 text-xs text-gray-500">
                    Loading wardrobe items...
                  </p>
                )}
                {wardrobeError && (
                  <p className="mt-2 text-xs text-amber-600">{wardrobeError}</p>
                )}
                {!wardrobeLoading &&
                  wardrobeItems.length === 0 &&
                  !wardrobeError && (
                    <p className="text-sm text-gray-500">
                      No wardrobe items available yet.
                    </p>
                  )}
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {wardrobeItems.map((item) => {
                    const isSelected = selectedWardrobeItemId === item.id;

                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setSelectedWardrobeItemId(item.id);
                          setGarmentImage(null);
                        }}
                        className={`group overflow-hidden rounded-xl border bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                          isSelected
                            ? "border-indigo-500 ring-2 ring-indigo-200"
                            : "border-gray-200"
                        }`}
                        aria-pressed={isSelected}
                      >
                        <div className="relative aspect-[4/3] w-full bg-gray-100">
                          <Image
                            src={item.image_url}
                            alt={
                              formatWardrobeItemLabel(item) || "Wardrobe item"
                            }
                            fill
                            className="object-cover transition duration-300 group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, 50vw"
                          />
                        </div>
                        <div className="space-y-1 p-3">
                          <p className="text-sm font-semibold text-gray-900">
                            {item.brand || "Wardrobe Item"}
                          </p>
                          <p className="text-xs uppercase tracking-wide text-gray-500">
                            {[item.category, item.type, item.color]
                              .filter(Boolean)
                              .join(" · ") || item.id}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  or
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              <div>
                <label
                  htmlFor="garmentUpload"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Upload garment file
                </label>
                <input
                  id="garmentUpload"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    setGarmentImage(e.target.files?.[0] || null);
                    if (e.target.files?.[0]) {
                      setSelectedWardrobeItemId("");
                    }
                  }}
                  className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 transition file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-indigo-100 file:px-4 file:py-2 file:text-indigo-600 hover:file:bg-indigo-200"
                />
                <p className="mt-2 text-xs text-gray-500">
                  Uploading a file will be used instead of the wardrobe picker.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={() => router.push("/virtual-tryon")}
              className="w-full sm:w-auto flex-1 bg-gray-300 text-gray-800 text-base font-medium py-2 px-5 rounded-md shadow hover:bg-gray-400 focus:ring-2 focus:ring-gray-300 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto flex-1 bg-indigo-600 text-white text-base font-medium py-2 px-5 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={loading}
            >
              {loading ? "Processing..." : "Start Try-on"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
