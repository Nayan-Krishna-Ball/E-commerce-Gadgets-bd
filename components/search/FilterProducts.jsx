//
"use client";
import { useRouter, useSearchParams } from "next/navigation";

import Rating from "../products/Rating";

export default function FilterProducts() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // const updateFilter = (key, value) => {
  //   const params = new URLSearchParams(searchParams.toString());

  //   if (params.get(key) === value) {
  //     params.delete(key);
  //   } else {
  //     params.set(key, value);
  //   }

  //   router.push(`/products?${params.toString()}`);
  // };

  const updateFilter = (key, value, isMulti = false) => {
    const params = new URLSearchParams(searchParams.toString());

    if (isMulti) {
      const values = params.getAll(key);

      if (values.includes(value)) {
        const newValues = values.filter((v) => v !== value);
        params.delete(key);
        newValues.forEach((v) => params.append(key, v));
      } else {
        params.append(key, value);
      }
    } else {
      if (params.get(key) === value) params.delete(key);
      else params.set(key, value);
    }

    router.push(`/products?${params.toString()}`);
  };

  return (
    <>
      <div className="mb-6">
        <h3 className="font-bold text-base mb-3">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("category", "Laptops", true)}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">Laptops & Computers</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("category", "Phones", true)}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">Smartphones & Tablets</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("category", "Audio", true)}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">Audio & Headphones</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("category", "Accessories", true)}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">Gaming Accessories</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("category", "Cameras", true)}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">Cameras & Photography</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("category", "Wearables", true)}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">Wearables & Smartwatches</span>
          </label>
        </div>
      </div>

      <div className="border-t pt-4 mb-6">
        <h3 className="font-bold text-base mb-3">Brand</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("brand", "Apple", true)}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">Apple</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("brand", "Samsung", true)}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">Samsung</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("brand", "Dell", true)}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">Dell</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("brand", "HP", true)}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">HP</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("brand", "Lenovo", true)}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">Lenovo</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("brand", "Sony", true)}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">Sony</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("brand", "Razer", true)}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">Razer</span>
          </label>
        </div>
      </div>

      <div className="border-t pt-4 mb-6">
        <h3 className="font-bold text-base mb-3">Customer Reviews</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("rating", "4")}
              type="radio"
              name="rating"
              checked={searchParams.get("rating") === "4"}
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <div className="flex items-center gap-1">
              <div className="flex text-amazon-secondary text-sm">
                <Rating rating={4} />
              </div>
              <span className="text-sm">& Up</span>
            </div>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("rating", "3")}
              type="radio"
              name="rating"
              checked={searchParams.get("rating") === "3"}
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <div className="flex items-center gap-1">
              <div className="flex text-amazon-secondary text-sm">
                <Rating rating={3} />
              </div>
              <span className="text-sm">& Up</span>
            </div>
          </label>
        </div>
      </div>

      <div className="border-t pt-4 mb-6">
        <h3 className="font-bold text-base mb-3">Price</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("price", "0-10000")}
              checked={searchParams.get("price") === "0-10000"}
              type="radio"
              name="price"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">Under ৳10,000</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("price", "10000-25000")}
              checked={searchParams.get("price") === "10000-25000"}
              name="price"
              type="radio"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">৳10,000 - ৳25,000</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("price", "25000-50000")}
              checked={searchParams.get("price") === "25000-50000"}
              name="price"
              type="radio"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">৳25,000 - ৳50,000</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("price", "50000-100000")}
              checked={searchParams.get("price") === "50000-100000"}
              name="price"
              type="radio"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">৳50,000 - ৳1,00,000</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("price", "50000-100000")}
              checked={searchParams.get("price") === "100000-"}
              name="price"
              type="radio"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">Over ৳1,00,000</span>
          </label>
        </div>
      </div>

      <div className="border-t pt-4 mb-6">
        <h3 className="font-bold text-base mb-3">Availability</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("stock", "true")}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">In Stock</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("stock", "false")}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">Pre-Order</span>
          </label>
        </div>
      </div>

      <div className="border-t pt-4 mb-6">
        <h3 className="font-bold text-base mb-3">Condition</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("condition", "new")}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
              checked
            />
            <span className="text-sm">New</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-amazon-orange">
            <input
              onChange={() => updateFilter("condition", "used")}
              type="checkbox"
              className="w-4 h-4 rounded border-gray-300 text-amazon-secondary focus:ring-amazon-secondary"
            />
            <span className="text-sm">Renewed</span>
          </label>
        </div>
      </div>
    </>
  );
}
