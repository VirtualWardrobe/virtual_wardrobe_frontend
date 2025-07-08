import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

export default function WardrobeItems() {
  const [products, setProducts] = useState<WardrobeItem[]>([]);

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
        alert(`Failed to fetch products: ${data.detail}`);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      alert(
        "An error occurred while fetching products. Please try again later."
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <Image
              alt={`Image of a ${product.category.toLowerCase()} from ${
                product.brand
              }`}
              src={product.image_url}
              className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              width={200}
              height={200}
            />
            <h3 className="text-lg font-semibold text-gray-800 mt-2">
              {product.brand}{" "}
              {capitalize(product.category.split("_")[1] || product.category)}
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
          </div>
        ))}
      </div>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link
          href={"/add-item"}
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add Item
        </Link>
      </div>
    </div>
  );
}
