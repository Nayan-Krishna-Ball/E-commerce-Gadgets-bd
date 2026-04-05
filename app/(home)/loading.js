export default function LoadingHome() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 animate-pulse">
      {/* Hero Banner Skeleton */}
      <div className="w-full h-64 md:h-80 bg-gray-300 rounded-b-lg mb-8"></div>

      {/* Categories / Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 -mt-32 w-full max-w-[1500px]">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm p-4 flex flex-col gap-4"
          >
            {/* Title */}
            <div className="h-6 w-1/2 bg-gray-300 rounded"></div>

            {/* Image Grid / Image */}
            <div className={`grid ${i === 0 ? "grid-cols-2 gap-2" : ""} h-48`}>
              {i === 0 ? (
                [...Array(4)].map((_, j) => (
                  <div
                    key={j}
                    className="w-full h-24 bg-gray-300 rounded"
                  ></div>
                ))
              ) : (
                <div className="w-full h-full bg-gray-300 rounded"></div>
              )}
            </div>

            {/* Link/Button */}
            <div className="h-6 w-32 bg-gray-300 rounded mt-auto"></div>
          </div>
        ))}
      </div>

      {/* Featured Products Skeleton */}
      <div className="w-full max-w-[1500px] px-4 mt-8 space-y-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-full h-48 bg-gray-300 rounded-lg shadow-sm"
          ></div>
        ))}
      </div>

      {/* Popular Categories Skeleton */}
      <div className="w-full max-w-[1500px] px-4 mt-8 space-y-4">
        <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-300 rounded-lg"></div>
          ))}
        </div>
      </div>

      {/* Shop By Brand Skeleton */}
      <div className="w-full max-w-[1500px] px-4 mt-12 space-y-4">
        <div className="h-6 w-1/4 bg-gray-300 rounded"></div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-300 rounded-lg"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
