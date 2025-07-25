"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Loader from "../components/Loader";
import SuccessModal from "../components/SuccessModal";
import ConfirmModal from "../components/ConfirmModal";
import ErrorModal from "../components/ErrorModal";

interface WardrobeItem {
  id: string;
  user_id: string;
  category: string;
  type: string;
  brand: string;
  size: string;
  color: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface Props {
  filters: {
    [key: string]: string[];
  };
}

export default function WardrobeItems({ filters }: Props) {
  const [products, setProducts] = useState<WardrobeItem[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [confirmItemId, setConfirmItemId] = useState<string | null>(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedItem, setSelectedItem] = useState<WardrobeItem | null>(null);
  const [form, setForm] = useState({
    category: "",
    type: "",
    brand: "",
    size: "",
    color: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const showError = (message: string) => {
    setErrorMessage(message);
    setShowErrorModal(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/wardrobe-items`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          setProducts(data.data.items);
        } else {
          showError(`Failed to fetch items: ${data.detail}`);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
        showError("An error occurred while fetching items.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const matchesFilters = (item: WardrobeItem) => {
    const categoryFilters = filters.category ?? [];
    const typeFilters = filters.type ?? [];
    const colorFilters = filters.color ?? [];
    const sizeFilters = filters.size ?? [];

    const categoryMatch =
      categoryFilters.length === 0 ||
      (item.category && categoryFilters.includes(item.category.toLowerCase()));
    const typeMatch =
      typeFilters.length === 0 ||
      (item.type && typeFilters.includes(item.type.toLowerCase()));
    const colorMatch =
      colorFilters.length === 0 ||
      (item.color && colorFilters.includes(item.color.toLowerCase()));
    const sizeMatch =
      sizeFilters.length === 0 ||
      (item.size && sizeFilters.includes(item.size.toUpperCase()));

    return categoryMatch && typeMatch && colorMatch && sizeMatch;
  };

  const filteredProducts = products.filter(matchesFilters);

  const handleDelete = async () => {
    if (!confirmItemId) return;

    try {
      setLoadingId(confirmItemId);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wardrobe-items/${confirmItemId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();

      if (data.success) {
        setProducts((prev) => prev.filter((item) => item.id !== confirmItemId));
        setSuccessMessage(data.message || "Item deleted successfully!");
        setShowSuccessModal(true);
      } else {
        throw new Error(data.detail || "Failed to delete item");
      }
    } catch (error) {
      console.error("Delete error:", error);
      showError(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setLoadingId(null);
      setConfirmItemId(null);
    }
  };

  const handleEditClick = (item: WardrobeItem) => {
    setSelectedItem(item);
    setForm({
      category: item.category,
      type: item.type,
      brand: item.brand,
      size: item.size,
      color: item.color,
    });
  };

  const capitalize = (str: string) =>
    str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      const url = new URL(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/wardrobe-items/${selectedItem.id}`
      );

      Object.entries(form).forEach(([key, val]) => {
        if (!val) return;
        if (key === "brand") {
          url.searchParams.append(`item_${key}`, val);
        } else {
          url.searchParams.append(`item_${key}`, val.toUpperCase());
        }
      });

      const body = new FormData();
      if (imageFile) {
        body.append("image", imageFile);
      }

      const res = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: body,
      });

      const data = await res.json();
      if (data.success) {
        setProducts((prev) =>
          prev.map((item) =>
            item.id === selectedItem.id
              ? {
                  ...item,
                  ...form,
                  image_url: imageFile
                    ? URL.createObjectURL(imageFile)
                    : item.image_url,
                }
              : item
          )
        );
        setSuccessMessage("Item updated successfully!");
        setShowSuccessModal(true);
        setSelectedItem(null);
      } else {
        throw new Error(data.detail || "Failed to update item");
      }
    } catch (err) {
      showError(err instanceof Error ? err.message : "Failed to update item");
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("en-IN", { dateStyle: "short" });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl lg:px-4">
      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-8">
          You have no wardrobe items.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 sm:gap-x-2 lg:gap-x-4 gap-y-2 sm:gap-y-2 lg:gap-y-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group relative border p-2 rounded-lg shadow-lg hover:shadow-2xl transition"
            >
              <Image
                alt={`Image of ${product.category}`}
                src={
                  product.image_url ||
                  "https://dummyimage.com/300x600/cccccc/000000&text=No+Image"
                }
                className="aspect-square w-full rounded-md bg-gray-200 object-cover lg:h-75"
                width={200}
                height={200}
              />
              <h3 className="text-lg font-semibold text-gray-800 mt-2">
                {product.brand} {capitalize(product.category)}
              </h3>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Type:</span>{" "}
                {capitalize(product.type)}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Color:</span>{" "}
                {capitalize(product.color)}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Size:</span>{" "}
                {product.size.toUpperCase()}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Added:</span>{" "}
                {formatDate(product.created_at)}
              </p>
              <button
                onClick={() => handleEditClick(product)}
                className="w-full mt-3 text-sm px-3 py-1.5 rounded-md font-semibold shadow-sm bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmItemId(product.id);
                }}
                className={`w-full mt-2 text-sm px-3 py-1.5 rounded-md font-semibold shadow-sm ${
                  loadingId === product.id
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-500 cursor-pointer"
                }`}
              >
                {loadingId === product.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg p-4 sm:p-6 w-full max-w-lg sm:max-w-2xl overflow-y-auto max-h-[75vh] sm:max-h-[75vh]">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Edit Wardrobe Item
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Category */}
              <div>
                <label className="block text-base font-medium text-gray-800 mb-2">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, category: e.target.value }))
                  }
                  className="block w-full appearance-none px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer bg-no-repeat bg-[right_1rem_center] bg-[length:1rem_1rem]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg fill='gray' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.043l3.71-3.812a.75.75 0 111.08 1.04l-4.24 4.365a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                  }}
                >
                  <option value="" hidden>
                    Select Category
                  </option>
                  {[
                    "SHIRT",
                    "T_SHIRT",
                    "BLOUSE",
                    "SWEATER",
                    "HOODIE",
                    "POLO",
                    "TANK_TOP",
                    "PANT",
                    "JEANS",
                    "SHORTS",
                    "SKIRT",
                    "LEGGINGS",
                    "SWEATPANTS",
                    "TROUSERS",
                    "JACKET",
                    "COAT",
                    "BLAZER",
                    "CARDIGAN",
                    "VEST",
                    "SUIT",
                    "TUXEDO",
                    "INNERWEAR",
                    "PAJAMAS",
                    "ROBE",
                    "SOCKS",
                    "UNDERWEAR",
                    "SPORTSWEAR",
                    "SWIMWEAR",
                    "ATHLETIC_TOP",
                    "ATHLETIC_BOTTOM",
                  ].map((item) => (
                    <option key={item} value={item}>
                      {item
                        .replace(/_/g, " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div>
                <label className="block text-base font-medium text-gray-800 mb-2">
                  Type
                </label>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="block w-full appearance-none px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer bg-no-repeat bg-[right_1rem_center] bg-[length:1rem_1rem]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg fill='gray' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.043l3.71-3.812a.75.75 0 111.08 1.04l-4.24 4.365a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                  }}
                >
                  <option value="" hidden>
                    Select Type
                  </option>
                  {[
                    "CASUAL",
                    "FORMAL",
                    "SPORTS",
                    "ETHNIC",
                    "PARTY",
                    "BEACH",
                  ].map((item) => (
                    <option key={item} value={item}>
                      {item
                        .toLowerCase()
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-base font-medium text-gray-800 mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  placeholder="Ex: Nike, Adidas, etc."
                  value={form.brand}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, brand: e.target.value }))
                  }
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
                />
              </div>

              {/* Size */}
              <div>
                <label className="block text-base font-medium text-gray-800 mb-2">
                  Size
                </label>
                <select
                  value={form.size}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, size: e.target.value }))
                  }
                  className="block w-full appearance-none px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer bg-no-repeat bg-[right_1rem_center] bg-[length:1rem_1rem]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg fill='gray' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.043l3.71-3.812a.75.75 0 111.08 1.04l-4.24 4.365a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                  }}
                >
                  <option value="" hidden>
                    Select Size
                  </option>
                  {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Color */}
              <div>
                <label className="block text-base font-medium text-gray-800 mb-2">
                  Color
                </label>
                <select
                  value={form.color}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, color: e.target.value }))
                  }
                  className="block w-full appearance-none px-4 py-3 pr-12 bg-white border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer bg-no-repeat bg-[right_1rem_center] bg-[length:1rem_1rem]"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg fill='gray' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.043l3.71-3.812a.75.75 0 111.08 1.04l-4.24 4.365a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z' clip-rule='evenodd' /%3E%3C/svg%3E")`,
                  }}
                >
                  <option value="" hidden>
                    Select Color
                  </option>
                  {[
                    "BLACK",
                    "WHITE",
                    "GRAY",
                    "RED",
                    "BLUE",
                    "YELLOW",
                    "GREEN",
                    "NAVY",
                    "PURPLE",
                    "BROWN",
                    "BEIGE",
                    "TAN",
                    "KHAKI",
                    "PINK",
                    "MAROON",
                    "OLIVE",
                    "BURGUNDY",
                    "CREAM",
                    "CHARCOAL",
                    "DENIM",
                    "MULTICOLOR",
                  ].map((c) => (
                    <option key={c} value={c}>
                      {c.toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase())}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-base font-medium text-gray-800 mb-2">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-indigo-100 file:text-indigo-600 hover:file:bg-indigo-200 transition cursor-pointer"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-5 py-2 bg-gray-300 text-gray-800 font-medium rounded-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-300 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-5 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 transition cursor-pointer"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      <SuccessModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        message={successMessage}
      />

      {/* Error Modal */}
      <ErrorModal
        show={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message={errorMessage}
      />

      {/* Confirm Delete Modal */}
      <ConfirmModal
        show={Boolean(confirmItemId)}
        onClose={() => setConfirmItemId(null)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this item?"
      />
    </div>
  );
}
