import "@/models/Products";
import "@/models/Shop";
import "@/models/User";

import { connectDB } from "@/lib/db";
import { cartModel } from "@/models/Cart";
import { orderModel } from "@/models/Order";
import { productModel } from "@/models/Products";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const { userId, shippingAddress, mode, items } = await req.json();

    let orderItems = [];

    // buy now

    if (mode === "buyNow") {
      if (!items || items.length === 0) {
        return NextResponse.json(
          { message: "No product provided for Buy Now" },
          { status: 400 },
        );
      }

      const productIds = items.map((i) => i.productId);

      const products = await productModel.find({
        _id: { $in: productIds },
      });

      orderItems = items.map((i) => {
        const product = products.find((p) => p._id.toString() === i.productId);

        if (!product) throw new Error("Product not found");

        return {
          product: product._id,
          shop: product.shop?.shopId,
          title: product.title,
          slug: product.slug,
          image: product.images[0]?.url,
          price: product.price,
          quantity: i.quantity,
        };
      });
    }

    // cart
    else {
      const cart = await cartModel.findOne({ user: userId }).populate({
        path: "items.product",
        select: "title slug price images shop",
      });

      if (!cart || cart.items.length === 0) {
        return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
      }

      orderItems = cart.items.map((item) => ({
        product: item.product._id,
        shop: item.product.shop?.shopId,
        title: item.product.title,
        slug: item.product.slug,
        image: item.product.images[0]?.url,
        price: item.product.price,
        quantity: item.quantity,
      }));

      // clear cart ONLY for cart checkout
      cart.items = [];
      await cart.save();
    }

    // Price Calculation
    const itemsPrice = orderItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const serviceFee = 500;
    const deliveryFee = itemsPrice > 50000 ? 0 : 120;
    const totalPrice = itemsPrice + serviceFee + deliveryFee;

    //  Create Order
    const order = await orderModel.create({
      user: userId,
      shippingAddress,
      items: orderItems,
      itemsPrice,
      serviceFee,
      deliveryFee,
      totalPrice,
      paymentStatus: "Paid",
    });

    return NextResponse.json({ success: true, orderId: order._id });
  } catch (error) {
    console.error("ORDER ERROR:", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 },
    );
  }
}
