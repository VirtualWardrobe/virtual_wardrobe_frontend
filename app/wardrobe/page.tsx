"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon, MinusIcon, FunnelIcon } from "@heroicons/react/20/solid";
import WardrobeItems from "./WardrobeItems";
import ProtectedRoute from "../components/ProtectedRoute";
import Link from "next/link";

const filters = [
  {
    id: "category",
    name: "Category",
    options: [
      { value: "shirt", label: "Shirts" },
      { value: "t-shirt", label: "T-shirts" },
      { value: "pant", label: "Pants" },
      { value: "jeans", label: "Jeans" },
      { value: "innerwear", label: "Innerwear" },
    ],
  },
  {
    id: "type",
    name: "Type",
    options: [
      { value: "casual", label: "Casual", checked: true },
      { value: "formal", label: "Formal", checked: false },
      { value: "sport", label: "Sport", checked: false },
    ],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "white", label: "White", checked: false },
      { value: "black", label: "Black", checked: false },
      { value: "red", label: "Red", checked: false },
      { value: "green", label: "Green", checked: false },
      { value: "blue", label: "Blue", checked: true },
      { value: "brown", label: "Brown", checked: false },
    ],
  },
  {
    id: "size",
    name: "Size",
    options: [
      { value: "XS", label: "XS", checked: false },
      { value: "S", label: "S", checked: false },
      { value: "M", label: "M", checked: true },
      { value: "L", label: "L", checked: false },
      { value: "XL", label: "XL", checked: false },
      { value: "XXL", label: "XXL", checked: false },
    ],
  },
];

export default function Wardrobe() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({
    category: [],
    color: [],
    type: [],
    size: [],
  });

  const handleFilterChange = (
    sectionId: string,
    value: string,
    checked: boolean
  ) => {
    setSelectedFilters((prev) => {
      const values = new Set(prev[sectionId] || []);
      if (checked) {
        values.add(value);
      } else {
        values.delete(value);
      }
      return { ...prev, [sectionId]: Array.from(values) };
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ProtectedRoute>
      <div className="w-full">
        {/* Mobile filter dialog */}
        <Transition show={mobileFiltersOpen}>
          <Dialog
            as="div"
            className="relative z-[999] lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <TransitionChild
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <DialogBackdrop className="fixed inset-0 bg-black/25" />
            </TransitionChild>
            <div className="fixed inset-0 z-[999] flex">
              <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white pt-4 pb-6 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                    <button
                      type="button"
                      onClick={() => setMobileFiltersOpen(false)}
                      className="relative -mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <XMarkIcon aria-hidden="true" className="size-6" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    {filters.map((section) => (
                      <Disclosure
                        key={section.id}
                        as="div"
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        <h3 className="-mx-2 -my-3 flow-root">
                          <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              <PlusIcon className="size-5 group-data-open:hidden" />
                              <MinusIcon className="size-5 group-not-data-open:hidden" />
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex gap-3">
                                <div className="flex h-5 items-center">
                                  <input
                                    value={option.value}
                                    checked={selectedFilters[
                                      section.id
                                    ]?.includes(option.value)}
                                    onChange={(e) =>
                                      handleFilterChange(
                                        section.id,
                                        option.value,
                                        e.target.checked
                                      )
                                    }
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                </div>
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </Disclosure>
                    ))}
                  </form>
                </DialogPanel>
              </TransitionChild>
            </div>
          </Dialog>
        </Transition>

        <main className="mx-auto h-screen max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="pt-16 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  Your Wardrobe
                </h1>
                <p className="mt-1 text-base text-gray-600">
                  Here you can view and manage the items in your wardrobe.
                </p>
              </div>
              <div className="flex gap-4 w-full sm:w-auto sm:gap-4 sm:flex-row">
                <Link
                  href="/wardrobe/add-item"
                  className="w-1/2 sm:w-auto text-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline focus:ring-2 focus:ring-indigo-500"
                >
                  Add Item to Wardrobe
                </Link>
                <Link
                  href="/virtual-tryon"
                  className="w-1/2 sm:w-auto text-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus:outline focus:ring-2 focus:ring-indigo-500"
                >
                  View your Virtual Try-ons
                </Link>
              </div>
            </div>
            <hr className="mt-6 border-t border-gray-300" />
          </div>

          {/* Mobile Filters Button */}
          <div className="flex items-center justify-end pb-2 lg:hidden">
            <button
              type="button"
              className="w-full justify-center inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <FunnelIcon
                className="mr-2 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Filters
            </button>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-12">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Filters
                </h3>

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between py-3 text-sm text-gray-400 hover:text-gray-500 cursor-pointer">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon className="size-5 group-data-open:hidden" />
                          <MinusIcon className="size-5 group-not-data-open:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div
                            key={option.value}
                            className="flex items-center gap-3"
                          >
                            <input
                              value={option.value}
                              checked={selectedFilters[section.id]?.includes(
                                option.value
                              )}
                              onChange={(e) =>
                                handleFilterChange(
                                  section.id,
                                  option.value,
                                  e.target.checked
                                )
                              }
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                            />

                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <WardrobeItems filters={selectedFilters} />
              </div>
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
}
