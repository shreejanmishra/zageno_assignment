import { Link, useLocation } from "react-router-dom";
import useCartStore from "../store/cartStore";

function Navbar() {
  const location = useLocation();
  const cartCount = useCartStore((state) => state.getCartCount());

  const navLinks = [
    { to: "/", label: "Products" },
    { to: "/cart", label: "Cart" },
    { to: "/orders", label: "Orders" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 tracking-tight"
          >
            🛒 Whamazon
          </Link>

          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.to
                    ? "bg-indigo-100 text-indigo-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {link.label}
                {link.to === "/cart" && cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs 
                                   w-5 h-5 flex items-center justify-center rounded-full font-bold"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
