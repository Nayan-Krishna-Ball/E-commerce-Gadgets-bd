"use client";
import { updataOrderStatus } from "@/app/actions/order";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ShopBooking({ orders }) {
  const [selectedStatus, setSelectedStatus] = useState("Processing");
  const router = useRouter();
  const handleChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  const handleStatusChange = async (orderId) => {
    const upsDateOrderStatus = await updataOrderStatus(orderId, selectedStatus);

    if (upsDateOrderStatus) {
      toast.success("Order status updated successfully!");
      router.refresh();
    } else {
      toast.error("Failed to update order status.");
    }
  };
  return (
    <main className="w-full p-6">
      <div className="max-w-[1500px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-normal">Manage Orders</h1>
        </div>

        <div className="bg-white border border-gray-300 rounded shadow-sm p-4 mb-6 flex flex-wrap items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-bold">Order Status:</span>
            <select className="border border-gray-300 py-1 px-2 rounded">
              <option>All</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>

          <div className="flex items-center gap-2 border-l border-gray-300 pl-4">
            <span className="font-bold">Payment:</span>
            <select className="border border-gray-300 py-1 px-2 rounded">
              <option>All</option>
              <option>Pending</option>
              <option>Paid</option>
            </select>
          </div>

          <div className="flex-1 flex items-center gap-2 border-l border-gray-300 pl-4">
            <input
              type="text"
              placeholder="Search by name / phone"
              className="w-full max-w-sm px-3 py-1 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="bg-white border border-gray-300 rounded shadow-sm overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Order Status</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 font-medium">#{order._id}</td>
                  <td className="p-3">
                    <div className="font-medium">
                      {order.shippingAddress?.name || "N/A"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {order.shippingAddress?.phone || "N/A"}
                    </div>
                    <div className="text-xs text-gray-400">
                      {order.shippingAddress?.city || "N/A"}
                    </div>
                  </td>
                  <td className="p-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-3 items-start mb-2">
                        <Image
                          height={40}
                          width={40}
                          alt="image"
                          src={item.image}
                          className="w-12 h-12 object-cover rounded border"
                        />
                        <div className="space-y-1">
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs text-gray-500">
                            SKU: {item.product.features?.cpu || "N/A"}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.product.features?.storage ||
                              "No Storage Info"}
                          </div>
                          <div className="text-[11px] text-gray-400">
                            Price: ৳ {item.price}
                          </div>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="p-3 font-bold">
                    ৳{" "}
                    {order.items.reduce(
                      (total, item) => total + item.price * item.quantity,
                      0,
                    )}
                  </td>
                  <td className="p-3">
                    {order.paymentStatus === "Paid" ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        Paid
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <select
                      onChange={(e) => handleChange(e)}
                      className="border border-gray-300 px-2 py-1 rounded text-xs"
                    >
                      <option
                        value="Processing"
                        selected={order.items
                          .map((item) => item.status)
                          .includes("Processing")}
                      >
                        Processing
                      </option>
                      <option
                        value="Shipped"
                        selected={order.items
                          .map((item) => item.status)
                          .includes("Shipped")}
                      >
                        Shipped
                      </option>
                      <option
                        value="Delivered"
                        selected={order.items
                          .map((item) => item.status)
                          .includes("Delivered")}
                      >
                        Delivered
                      </option>
                      <option
                        value="Cancelled"
                        selected={order.items
                          .map((item) => item.status)
                          .includes("Cancelled")}
                      >
                        Cancelled
                      </option>
                    </select>
                  </td>
                  <td className="p-3 text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()} <br />
                    <span className="text-xs">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="px-2 py-1 text-xs border rounded hover:bg-gray-100">
                        View
                      </button>
                      <button
                        onClick={() => handleStatusChange(order.id)}
                        className="px-2 py-1 text-xs border rounded bg-amazon-yellow"
                      >
                        Update
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
