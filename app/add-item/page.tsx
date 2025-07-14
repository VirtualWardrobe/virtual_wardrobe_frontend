"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import ProtectedRoute from "../components/ProtectedRoute";
import SuccessModal from "../components/SuccessModal";

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

  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authorization token missing.");
        setLoading(false);
        return;
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
      <form onSubmit={handleSubmit}>
        <div className="space-y-12 mt-24">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-2xl font-semibold text-gray-900">Add Item</h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Add details about the item you want to add to your wardrobe.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-900"
                >
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-900"
                >
                  Type
                </label>
                <input
                  id="type"
                  name="type"
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="brand"
                  className="block text-sm font-medium text-gray-900"
                >
                  Brand
                </label>
                <input
                  id="brand"
                  name="brand"
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="size"
                  className="block text-sm font-medium text-gray-900"
                >
                  Size
                </label>
                <input
                  id="size"
                  name="size"
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="color"
                  className="block text-sm font-medium text-gray-900"
                >
                  Color
                </label>
                <input
                  id="color"
                  name="color"
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-900"
                >
                  Image
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files?.[0] || null)}
                  className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-4 text-red-600 text-sm font-medium">{error}</p>
        )}

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link href="/wardrobe">
            <button
              type="button"
              className="text-sm font-semibold text-gray-900 cursor-pointer"
            >
              Cancel
            </button>
          </Link>
          <button
            type="submit"
            disabled={loading}
            className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>

      <SuccessModal
        show={showSuccessModal}
        onClose={handleModalClose}
        message="Item added successfully!"
      />
    </ProtectedRoute>
  );
}
