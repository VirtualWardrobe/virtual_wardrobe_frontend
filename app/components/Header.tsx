"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Wardrobe", href: "/wardrobe" },
  { name: "About", href: "/about-us" },
  { name: "Contact", href: "/contact-us" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  const handleNavigate = async (href: string) => {
    try {
      setLoading(true);
      await router.push(href);
    } finally {
      setMobileMenuOpen(false);
      setTimeout(() => setLoading(false), 500);
    }
  };

  const handleLogout = () => {
    logout();
    handleNavigate("/");
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <Image
              alt="Logo"
              src="https://storage.googleapis.com/vw-media-bucket/vw-logo-3.png"
              width={150}
              height={150}
              unoptimized
            />
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="size-6 cursor-pointer" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigate(item.href)}
              className="text-sm font-semibold text-gray-900 cursor-pointer"
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isLoggedIn ? (
            <Menu as="div" className="relative">
              <MenuButton className="text-gray-700 hover:text-indigo-600">
                <UserCircleIcon
                  className="h-9 w-9 cursor-pointer"
                  aria-hidden="true"
                />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-gray-200 focus:outline-none z-50">
                <div className="py-1">
                  <MenuItem
                    as="button"
                    onClick={() => handleNavigate("/profile")}
                    className={({ focus }) =>
                      `w-full text-left text-black px-4 py-2 text-sm cursor-pointer ${
                        focus ? "bg-gray-100" : ""
                      }`
                    }
                  >
                    Profile
                  </MenuItem>
                  <MenuItem
                    as="button"
                    onClick={handleLogout}
                    className={({ focus }) =>
                      `w-full text-left px-4 py-2 text-sm text-red-600 cursor-pointer ${
                        focus ? "bg-gray-100" : ""
                      }`
                    }
                  >
                    Logout
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          ) : (
            <button
              onClick={() => handleNavigate("/login")}
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50 cursor-pointer"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                alt="Logo"
                src="https://storage.googleapis.com/vw-media-bucket/vw-logo-3.png"
                width={50}
                height={50}
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <XMarkIcon className="size-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavigate(item.href)}
                    className="-mx-3 block w-full text-left rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              <div className="py-6">
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => handleNavigate("/profile")}
                      className="-mx-3 block w-full text-left px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => handleLogout()}
                      className="-mx-3 block w-full text-left px-3 py-2 text-base font-semibold text-red-600 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleNavigate("/login")}
                    className="-mx-3 block w-full text-left rounded-lg px-3 py-2.5 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in <span aria-hidden="true">&rarr;</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>

      {loading && <Loader />}
    </header>
  );
}
