//

"use server";

import { connectDB } from "@/lib/db";
import { productModel } from "@/models/Products";

export async function handleToggleStatus(productId, status) {
  await connectDB();
  if (!["published", "draft"].includes(status)) {
    throw new Error("Invalid status");
  }
  const product = await productModel
    .findByIdAndUpdate(productId, { status }, { new: true })
    .lean();
  if (!product) throw new Error("Product not found");
  return product;
}
