"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";

interface TryOnResult {
  id: string | number;
  human_image_url: string;
  garment_image_url: string;
  result_image_url: string;
  created_at: string;
}

export default function VirtualTryOnHistory() {
  const [results, setResults] = useState<TryOnResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/virtual-tryon`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.success) {
          setResults(data.data.items);
        } else {
          alert(data.detail);
        }
      } catch (error) {
        console.error("Error fetching virtual try-on history:", error);
        alert(
          "An error occurred while fetching your virtual try-on history. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData().catch((err) => {
      console.error("Fetch error:", err);
    });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (results.length === 0) {
    return (
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm/6 font-medium text-gray-900">
          Virtual Try-on History
        </dt>
        <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
          No virtual try-on history available.
        </dd>
      </div>
    );
  }

  return (
    <div className="mt-16 px-4 sm:px-0">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">
            Virtual Try-on History
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 mb-6">
            Here are the clothes you have tried on virtually.
          </p>
        </div>

        <div className="flex gap-2 ml-auto">
          <button className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 cursor-pointer">
            Conduct New Try-On
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 lg:grid-cols-3">
        {results.map((result) => (
          <div
            key={result.id}
            className="grid grid-cols-3 gap-4 rounded-md bg-white p-4 shadow-md"
          >
            {/* Left column: human and garment images */}
            <div className="col-span-1 flex flex-col justify-between gap-6">
              {/* Human Image */}
              <div className="flex flex-col items-center">
                <div className="w-full overflow-hidden rounded bg-gray-100">
                  <Image
                    src={result.human_image_url}
                    alt="Human Image"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">Original</p>
              </div>

              {/* Garment Image */}
              <div className="flex flex-col items-center">
                <div className="w-full overflow-hidden rounded bg-gray-100">
                  <Image
                    src={result.garment_image_url}
                    alt="Garment Image"
                    width={300}
                    height={300}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-600">Garment</p>
              </div>
            </div>

            {/* Right column: result image */}
            <div className="col-span-2 flex flex-col items-center">
              <div className="w-full flex-1 overflow-hidden rounded bg-gray-100">
                <Image
                  src={result.result_image_url}
                  alt="Virtual Try-On Result"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <p className="mt-2 text-sm text-gray-600">Result</p>
            </div>

            {/* Date below full row */}
            <div className="col-span-3 mt-2 text-right text-sm text-gray-600">
              Tried on:{" "}
              {new Date(result.created_at).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
