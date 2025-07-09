import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:px-8 relative z-10">
        <div className="flex flex-col items-center sm:items-start sm:flex-row sm:justify-between">
          {/* Logo + Description + Socials */}
          <div className="mb-10 sm:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <Link href={"/"} className="-m-1.5 p-1.5">
                <Image
                  alt="Logo"
                  src="https://storage.googleapis.com/vw-media-bucket/vw-logo-3.png"
                  width={150}
                  height={150}
                  unoptimized
                />
              </Link>
            </div>
            <p className="text-sm text-gray-600 max-w-sm mb-4">
              Virtual Wardrobe is a platform that helps you manage your wardrobe
              and plan outfits with ease. Discover new styles, organize your
              clothes, and share your looks with friends.
            </p>
            <div className="flex space-x-5 text-gray-500">
              <a href="#" aria-label="Facebook" className="text-xl">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Instagram" className="text-xl">
                <FaInstagram />
              </a>
              <a href="#" aria-label="X" className="text-xl">
                <FaXTwitter />
              </a>
              <a href="#" aria-label="GitHub" className="text-xl">
                <FaGithub />
              </a>
              <a href="#" aria-label="YouTube" className="text-xl">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Navigation
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/" className="text-blue-600 hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/wardrobe"
                    className="text-blue-600 hover:underline"
                  >
                    Wardrobe
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about-us"
                    className="text-blue-600 hover:underline"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className="text-blue-600 hover:underline"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">Support</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#">Submit ticket</a>
                </li>
                <li>
                  <a href="#">Documentation</a>
                </li>
                <li>
                  <a href="#">Guides</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">Company</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Jobs</a>
                </li>
                <li>
                  <a href="#">Press</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#">Terms of service</a>
                </li>
                <li>
                  <a href="#">Privacy policy</a>
                </li>
                <li>
                  <a href="#">License</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          &copy; 2025 Virtual Wardrobe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
