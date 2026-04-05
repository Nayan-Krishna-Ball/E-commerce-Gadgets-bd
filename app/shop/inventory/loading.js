export default function LoadingInventory() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100 px-4">
      <h2 className="text-2xl font-bold text-yellow-700 animate-pulse mb-6">
        Loading Manage Products...
      </h2>

      {/* Inventory Table Skeleton */}
      <div className="w-full max-w-5xl space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 bg-white rounded-xl p-4 shadow animate-pulse"
          >
            <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
            <div className="w-24 h-6 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-gray-500 text-sm animate-pulse text-center">
        Fetching all your products, just a moment…
      </p>
    </div>
  );
}
