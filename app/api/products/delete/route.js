import { connectDB } from "@/lib/db";
import { productModel } from "@/models/Products";

export async function DELETE(req) {
  const { productId } = await req.json();
  await connectDB();
  await productModel.findByIdAndDelete(productId);
  return Response.json({ success: true });
}
