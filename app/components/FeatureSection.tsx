import {
  CloudArrowUpIcon,
  SparklesIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";

const features = [
  {
    name: "Digitize your wardrobe.",
    description:
      "Create a comprehensive digital catalog of your clothing items with photos, tags, and detailed information for easy browsing and organization.",
    icon: CloudArrowUpIcon,
  },
  {
    name: "Smart outfit planning.",
    description:
      "Visualize and plan outfits virtually with our intelligent matching system that suggests combinations based on your style preferences and occasions.",
    icon: SparklesIcon,
  },
  {
    name: "Sustainability tracking.",
    description:
      "Track your clothing usage patterns and carbon footprint to make more conscious fashion choices and reduce waste.",
    icon: ArrowPathIcon,
  },
];

export default function FeatureSection() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-600">
                ABOUT
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                Who we are
              </p>
              <p className="mt-6 text-lg/8 text-gray-700">
                We believe that fashion should be fun, accessible, and
                sustainable. With our virtual wardrobe, you can mix and match
                pieces, create outfits for any occasion, and even get
                recommendations based on your style preferences. Plus, with
                detailed tracking of your wardrobe usage, you&apos;ll always
                know what you have and can make mindful decisions about new
                purchases.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute top-1 left-1 size-5 text-indigo-600"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <Image
            alt="Product screenshot"
            src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
            width={2432}
            height={1442}
            className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  );
}
