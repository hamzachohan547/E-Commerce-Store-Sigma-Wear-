import { Link, NavLink } from "react-router-dom";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const { cartCount } = useCart();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  const navLinkStyle = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "font-semibold text-black"
        : "text-gray-600 hover:text-black"
    }`;

  return (
    <header className="w-full border-b border-gray-200 bg-white">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* =========================
            Logo
        ========================== */}

        <Link
          to="/"
          className="text-2xl font-bold tracking-widest"
        >
          <i>SIGMA WEARS</i>
        </Link>

        {/* =========================
            Navigation
        ========================== */}

        <nav className="hidden items-center gap-8 md:flex">

          <NavLink
            to="/"
            className={navLinkStyle}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={navLinkStyle}
          >
            Shop
          </NavLink>

          <NavLink
            to="/products?category=new"
            className={navLinkStyle}
          >
            New Releases
          </NavLink>

          <NavLink
            to="/products?category=best-seller"
            className={navLinkStyle}
          >
            Best Sellers
          </NavLink>

        </nav>

        {/* =========================
            Right Side
        ========================== */}

        <div className="flex items-center gap-5">

          {/* Search */}
          <Link
  to="/products"
  className="text-xl transition-transform hover:scale-110"
  title="Search"
>
  🔍
</Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-xl transition-transform duration-200 hover:scale-110"
            title="Cart"
          >
            🛒

            {cartCount > 0 && (
              <span className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-black text-[10px] font-medium text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* =========================
              Authentication
          ========================== */}

          {isAuthenticated ? (

            <div className="flex items-center gap-4">

              {/* My Orders */}
              <Link
                to="/orders"
                className="hidden text-sm font-medium transition hover:underline md:block"
              >
                My Orders
              </Link>

              {/* User Name */}
              <span className="hidden text-sm font-medium md:block">
                Hi, {user?.name}
              </span>

              {/* Logout */}
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-black px-5 py-2 text-sm font-medium transition-all duration-200 hover:bg-black hover:text-white"
              >
                Logout
              </button>

            </div>

          ) : (

            <div className="flex items-center gap-3">

              {/* Login */}
              <Link
                to="/login"
                className="rounded-full border border-black px-5 py-2 text-sm font-medium transition-all duration-200 hover:bg-black hover:text-white"
              >
                Login
              </Link>

              {/* Register */}
              <Link
                to="/register"
                className="rounded-full border border-black px-5 py-2 text-sm font-medium transition-all duration-200 hover:bg-black hover:text-white"
              >
                Register
              </Link>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;