import { Link, useLocation } from "react-router-dom";
import useCartStore from "../store/cartStore";

function Navbar() {
  const location = useLocation();
  const cartCount = useCartStore((state) =>
    state.items.reduce((count, item) => count + item.quantity, 0),
  );

  const navLinks = [
    { to: "/", label: "Products" },
    { to: "/cart", label: "Cart" },
    { to: "/orders", label: "Orders" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-950 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full">
          <div className="flex flex-1 items-center justify-start">
            <Link
              to="/"
              className="text-xl font-bold text-white hover:text-indigo-600 transition-colors duration-200 tracking-tight"
            >
              Whamazon
            </Link>
          </div>

          <div className="flex items-center justify-end gap-1 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  location.pathname === link.to
                    ? "bg-indigo-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-indigo-600"
                }`}
              >
                {link.label}
                {link.to === "/cart" && cartCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs 
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
