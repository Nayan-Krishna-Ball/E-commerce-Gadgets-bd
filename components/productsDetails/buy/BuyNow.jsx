//
"use client";

import { useRouter } from "next/navigation";

export default function BuyNow({ product }) {
  const router = useRouter();

  const handleBuyNow = () => {
    router.push(`/paymentProcess?mode=buyNow&productId=${product.id}&qty=1`);
  };
  return (
    <button
      onClick={handleBuyNow}
      className="w-full bg-amazon-secondary hover:bg-amazon-secondary_hover py-2 rounded-md shadow-sm text-sm font-medium text-white"
    >
      Buy Now
    </button>
  );
}
