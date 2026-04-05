export default function LoadingProducts() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Top Title Area */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="h-8 w-56 bg-gray-200 rounded-md animate-pulse mb-3"></div>
        <div className="h-4 w-80 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Center Loader */}
      <div className="flex flex-col items-center justify-center mb-12">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-amazon-orange border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-amazon-orange text-lg font-bold">
            🛍️
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <span className="animate-pulse">Loading Products</span>
          <span className="flex gap-1">
            <span className="w-2 h-2 bg-amazon-orange rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-amazon-orange rounded-full animate-bounce [animation-delay:.2s]"></span>
            <span className="w-2 h-2 bg-amazon-orange rounded-full animate-bounce [animation-delay:.4s]"></span>
          </span>
        </h2>

        <p className="text-sm text-gray-500 mt-2 animate-pulse">
          Finding the best deals for you...
        </p>
      </div>

      {/* Product Grid Skeleton */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 animate-pulse">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm p-4 flex flex-col"
          >
            {/* Image */}
            <div className="w-full h-40 bg-gray-200 rounded-lg mb-4"></div>

            {/* Title */}
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>

            {/* Subtitle */}
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-3"></div>

            {/* Price */}
            <div className="h-5 bg-gray-200 rounded w-1/3 mt-auto"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
