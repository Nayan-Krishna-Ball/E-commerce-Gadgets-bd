//

import Rating from "@/components/products/Rating";
import Image from "next/image";
import Link from "next/link";

export default function SingleShop({ shop, shopProducts }) {
  if (!shop) {
    return (
      <div className="max-w-[1200px] mx-auto p-6">
        <h1 className="text-xl font-bold">Shop not found</h1>
      </div>
    );
  }

  return (
    <main className="max-w-[1500px] mx-auto w-full p-4 py-8">
      {/*  Banner */}
      <div className="w-full h-64 md:h-80 overflow-hidden rounded-md border border-gray-200 mb-6">
        <Image
          src={shop.coverImage}
          alt={shop.name}
          width={1500}
          height={400}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Shop Header */}
      <div className="bg-white border border-gray-200 rounded-md p-6 mb-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-amazon-blue">{shop.name}</h1>
            <p className="text-sm text-gray-500">
              {shop.location?.city}, {shop.location?.country || "Bangladesh"}
            </p>

            <div className="flex items-center gap-2 mt-2">
              <Rating rating={shop.rating.average} />
              <span className="text-sm text-gray-600">
                {shop.rating.totalRatings} ratings
              </span>
            </div>
          </div>

          <div className="text-sm bg-gray-50 border border-gray-200 p-4 rounded-md">
            <p>
              <span className="text-gray-500">Specialization:</span>{" "}
              <span className="font-bold">{shop.specialization}</span>
            </p>
            <p>
              <span className="text-gray-500">Established:</span>{" "}
              {shop.businessInfo?.yearEstablished || "N/A"}
            </p>
            <p>
              <span className="text-gray-500">Employees:</span>{" "}
              {shop.businessInfo?.employees || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/*  Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
            <h2 className="font-bold text-lg mb-2">About This Shop</h2>
            <p className="text-sm text-gray-700 leading-relaxed">
              {shop.description}
            </p>
          </div>

          {/* Brands */}
          {shop.businessInfo?.brands?.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
              <h2 className="font-bold text-lg mb-3">
                Official Brand Partners
              </h2>
              <div className="flex flex-wrap gap-2">
                {shop.businessInfo.brands.map((brand, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-50 text-amazon-blue text-xs rounded-full border border-blue-100"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          {/* Contact Info */}
          <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm text-sm">
            <h2 className="font-bold text-lg mb-3">Contact Information</h2>
            <p>
              <span className="text-gray-500">Owner:</span>{" "}
              {shop.ownerInfo?.name}
            </p>
            <p>
              <span className="text-gray-500">Phone:</span>{" "}
              {shop.ownerInfo?.phone}
            </p>
            <p>
              <span className="text-gray-500">Email:</span>{" "}
              {shop.ownerInfo?.email}
            </p>
            {shop.businessInfo?.website && (
              <p>
                <span className="text-gray-500">Website:</span>{" "}
                <a
                  href={shop.businessInfo.website}
                  target="_blank"
                  className="text-amazon-blue hover:underline"
                >
                  Visit Website
                </a>
              </p>
            )}
          </div>

          {/* Location */}
          <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm text-sm">
            <h2 className="font-bold text-lg mb-3">Location</h2>
            <p>{shop.location?.fullAddress}</p>
            <p className="text-gray-500 mt-1">
              {shop.location?.city}, {shop.location?.country}
            </p>
          </div>
        </div>
      </div>
      {/*  Products Section */}
      <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
        <h2 className="font-bold text-xl mb-6">Products by {shop.name}</h2>
        {shopProducts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {shopProducts.map((product) => (
              <Link
                key={product._id}
                href={`/products/${product.slug}`}
                className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="w-full h-48 relative">
                  <Image
                    src={product.images[0]?.url}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <h3 className="text-sm font-bold text-gray-900 truncate">
                    {product.title}
                  </h3>
                  <p className="text-sm text-amazon-orange font-semibold">
                    ৳ {product.price.toLocaleString("en-BD")}
                  </p>
                  <p className="text-xs text-gray-500">Sold by: {shop.name}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            No products available for this shop.
          </p>
        )}
      </div>
    </main>
  );
}
