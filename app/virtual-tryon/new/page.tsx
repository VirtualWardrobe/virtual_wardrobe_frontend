"use client";

import { useState, FormEvent } from "react";
import Loader from "./Loader";
import ErrorModal from "@/app/components/ErrorModal";
import ResultModal from "./ResultModal";
import { useRouter } from "next/navigation";

type ResultData = {
  human_image_url: string;
  garment_image_url: string;
  result_image_url: string;
};

export default function VirtualTryOnForm() {
  const [humanImage, setHumanImage] = useState<File | null>(null);
  const [garmentImage, setGarmentImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [resultData, setResultData] = useState<ResultData | null>(null);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setMessage("");
    setShowError(false);
    setShowResultModal(false);
    setResultData(null);

    if (!humanImage || !garmentImage) {
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
      formData.append("human_image", humanImage);
      formData.append("garment_image", garmentImage);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/virtual-tryon`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
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
        err instanceof Error ? err.message : "Unknown error occurred."
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

      <div className="flex h-screen justify-center items-center -mt-6 p-4">
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
          <h2 className="text-3xl font-semibold text-gray-900 mb-2">
            New Virtual Try-on
          </h2>
          <p className="text-gray-600 text-sm">
            Upload a human image and garment, and select the type of try-on
            you&apos;d like to perform.
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
            <input
              id="garmentImage"
              type="file"
              accept="image/*"
              onChange={(e) => setGarmentImage(e.target.files?.[0] || null)}
              className="block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200 transition cursor-pointer"
            />
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
