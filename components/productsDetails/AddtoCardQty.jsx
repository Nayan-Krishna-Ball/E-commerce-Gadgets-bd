//
"use client";
import { useState } from "react";
import AddToCartButton from "./AddToCardButton";

export default function AddToCartQty({ product, userId }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <>
      <div className="mb-4">
        <label className="text-sm font-bold block mb-2">Quantity:</label>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-1 text-sm w-20"
        >
          {[1, 2, 3, 4, 5].map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </div>

      <AddToCartButton product={product} userId={userId} quantity={quantity} />
    </>
  );
}
