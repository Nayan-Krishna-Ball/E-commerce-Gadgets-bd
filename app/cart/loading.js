export default function LoadingCart() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Title */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Loader */}
      <div className="flex flex-col items-center justify-center mb-10">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-amazon-orange border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-amazon-orange text-lg font-bold">
            🛒
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <span className="animate-pulse">Loading Your Cart</span>
          <span className="flex gap-1">
            <span className="w-2 h-2 bg-amazon-orange rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-amazon-orange rounded-full animate-bounce [animation-delay:.2s]"></span>
            <span className="w-2 h-2 bg-amazon-orange rounded-full animate-bounce [animation-delay:.4s]"></span>
          </span>
        </h2>

        <p className="text-sm text-gray-500 mt-2 animate-pulse">
          Preparing your items...
        </p>
      </div>

      {/* Cart Items Skeleton */}
      <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-5 flex gap-4">
            <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="h-8 w-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
