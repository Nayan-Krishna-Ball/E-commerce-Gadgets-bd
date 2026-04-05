export default function LoadingAddProduct() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 px-4">
      <h2 className="text-2xl font-bold text-purple-700 animate-pulse mb-6">
        Adding Product...
      </h2>

      {/* Product Form Skeleton */}
      <div className="w-full max-w-lg space-y-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-40 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-10 bg-purple-300 rounded-lg animate-pulse mt-4"></div>
      </div>

      {/* Loading Dots */}
      <div className="flex gap-2 mt-6">
        <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:.2s]"></span>
        <span className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:.4s]"></span>
      </div>

      <p className="mt-4 text-gray-600 text-sm animate-pulse text-center">
        Preparing product form, please wait…
      </p>
    </div>
  );
}
