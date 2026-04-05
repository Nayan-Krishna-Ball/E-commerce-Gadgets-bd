//
import { connectDB } from "@/lib/db";
import { cartModel } from "@/models/Cart";
import { productModel } from "@/models/Products";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  await connectDB();
  const { userId, productId } = await req.json();

  const cart = await cartModel.findOne({ user: userId });

  //try here
  const cartItem = cart.items.find(
    (item) => item.product.toString() === productId,
  );

  if (!cartItem) {
    return NextResponse.json({ message: "Item not in cart" }, { status: 404 });
  }
  const quantity = cartItem.quantity;

  const product = await productModel.findByIdAndUpdate(
    productId,
    { $inc: { stock: quantity, soldCount: -quantity } },
    { new: true },
  );

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId,
  );

  await cart.save();

  return NextResponse.json({ message: "Item removed" });
}
