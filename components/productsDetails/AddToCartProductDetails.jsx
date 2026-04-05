//

import { auth } from "@/auth";
import { formatPrice } from "@/utils";
import { Package, ShieldCheck, Truck } from "lucide-react";
import AddToCartQty from "./AddtoCardQty";
import BuyNow from "./buy/BuyNow";

export default async function AddToCartDetails({ product }) {
  const stock = product.stock;

  const availableStock = stock > 0 ? "In Stock" : "Out of Stock";

  const session = await auth();

  return (
    <div className="lg:col-span-3">
      <div className="border border-gray-200 rounded p-4">
        <div className="text-3xl text-amazon-orange mb-2">
          ৳{formatPrice(product.price)}
        </div>
        <p className="text-sm mb-3">
          <span className="font-bold">FREE delivery</span>
          <strong>Tomorrow</strong>
        </p>
        <p
          className={`text-green-600 font-bold text-sm mb-4 ${stock <= 0 ? "text-red-600" : ""}`}
        >
          {availableStock}
        </p>

        <AddToCartQty product={product} userId={session?.user?.id} />

        {/* Add to cart Client Button */}

        {/* <button className="w-full bg-amazon-secondary hover:bg-amazon-secondary_hover py-2 rounded-md shadow-sm text-sm font-medium text-white">
          Buy Now
        </button>  */}
        <BuyNow product={product} />

        <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-600">
          <p className="mb-1">
            <ShieldCheck className="w-4 h-4 inline mr-1" />
            Secure transaction
          </p>
          <p className="mb-1">
            <Truck className="w-4 h-4 inline mr-1" />
            Ships from {product.shop.shopName}
          </p>
          <p>
            <Package className="w-4 h-4 inline mr-1" />
            Sold by Official {product.shop.shopName} Store
          </p>
        </div>
      </div>
    </div>
  );
}
