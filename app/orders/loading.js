export default function LoadingOrders() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Animated Shopping Box */}
      <div className="relative mb-8">
        <div className="w-20 h-20 border-4 border-amazon-orange border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-amazon-orange font-bold text-xl">
          🛒
        </div>
      </div>

      {/* Loading Text */}
      <h2 className="text-2xl font-semibold text-gray-700 tracking-wide flex items-center gap-2">
        <span className="animate-pulse">Loading</span>
        <span className="flex gap-1">
          <span className="w-2 h-2 bg-amazon-orange rounded-full animate-bounce"></span>
          <span className="w-2 h-2 bg-amazon-orange rounded-full animate-bounce [animation-delay:.2s]"></span>
          <span className="w-2 h-2 bg-amazon-orange rounded-full animate-bounce [animation-delay:.4s]"></span>
        </span>
      </h2>

      {/* Subtitle */}
      <p className="text-gray-500 text-sm mt-3 animate-pulse">
        Fetching your orders, just a moment...
      </p>

      {/* Skeleton Cards */}
      <div className="mt-12 w-full max-w-4xl space-y-6 px-4 animate-pulse">
        {[1, 2].map((i) => (
          <div key={i} className="bg-white rounded-xl shadow-md p-6 flex gap-4">
            <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
