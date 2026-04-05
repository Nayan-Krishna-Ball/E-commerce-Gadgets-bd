//
"use client";

import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-20 px-4">
      {/* Icon */}
      <div className="text-6xl mb-4">🛍️</div>

      {/* Title */}
      <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>

      {/* Subtitle */}
      <p className="text-gray-500 max-w-md mb-6">
        We couldn’t find any items matching your search or filter. Try adjusting
        your filters or browse all products instead.
      </p>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Link
          href="/products"
          className="bg-amazon-secondary hover:bg-[#fa8900] text-black px-6 py-2 rounded shadow-sm font-medium transition"
        >
          View All Products
        </Link>

        <button
          onClick={() => window.history.back()}
          className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100 transition"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
