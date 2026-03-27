import { useNavigate, Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import { useCreateOrder } from "../hooks/useOrders";
import { formatPrice } from "../utils/formatPrice";
import CartItem from "../components/CartItem";

function CartPage() {
  const items = useCartStore((state) => state.items);
  const getCartTotal = useCartStore((state) => state.getCartTotal);
  const clearCart = useCartStore((state) => state.clearCart);
  const { mutate: placeOrder, isPending } = useCreateOrder();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    const orderData = {
      items: items.map((item) => ({
        product: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      totalAmount: getCartTotal(),
    };

    placeOrder(orderData, {
      onSuccess: () => {
        clearCart();
        navigate("/orders");
      },
      onError: (err) => {
        alert(
          err?.response?.data?.message ||
            "Failed to place order. Please try again."
        );
      },
    });
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="mt-2 text-gray-500">
          Looks like you haven't added any items yet
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white 
                     rounded-xl font-medium hover:bg-indigo-700 transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-3">
          {items.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item._id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate mr-2">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="text-gray-900 font-medium flex-shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between">
                <span className="text-base font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">
                  {formatPrice(getCartTotal())}
                </span>
              </div>
            </div>

            <button
              onClick={handlePlaceOrder}
              disabled={isPending}
              className="w-full py-3 px-6 bg-indigo-600 text-white font-medium 
                         rounded-xl hover:bg-indigo-700 active:scale-[0.98] 
                         transition-all duration-200 disabled:opacity-60 
                         disabled:cursor-not-allowed cursor-pointer"
            >
              {isPending ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
