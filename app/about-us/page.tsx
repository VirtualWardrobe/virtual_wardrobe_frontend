import {
  ChartBarIcon,
  TagIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import React from "react";

export default function Example() {
  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      {/* Background blur shape - top */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                About Us
              </h1>
              <p className="mt-6 text-xl/8 text-gray-700">
                We&apos;re a fashion-tech company focused on simplifying
                wardrobe management. Our mission is to blend fashion with
                technology, making style decisions effortless. We&apos;re
                committed to helping you maximize your wardrobe and make
                sustainable fashion choices.
              </p>
            </div>
          </div>
        </div>
        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <Image
            alt="App screenshot showcasing virtual wardrobe management"
            src="https://storage.googleapis.com/vw-media-bucket/wardrobe-screenshot.png"
            className="w-3xl max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-228"
            width={2280}
            height={1280}
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
              <p>
                We believe that fashion should be fun, accessible, and
                sustainable. With our virtual wardrobe, you can mix and match
                pieces, create outfits for any occasion, and even get
                recommendations based on your style preferences. Plus, with
                detailed tracking of your wardrobe usage, you&apos;ll always
                know what you have and can make mindful decisions about new
                purchases.
              </p>

              {/* Our Virtual Wardrobe Management System */}
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                Our Virtual Wardrobe Management System
              </h2>
              <p className="mt-6">
                Our system allows users to create a complete digital inventory
                of their clothing. By uploading photos of individual items,
                users can easily categorize their wardrobe based on multiple
                attributes like type, color, season, occasion, or even specific
                events. The platform&apos;s intuitive tagging and filtering
                features ensure that users can quickly find specific items
                without the hassle of searching through physical drawers and
                closets. Whether you&apos;re planning a vacation wardrobe or
                organizing your seasonal clothing, the virtual wardrobe is
                accessible anytime from any device. Our goal is to simplify and
                enhance the way people manage their wardrobes, helping them stay
                organized, save time, and keep their closet in top condition
                year-round.
              </p>

              {/* Our Outfit Visualization Tool */}
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                Our Outfit Visualization Tool
              </h2>
              <p className="mt-6">
                This tool empowers users to mix, match, and plan outfits
                virtually. It allows users to be their own stylists, helping
                them experiment with new combinations without having to try
                everything on in front of a mirror. Users can save their
                favorite outfits for future reference, making it easy to revisit
                looks they loved. The Outfit Visualization tool also allows
                users to create style boards and collections, perfect for
                curating seasonal looks or creating capsule wardrobes. It&apos;s
                more than just an outfit planner—it&apos;s a creative space for
                users to explore their style, discover new combinations, and
                express their fashion sense effortlessly.
              </p>

              {/* Empower Your Wardrobe with Sustainable Fashion Insights */}
              <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">
                Empower Your Wardrobe with Sustainable Fashion Insights
              </h2>
              <ul className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                  <ChartBarIcon
                    aria-hidden="true"
                    className="mt-1 size-5 flex-none text-indigo-600"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Clothing Usage Tracking.
                    </strong>{" "}
                    Track how often you wear each item, reducing unnecessary
                    purchases and minimizing wardrobe waste.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <TagIcon
                    aria-hidden="true"
                    className="mt-1 size-5 flex-none text-indigo-600"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Upcycling and Repurposing Tips.
                    </strong>{" "}
                    Discover creative ideas to repurpose or upcycle clothing
                    items, extending their life and promoting sustainability.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon
                    aria-hidden="true"
                    className="mt-1 size-5 flex-none text-indigo-600"
                  />
                  <span>
                    <strong className="font-semibold text-gray-900">
                      Environmental Impact Analytics.
                    </strong>{" "}
                    Get insights on the environmental impact of your wardrobe
                    choices, empowering you to make eco-conscious decisions.
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                Our Sustainable Fashion Insights feature enables you to track
                clothing usage, discover eco-friendly brands, and repurpose
                existing items, all while helping you make mindful, sustainable
                fashion choices that reduce waste and promote conscious
                consumption.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background blur shape - bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
}
