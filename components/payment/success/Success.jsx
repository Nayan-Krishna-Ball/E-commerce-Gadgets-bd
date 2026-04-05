//

import { formatPrice } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import SuccessOrderInfo from "./SuccessOrderInfo";

export default function Success({ latestOrder }) {
  return (
    <>
      <main className="max-w-[800px] mx-auto w-full p-8 py-12">
        {/* <!-- Success Order Info --> */}
        <SuccessOrderInfo latestOrder={latestOrder} />

        <div className="mt-12 space-y-6">
          <h2 className="text-2xl font-normal border-b border-gray-200 pb-4">
            Order Details
          </h2>

          {/* <!-- Product 1 --> */}
          {latestOrder.items.map((item) => (
            <div key={item._id} className="flex gap-4 items-start">
              <Image
                height={100}
                width={100}
                src={item.image}
                className="w-20 h-20 object-cover border border-gray-200 rounded"
                alt={item.title}
              />
              <div>
                <Link
                  href={`/products/${item.slug}`}
                  className="text-amazon-blue hover:underline font-bold text-sm"
                >
                  {item.title}
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  Quantity: {item.quantity}
                </p>
                <p className="text-xs text-amazon-orange font-bold mt-1">
                  ৳ {formatPrice(item.quantity * item.price)}
                </p>
              </div>
            </div>
          ))}

          {/* <!-- Order Summary --> */}
          <div className="pt-4 border-t border-gray-200">
            <div className="max-w-sm ml-auto space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>৳ {formatPrice(latestOrder.totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee: </span>
                <span className="text-green-600 font-bold">
                  {latestOrder.deliveryFee === 0
                    ? "FREE"
                    : `৳ ${latestOrder.deliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span>Service Fee:</span>
                <span>৳ {latestOrder.serviceFee}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-amazon-orange">
                <span>Total:</span>
                <span>৳ {formatPrice(latestOrder.totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
