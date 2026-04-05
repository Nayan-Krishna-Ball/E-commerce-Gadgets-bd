import { connectDB } from "@/lib/db";
import { productModel } from "@/models/Products";

export async function POST(req) {
  const { productId, status } = await req.json();
  await connectDB();

  const updatedStatus = {
    status,
  };

  await productModel.findByIdAndUpdate(productId, updatedStatus);
  return Response.json({ success: true });
}
