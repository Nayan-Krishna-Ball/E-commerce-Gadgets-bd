import Image from "next/image";
import Link from "next/link";
import Rating from "../products/Rating";

export default function ShopsList({ shops, totalPages, currentPage }) {
  return (
    <main className="max-w-[1500px] mx-auto w-full p-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Featured Shops & Storefronts</h1>
        <p className="text-sm text-gray-600">
          Discover trusted tech shops delivering premium gadgets across
          Bangladesh.
        </p>
      </div>

      {/* <!-- Shops Grid --> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* <!-- Shop Card 1 --> */}

        {shops.map((shop) => (
          <div
            key={shop.id}
            className="bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow"
          >
            <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
              <Image
                height={300}
                width={400}
                alt={shop.name}
                src={shop.coverImage}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <Link
                    href={`/shops/${shop.slug}`}
                    className="font-bold text-lg text-amazon-blue hover:text-amazon-orange hover:underline cursor-pointer"
                  >
                    {shop.name}
                  </Link>
                  <p className="text-sm text-gray-500">
                    {shop?.location?.city}, {shop?.location?.country}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-2">
                <div className="flex text-amazon-secondary">
                  <Rating rating={shop.rating.average} />
                </div>
                <span className="text-xs text-amazon-blue">
                  {" "}
                  {shop.rating.totalRatings} ratings
                </span>
              </div>

              <p className="text-sm line-clamp-3 mb-4 text-gray-700">
                {shop.description}
              </p>

              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-gray-500">Specializes in:</span>
                  <span className="font-bold">{shop.specialization}</span>
                </div>
                <Link
                  href={`/shops/${shop.slug}`}
                  onclick="window.location.href = 'products.html'"
                  className="bg-amazon-yellow hover:bg-amazon-yellow_hover px-4 py-1.5 rounded-full text-xs font-bold shadow-sm transition-colors"
                >
                  Visit Shop
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <!-- Pagination --> */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {/* <button
          className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled
        >
          <i data-lucide="chevron-left" className="w-4 h-4"></i>

        </button> */}

        <Link
          href={`?page=${currentPage - 1}`}
          className={`px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 ${
            currentPage === 1 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Prev
        </Link>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <Link
            key={p}
            href={`?page=${p}`}
            className={`px-4 py-2 border rounded-md text-sm ${
              currentPage === p
                ? "bg-amazon-yellow border-amazon-secondary font-bold"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            {p}
          </Link>
        ))}
        {/*   
        <button className="px-4 py-2 bg-amazon-yellow border border-amazon-secondary rounded-md text-sm font-bold">
          1
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
          2
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
          3
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
          4
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
          <ChevronRight className="w-4 h-4" />
        </button> */}
        <Link
          href={`?page=${currentPage + 1}`}
          className={`px-4 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50 ${
            currentPage === totalPages ? "pointer-events-none opacity-50" : ""
          }`}
        >
          Next
        </Link>
      </div>
    </main>
  );
}
