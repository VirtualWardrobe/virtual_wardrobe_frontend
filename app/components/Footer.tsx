import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16 sm:py-20 lg:px-8">
        <div className="flex flex-col items-center sm:items-start sm:flex-row sm:justify-between">
          {/* Logo + Description + Socials */}
          <div className="mb-10 sm:mb-0">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-indigo-600 text-3xl font-bold">~</span>
            </div>
            <p className="text-sm text-gray-600 max-w-sm mb-4">
              Making the world a better place through constructing elegant
              hierarchies.
            </p>
            <div className="flex space-x-5 text-gray-500">
              <a href="#" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="#" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="#" aria-label="X">
                <FaXTwitter />
              </a>
              <a href="#" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="#" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Solutions</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#">Marketing</a>
                </li>
                <li>
                  <a href="#">Analytics</a>
                </li>
                <li>
                  <a href="#">Automation</a>
                </li>
                <li>
                  <a href="#">Commerce</a>
                </li>
                <li>
                  <a href="#">Insights</a>
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
          © 2025 Your Company, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
