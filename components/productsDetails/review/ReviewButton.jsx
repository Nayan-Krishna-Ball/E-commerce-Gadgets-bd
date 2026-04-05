//
"use client";

import { useRouter } from "next/navigation";

export default function ReviewButton({ product }) {
  const router = useRouter();

  const handleRiviewButton = () => {
    router.push(`/review?productId=${product.id}`);
  };
  return (
    <button
      onClick={handleRiviewButton}
      className="bg-amazon-yellow hover:bg-amazon-yellow_hover px-4 py-2 rounded-md text-sm font-medium border border-amazon-secondary"
    >
      Write a Review
    </button>
  );
}
