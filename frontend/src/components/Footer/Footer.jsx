import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-black text-white">

      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold tracking-widest">
            SIGMA WEARS
          </h2>

          <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
            Premium clothing designed for modern style, comfort and
            confidence.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">
            Shop
          </h3>

          <div className="flex flex-col gap-3 text-sm text-gray-400">
            <Link
              to="/products"
              className="transition-colors hover:text-white"
            >
              All Products
            </Link>

            <Link
              to="/products?category=new"
              className="transition-colors hover:text-white"
            >
              New Releases
            </Link>

            <Link
              to="/products?category=best-seller"
              className="transition-colors hover:text-white"
            >
              Best Sellers
            </Link>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">
            Company
          </h3>

          <div className="flex flex-col gap-3 text-sm text-gray-400">
            <Link
              to="/"
              className="transition-colors hover:text-white"
            >
              About Us
            </Link>

            <Link
              to="/"
              className="transition-colors hover:text-white"
            >
              Contact
            </Link>

            <Link
              to="/"
              className="transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              to="/"
              className="transition-colors hover:text-white"
            >
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-5 text-lg font-semibold">
            Newsletter
          </h3>

          <p className="mb-4 text-sm text-gray-400">
            Subscribe to receive updates about new collections and offers.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Your email"
              className="min-w-0 flex-1 bg-white px-4 py-3 text-sm text-black outline-none"
            />

            <button
              type="button"
              className="bg-white px-5 py-3 text-sm font-semibold text-black transition-colors hover:bg-gray-200"
            >
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-gray-500 md:flex-row">

          <p>
            © 2026 Sigma Wears. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a href="#" className="hover:text-white">
              Instagram
            </a>

            <a href="#" className="hover:text-white">
              Facebook
            </a>

            <a href="#" className="hover:text-white">
              TikTok
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}

export default Footer;