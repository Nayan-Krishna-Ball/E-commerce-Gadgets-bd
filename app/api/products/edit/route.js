//

import { connectDB } from "@/lib/db";
import { productModel } from "@/models/Products";

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { productId, ...updateData } = body;

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      updateData,
      { new: true },
    );
    if (!updatedProduct) {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }
    return new Response(
      JSON.stringify({
        message: "Product updated successfully",
        updatedProduct,
      }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(
      JSON.stringify({
        message: "Failed to update product",
        error: error.message,
      }),
      { status: 500 },
    );
  }
}
