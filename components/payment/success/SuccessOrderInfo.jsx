//

import { Check, Download } from "lucide-react";
import Link from "next/link";

export default function SuccessOrderInfo({ latestOrder }) {
  return (
    <div className="flex items-start gap-4 p-6 border border-gray-300 rounded shadow-sm">
      <div className="bg-white border border-green-600 rounded-full p-1 self-start mt-1">
        <Check className="w-6 h-6 text-green-600 stroke-[3]" />
      </div>
      <div className="space-y-4 flex-1">
        <h1 className="text-xl font-bold text-green-700">
          Order placed, thank you!
        </h1>
        <p className="text-sm">Confirmation will be sent to your email.</p>

        <div className="flex flex-col sm:flex-row gap-4 pt-2">
          <div className="flex-1 text-sm bg-gray-50 p-4 border border-gray-200 rounded">
            <span className="font-bold block mb-1">
              Shipping to {latestOrder?.shippingAddress?.name}
            </span>
            <p className="text-gray-600">
              {latestOrder?.shippingAddress?.address}
              <br />
              {latestOrder?.shippingAddress?.city} ,{" "}
              {latestOrder?.shippingAddress?.postalCode}{" "}
              {latestOrder?.shippingAddress?.country}
            </p>
          </div>
          <div className="flex-1 text-sm bg-gray-50 p-4 border border-gray-200 rounded">
            <span className="font-bold block mb-1">Order Number</span>
            <p className="text-gray-600 font-mono">#GB-2025-001234</p>
            <p className="text-xs text-gray-500 mt-2">
              Placed on{" "}
              {new Date(latestOrder.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row gap-4 items-center">
          <button className="w-full sm:w-auto px-8 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 shadow-xs transition-colors text-center flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Download Invoice
          </button>
          <Link
            href="/orders"
            className="w-full sm:w-auto px-8 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50 shadow-xs transition-colors text-center"
          >
            View All Orders
          </Link>
          <Link
            href="/products"
            className="w-full sm:w-auto px-8 py-2 bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary rounded-md text-sm font-bold shadow-xs transition-colors text-center"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
