export default function LoadingSellerProfile() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      {/* Profile Avatar */}
      <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse mb-6 shadow-inner"></div>

      {/* Name & Email Skeleton */}
      <div className="space-y-4 w-full max-w-md">
        <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      </div>

      {/* Stats Skeleton */}
      <div className="mt-8 flex gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
          </div>
        ))}
      </div>

      <p className="mt-6 text-gray-500 text-sm animate-pulse text-center">
        Loading your profile details...
      </p>
    </div>
  );
}
