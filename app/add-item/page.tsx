"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";

export default function AddItem() {
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setShowErrorModal(false);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token missing.");
      }

      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wardrobe-items`
      );
      url.searchParams.append("item_category", category.toUpperCase());
      url.searchParams.append("item_type", type.toUpperCase());
      url.searchParams.append("item_brand", brand);
      url.searchParams.append("item_size", size.toUpperCase());
      url.searchParams.append("item_color", color.toUpperCase());

      const body = new FormData();
      if (image) {
        body.append("image", image);
      }

      const res = await fetch(url.toString(), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      const data = await res.json();

      if (data.success) {
        setShowSuccessModal(true);
      } else {
        throw new Error(data.detail || "Failed to add item");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add item");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    router.push("/wardrobe");
  };

  return (
    <ProtectedRoute>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center min-h-screen px-4 mt-24 sm:mt-24 lg:mt-0"
      >
        <div className="space-y-8 max-w-2xl w-full">
          <div className="pb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-2">
              Add Item
            </h2>
            <p className="text-gray-600 text-sm">
              Add details about the item you want to add to your wardrobe.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-base font-medium text-gray-800 mb-2"
                >
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="block w-full px-4 py-4 border border-gray-300 rounded-lg text-gray-700 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="type"
                  className="block text-base font-medium text-gray-800 mb-2"
                >
                  Type
                </label>
                <input
                  id="type"
                  name="type"
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="block w-full px-4 py-4 border border-gray-300 rounded-lg text-gray-700 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="brand"
                  className="block text-base font-medium text-gray-800 mb-2"
                >
                  Brand
                </label>
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="block w-full px-4 py-4 border border-gray-300 rounded-lg text-gray-700 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="size"
                  className="block text-base font-medium text-gray-800 mb-2"
                >
                  Size
                </label>
                <input
                  id="size"
                  name="size"
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="block w-full px-4 py-4 border border-gray-300 rounded-lg text-gray-700 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="color"
                  className="block text-base font-medium text-gray-800 mb-2"
                >
                  Color
                </label>
                <input
                  id="color"
                  name="color"
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="block w-full px-4 py-4 border border-gray-300 rounded-lg text-gray-700 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="image"
                  className="block text-base font-medium text-gray-800 mb-2"
                >
                  Image
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200 transition cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-end gap-3">
              <button
                type="button"
                onClick={() => router.push("/wardrobe")}
                className="w-full sm:w-auto flex-1 bg-gray-300 text-gray-800 text-base font-medium py-2 px-5 rounded-md shadow hover:bg-gray-400 focus:ring-2 focus:ring-gray-300 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto flex-1 bg-indigo-600 text-white text-base font-medium py-2 px-5 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <SuccessModal
        show={showSuccessModal}
        onClose={handleModalClose}
        message="Item added successfully!"
      />

      <ErrorModal
        show={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message={error}
      />
    </ProtectedRoute>
  );
}
