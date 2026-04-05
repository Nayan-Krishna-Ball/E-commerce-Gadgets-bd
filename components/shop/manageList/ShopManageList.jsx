//
"use client";

import { formatPrice } from "@/utils";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ShopManageList({ shopProducts }) {
  const router = useRouter();

  const handleProductStatus = async (productId, currentStatus) => {
    const statusText =
      currentStatus === "published" ? "unpublished" : "published";

    try {
      const response = await fetch("/api/products/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, status: statusText }),
      });

      if (response.ok) {
        toast.success(`Product ${statusText} successfully.`);
        router.refresh();
      } else {
        toast.error("Failed to update product status. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to update product status. Please try again.");
    }
  };

  const handleDeleteItem = async (productId) => {
    try {
      const response = await fetch("/api/products/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (response.ok) {
        toast.success("Product deleted successfully.");
        router.refresh();
      } else {
        toast.error("Failed to delete product. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to delete product. Please try again.");
    }
  };

  const handleEditItem = (productId) => {
    console.log(`The products id is ${productId}`);

    router.push(`/shop/add-product?id=${productId}`);
  };

  return (
    <>
      <main className="w-full p-6">
        <div className="max-w-[1500px] mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-normal">Manage Inventory</h1>
            <Link
              href="/shop/add-product"
              className="bg-amazon-yellow hover:bg-amazon-yellow_hover px-6 py-2 rounded-md text-sm font-bold shadow-sm border border-amazon-secondary transition-colors"
            >
              Add a Product
            </Link>
          </div>

          {/* <!-- Filters --> */}
          <div className="bg-white border border-gray-300 rounded shadow-sm p-4 mb-6 flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold">Status:</span>
              <select className="border border-gray-300 py-1 px-2 rounded outline-none focus:ring-1 focus:ring-amazon-blue">
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
              <span className="font-bold">Category:</span>
              <select className="border border-gray-300 py-1 px-2 rounded outline-none focus:ring-1 focus:ring-amazon-blue">
                <option>All Categories</option>
                <option>Laptops & Computers</option>
                <option>Smartphones & Tablets</option>
                <option>Audio & Headphones</option>
                <option>Gaming Accessories</option>
                <option>Cameras & Photography</option>
                <option>Wearables & Smartwatches</option>
              </select>
            </div>
            <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
              <span className="font-bold">Brand:</span>
              <select className="border border-gray-300 py-1 px-2 rounded outline-none focus:ring-1 focus:ring-amazon-blue">
                <option>All Brands</option>
                <option>Apple</option>
                <option>Samsung</option>
                <option>Dell</option>
                <option>HP</option>
                <option>Lenovo</option>
                <option>Sony</option>
                <option>Razer</option>
              </select>
            </div>
            <div className="flex-1 flex items-center gap-2 border-l border-gray-300 pl-4">
              <div className="relative w-full max-w-sm">
                <i
                  data-lucide="search"
                  className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400"
                ></i>
                <input
                  type="text"
                  placeholder="Search by SKU or Name"
                  className="w-full pl-8 pr-2 py-1 border border-gray-300 rounded outline-none focus:ring-1 focus:ring-amazon-blue"
                />
              </div>
            </div>
          </div>

          {/* <!-- Table --> */}
          <div className="bg-white border border-gray-300 rounded shadow-sm overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 border-b border-gray-300 text-gray-600 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3 text-center w-12">
                    <input type="checkbox" />
                  </th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Brand</th>
                  <th className="p-3">Price (৳)</th>
                  <th className="p-3">Available</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {/* Product */}

                {shopProducts.map((products) => (
                  <tr key={products.id} className="hover:bg-gray-50">
                    <td className="p-3 text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="p-3">
                      <span
                        className={`inline-block px-2 py-1 ${products.stock > 0 ? "text-green-700  bg-green-100" : "text-red-700  bg-red-100"} text-xs font-bold rounded`}
                      >
                        {products.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="p-3">
                      <Image
                        height={100}
                        width={100}
                        src={products.images[0].url}
                        alt={products.title}
                        className="w-12 h-12 object-cover rounded border border-gray-200"
                      />
                    </td>
                    <td className="p-3">
                      <div className="font-medium">{products.title}</div>
                      <div className="text-xs text-gray-500">
                        SKU: {products.features.cpu}
                      </div>
                    </td>
                    <td className="p-3 text-gray-600">{products.category}</td>
                    <td className="p-3 text-gray-600">{products.brand}</td>
                    <td className="p-3 font-bold">
                      {formatPrice(products.price)}
                    </td>
                    <td className="p-3">
                      <span className="text-green-600 font-bold">
                        {products.stock}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditItem(products.id)}
                          className="p-1.5 hover:bg-gray-100 rounded"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4 text-amazon-blue" />
                        </button>
                        <button
                          onClick={() =>
                            handleProductStatus(products.id, products.status)
                          }
                          className="p-1.5 hover:bg-gray-100 rounded"
                          title={
                            products.status === "published"
                              ? "Unpublish"
                              : "Publish"
                          }
                        >
                          {products.status === "published" ? (
                            <EyeOff className="w-4 h-4 text-gray-600" />
                          ) : (
                            <Eye className="w-4 h-4 text-green-600" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteItem(products.id)}
                          className="p-1.5 hover:bg-gray-100 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* <!-- Pagination --> */}
          <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
            <div>Showing 1-5 of 5 products</div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded bg-amazon-yellow font-bold">
                1
              </button>
              <button
                className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
                disabled
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
