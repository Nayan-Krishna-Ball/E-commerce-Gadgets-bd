"use client";
import { CheckCircle, ChevronRight, Download, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function Order({ order, userId }) {
  const router = useRouter();

  console.log(order?.items?.shop);

  const handleDelete = async (userId, orderId) => {
    toast(
      (t) => (
        <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-5 w-80">
          <p className="text-sm font-semibold text-gray-800">
            Cancel this order?
          </p>
          <p className="text-xs text-gray-500 mt-1">
            This order will be permanently removed.
          </p>

          <div className="flex justify-end gap-3 mt-4">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={() => {
                toast.dismiss(t.id);
                handleCancelOrder(userId, orderId);
              }}
              className="px-4 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition shadow"
            >
              Remove
            </button>
          </div>
        </div>
      ),
      { duration: Infinity, position: "top-center" },
    );
  };

  const handleCancelOrder = async (userId, orderId) => {
    try {
      const res = await fetch("/api/order/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          orderId,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Item removed from cart 🗑️");
        router.refresh();
      } else {
        toast.error("Failed to remove item");
      }
    } catch (error) {}
  };

  return (
    <>
      <main className="max-w-[1000px] mx-auto w-full p-4 py-6">
        <div className="flex items-center gap-2 text-sm mb-4">
          <Link
            href="customer-profile"
            className="text-amazon-blue hover:underline"
          >
            Your Account
          </Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-amazon-orange">Your Orders</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-3xl font-normal">Your Orders</h1>
        </div>

        <div className="text-sm mb-6 flex items-center gap-1">
          <span className="font-bold"> {order.length} orders</span>
          <span>placed in</span>
          <select className="bg-gray-100 border border-gray-300 rounded shadow-sm px-2 py-1 text-xs outline-none hover:bg-gray-200">
            <option>past 3 months</option>
            <option>2024</option>
            <option>2023</option>
          </select>
        </div>

        {/* <!-- Orders List --> */}
        <div className="space-y-6">
          {/* <!-- Order 1 --> */}
          {order?.map((order) => (
            <div
              key={order._id}
              className="border border-gray-300 rounded-lg overflow-hidden"
            >
              {/* <!-- Order Header --> */}
              <div className="bg-gray-100 p-4 flex flex-wrap justify-between items-center text-xs text-gray-600 border-b border-gray-300">
                <div className="flex gap-10">
                  <div>
                    <div className="uppercase tracking-tighter">
                      Order Placed
                    </div>
                    <div className="font-normal text-sm text-gray-900 mt-1">
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                  <div>
                    <div className="uppercase tracking-tighter">Total</div>
                    <div className="font-normal text-sm text-gray-900 mt-1">
                      ৳ {order.totalPrice.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="uppercase tracking-tighter">Ship to</div>
                    <div className="font-normal text-sm text-amazon-blue mt-1 hover:underline cursor-pointer">
                      {order.shippingAddress?.name}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="uppercase tracking-tighter mb-1">
                    Order # {order.orderNumber}
                  </div>
                  <a href="#" className="text-amazon-blue hover:underline">
                    View order details
                  </a>
                </div>
              </div>

              {/* <!-- Order Body --> */}
              <div className="p-6 space-y-6">
                {/* <!-- Product 1 --> */}
                {order.items.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <Image
                      height={100}
                      width={100}
                      src={item.image}
                      alt={item.title}
                      className="w-32 h-32 object-cover border border-gray-200 rounded"
                    />
                    <div className="flex-1">
                      <Link
                        href={`/products/${item.slug}`}
                        className="text-amazon-blue hover:underline font-bold text-sm"
                      >
                        {item.title}
                      </Link>
                      <p className="text-xs text-gray-600 mt-1">
                        Sold by: {item.shop?.name}
                      </p>
                      <p className="text-xs text-gray-600 mt-1">
                        {" "}
                        Quantity: {item.quantity}
                      </p>
                      <div className="mt-2">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                          <CheckCircle className="w-3 h-3 inline mr-1" />
                          {item.status}
                        </span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button
                          //   onclick="window.print()"
                          className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50 flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" />
                          Download Invoice
                        </button>
                        <Link
                          href={`/products/${item.slug}`}
                          className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50"
                        >
                          Write a Review
                        </Link>
                        <button className="px-4 py-1.5 border border-gray-300 rounded-md text-xs hover:bg-gray-50">
                          Buy it again
                        </button>
                        <button
                          onClick={() => handleDelete(userId, order.id)}
                          className="px-4 py-1.5 border border-red-300 bg-red-50 text-red-700 rounded-md text-xs hover:bg-red-100 flex items-center gap-1"
                        >
                          <XCircle className="w-3 h-3" />
                          Cancel Order
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
