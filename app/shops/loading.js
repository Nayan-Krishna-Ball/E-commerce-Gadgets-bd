export default function LoadingShops() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header Skeleton */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="h-8 w-52 bg-gray-200 rounded-md animate-pulse mb-3"></div>
        <div className="h-4 w-72 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      {/* Center Loader */}
      <div className="flex flex-col items-center justify-center mb-12">
        <div className="relative mb-6">
          <div className="w-16 h-16 border-4 border-amazon-orange border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center text-amazon-orange text-lg font-bold">
            🏪
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <span className="animate-pulse">Loading Shops</span>
          <span className="flex gap-1">
            <span className="w-2 h-2 bg-amazon-orange rounded-full animate-bounce"></span>
            <span className="w-2 h-2 bg-amazon-orange rounded-full animate-bounce [animation-delay:.2s]"></span>
            <span className="w-2 h-2 bg-amazon-orange rounded-full animate-bounce [animation-delay:.4s]"></span>
          </span>
        </h2>

        <p className="text-sm text-gray-500 mt-2 animate-pulse">
          Discovering top stores for you...
        </p>
      </div>

      {/* Shop Cards Skeleton */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 animate-pulse">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm p-5 flex flex-col items-center"
          >
            <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
