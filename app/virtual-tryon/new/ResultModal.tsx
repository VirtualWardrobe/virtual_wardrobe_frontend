"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

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

  if (!show || !result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-3xl shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900">Try-on Result</h3>
        <p className="text-sm text-gray-600 mb-6">
          Here&apos;s the result of your latest virtual try-on.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side: Original & Garment vertically stacked */}
          <div className="flex flex-col gap-6">
            {[
              { src: result.human_image_url, label: "Original" },
              { src: result.garment_image_url, label: "Garment" },
            ].map(({ src, label }, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="w-full h-52 bg-gray-100 rounded overflow-hidden">
                  <Image
                    src={src}
                    alt={label}
                    width={250}
                    height={200}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600">{label}</p>
              </div>
            ))}
          </div>

          {/* Right Side: Result */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-full h-full bg-gray-100 rounded overflow-hidden">
              <Image
                src={result.result_image_url}
                alt="Result"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-sm text-gray-600">Result</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => router.push("/virtual-tryon")}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 cursor-pointer"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
