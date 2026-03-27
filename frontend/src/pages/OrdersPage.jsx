import { Link } from "react-router-dom";
import { useOrders } from "../hooks/useOrders";
import OrderCard from "../components/OrderCard";
import Loader from "../components/Loader";

function OrdersPage() {
  const { data: orders, isLoading, error } = useOrders();

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="text-center py-16">
        <p className="text-red-500 text-lg">Failed to load orders</p>
        <p className="text-gray-400 mt-1 text-sm">{error.message}</p>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold text-gray-900">No orders yet</h2>
        <p className="mt-2 text-gray-500">
          Once you place an order, it will appear here
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-indigo-600 text-white 
                     rounded-xl font-medium hover:bg-indigo-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
      <p className="text-gray-600 mb-8">
        You have placed {orders.length} order{orders.length !== 1 ? "s" : ""}
      </p>

      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
