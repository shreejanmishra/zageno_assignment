import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="text-center py-16">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        Page Not Found
      </h1>
      <p className="text-gray-500 mb-6">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium
                   rounded-xl hover:bg-indigo-700 transition-colors"
      >
        Back to Products
      </Link>
    </div>
  );
}

export default NotFoundPage;
