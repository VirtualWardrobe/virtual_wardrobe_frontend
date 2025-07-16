"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type ResultData = {
  human_image_url: string;
  garment_image_url: string;
  result_image_url: string;
};

type ResultModalProps = {
  show: boolean;
  result: ResultData | null;
};

export default function ResultModal({ show, result }: ResultModalProps) {
  const router = useRouter();

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  if (!show || !result) return null;

  const sourceImages = [
    { src: result.human_image_url, label: "Original" },
    { src: result.garment_image_url, label: "Garment" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:items-center bg-black/40 backdrop-blur-sm px-4 py-4 md:py-0">
      <div className="bg-white rounded-xl shadow-xl w-[90%] md:w-full max-w-sm md:max-w-3xl p-4 md:p-6 max-h-[75vh] md:max-h-[90vh] overflow-y-auto my-auto">
        <h3 className="text-lg font-semibold text-gray-900">Try-on Result</h3>
        <p className="text-sm text-gray-600 mb-4 md:mb-6">
          Here&apos;s the result of your latest virtual try-on.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="flex flex-col gap-4 md:gap-6">
            {sourceImages.map(({ src, label }) => (
              <div key={label} className="flex flex-col gap-2">
                <div className="relative w-full h-48 sm:h-52 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-2">
                  <Image
                    src={src}
                    alt={label}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <p className="text-center text-sm font-semibold text-gray-700">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <div className="relative w-full h-64 md:h-full bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center p-2">
              <Image
                src={result.result_image_url}
                alt="Result"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <p className="text-center text-sm font-semibold text-gray-700">
              Result
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => router.push("/virtual-tryon")}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
