//

import { connectDB } from "@/lib/db";
import { orderModel } from "@/models/Order";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  await connectDB();

  const { userId, orderId } = await req.json();

  const deletedOrder = await orderModel.findOneAndDelete({
    _id: orderId,
    user: userId,
  });

  if (!deletedOrder) {
    return NextResponse.json({ message: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Order cancelled successfully" });
}
