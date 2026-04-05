//

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddToCartButton({ product, userId, quantity }) {
  const [loading, setLoading] = useState(false);

  const productQunatity = product.stock;
  const realQunatity = quantity;
  const outOfStock = realQunatity > productQunatity;
  const router = useRouter();

  const addToCart = async () => {
    if (!userId) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    if (outOfStock) {
      toast.error("Not enough stock available.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId: product.id,
          quantity,
        }),
      });

      if (res.ok) {
        toast.success("Added to cart 🛒", {
          style: {
            borderRadius: "8px",
            background: "#232F3E",
            color: "#fff",
          },
        });

        router.refresh();
      } else {
        toast.error("Failed to add product");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={addToCart}
      disabled={loading || outOfStock}
      className="w-full bg-amazon-yellow hover:bg-amazon-yellow_hover py-2 rounded-md shadow-sm mb-2 text-sm font-medium border border-amazon-secondary disabled:opacity-50"
    >
      {loading ? "Adding..." : outOfStock ? "Out of Stock" : "Add to Cart"}
    </button>
  );
}
