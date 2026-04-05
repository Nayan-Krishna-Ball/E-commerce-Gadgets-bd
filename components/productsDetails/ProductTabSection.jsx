//
"use client";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Rating from "../products/Rating";
import ProductFeatures from "./ProductFeatures";
import ReviewButton from "./review/ReviewButton";

export default function ProductTabSection({ product, shop, reviews, session }) {
  const [activeTab, setActiveTab] = useState("description");

  const policyList = Object.values(shop?.policies || {}).filter(Boolean);

  return (
    <div className="mt-12">
      <div className="border-b border-gray-300 mb-6">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab("description")}
            className={`pb-2 px-1 text-sm font-medium border-b-2 ${
              activeTab === "description"
                ? "border-amazon-orange text-amazon-orange"
                : "border-transparent text-gray-600"
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-2 px-1 text-sm font-medium border-b-2 ${
              activeTab === "reviews"
                ? "border-amazon-orange text-amazon-orange"
                : "border-transparent text-gray-600"
            }`}
          >
            Reviews
          </button>
          <button
            onClick={() => setActiveTab("shop")}
            className={`pb-2 px-1 text-sm font-medium border-b-2 ${
              activeTab === "shop"
                ? "border-amazon-orange text-amazon-orange"
                : "border-transparent text-gray-600"
            }`}
          >
            Shop Info
          </button>
        </div>
      </div>

      {/* <!-- Description Tab --> */}
      {activeTab === "description" && (
        <div id="description-tab" className="tab-content">
          <h2 className="text-xl font-bold mb-4">Product Description</h2>
          <div className="prose max-w-none text-sm">
            <p className="mb-4">{product.description}</p>
            <p className="mb-4">{product.descriptionExtended}</p>
            <h3 className="font-bold mt-6 mb-2">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1">
              <ProductFeatures features={product.features} />
            </ul>
          </div>
        </div>
      )}

      {/* <!-- Reviews Tab --> */}
      {activeTab === "reviews" && (
        <div id="reviews-tab" className="tab-content ">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Customer Reviews</h2>

            <ReviewButton product={product} />
          </div>

          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center gap-2">
              {/* <div className="flex text-amazon-secondary">
                <i data-lucide="star" className="w-5 h-5 fill-current"></i>
                <i data-lucide="star" className="w-5 h-5 fill-current"></i>
                <i data-lucide="star" className="w-5 h-5 fill-current"></i>
                <i data-lucide="star" className="w-5 h-5 fill-current"></i>
                <i data-lucide="star" className="w-5 h-5 fill-current"></i>
              </div> */}
              <Rating rating={product?.rating?.average} />
              <span className="text-lg font-bold">
                {product?.rating?.average} out of 5
              </span>
            </div>
            <span className="text-sm text-gray-600">
              {" "}
              {product?.rating?.count} global ratings
            </span>
          </div>

          {/* <!-- Review List --> */}
          <div className="space-y-6" id="reviewList">
            {reviews.length === 0 && (
              <p className="text-sm text-gray-500">
                No reviews yet. Be the first to review!
              </p>
            )}

            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm font-bold">
                    {review.user?.name?.slice(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-bold text-sm">
                      {review.user?.name}
                      {review.user?.id === session?.user?.id && (
                        <span className="text-xs text-blue-600 ml-2">
                          (Your Review)
                        </span>
                      )}
                    </p>

                    <div className="flex text-amazon-secondary">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                      ))}
                    </div>
                  </div>
                </div>

                {review.headline && (
                  <h4 className="font-bold text-sm mb-1">{review.headline}</h4>
                )}

                <p className="text-xs text-gray-500 mb-2">
                  Reviewed on {new Date(review.createdAt).toLocaleDateString()}
                </p>

                <p className="text-sm">{review.comment}</p>

                {review.image && (
                  <Image
                    height={60}
                    width={60}
                    src={review.image}
                    alt="review"
                    className="mt-3 w-24 h-24 object-cover rounded"
                  />
                )}
              </div>
            ))}
          </div>

          <button
            id="loadMoreBtn"
            onclick="loadMoreReviews()"
            className="mt-6 px-6 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50"
          >
            Load More Reviews
          </button>
        </div>
      )}

      {/* <!-- Shop Info Tab --> */}
      {activeTab === "shop" && (
        <div id="shop-tab" className="tab-content ">
          <h2 className="text-xl font-bold mb-4">Shop Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold mb-2">{shop?.name}</h3>
              <p className="text-sm text-gray-600 mb-4">
                {shop?.description || "No description available."}
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-bold">Rating:</span>{" "}
                  {shop?.rating?.average}
                  <span className="text-gray-500">/5</span> (
                  {shop?.rating?.totalRatings} reviews)
                </p>
                <p>
                  <span className="font-bold">Products:</span>{" "}
                  {shop?.stats?.totalProducts} items
                </p>
                <p>
                  <span className="font-bold">Joined:</span>{" "}
                  {new Date(shop?.stats?.joinedDate).toLocaleDateString() ||
                    "N/A"}
                </p>
                <p>
                  <span className="font-bold">Response Time:</span>{" "}
                  {shop?.stats?.responseTime || "N/A"}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-2">Policies</h3>

              <div className="space-y-2 text-sm">
                {policyList.map((policy, i) => (
                  <p key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                    {policy}
                  </p>
                ))}
              </div>
              <Link
                href="/shops"
                className="inline-block mt-4 text-amazon-blue hover:underline text-sm"
              >
                Visit Shop Page →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
