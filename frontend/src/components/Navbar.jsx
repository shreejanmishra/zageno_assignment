import { Link, useLocation } from "react-router-dom";
import useCartStore from "../store/cartStore";

function Navbar() {
  const location = useLocation();
  const cartCount = useCartStore((state) => state.getCartCount());

  const navLinks = [{ to: "/", label: "Products" }];

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
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
