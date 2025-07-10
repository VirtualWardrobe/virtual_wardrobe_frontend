import Image from "next/image";
import { useUser } from "../context/UserContext";

export default function VirtualTryOnHistory() {
  const { user } = useUser();
  const results = user?.VirtualTryOn || [];

  if (!user || results.length === 0) {
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
    <div className="mt-8 px-4 sm:px-0">
      <h3 className="text-2xl font-semibold text-gray-900">
        Virtual Try-on History
      </h3>
      <p className="mt-1 max-w-2xl text-sm text-gray-500 mb-6">
        Here are the clothes you have tried on virtually.
      </p>

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
