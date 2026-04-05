//

import { connectDB } from "@/lib/db";
import { orderModel } from "@/models/Order";
import { reviewModel } from "@/models/review";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { productId, userId, rating, headline, comment, image } = body;

    if (!rating || !comment) {
      return NextResponse.json(
        { message: "Rating and comment are required" },
        { status: 400 },
      );
    }

    //  Check if user purchased this product
    const order = await orderModel.findOne({
      user: userId,
      "items.product": productId,
      paymentStatus: "Paid",
    });

    if (!order) {
      return NextResponse.json(
        { message: "You must purchase this product before reviewing." },
        { status: 403 },
      );
    }

    const alreadyReviewed = await reviewModel.findOne({
      user: userId,
      product: productId,
    });

    if (alreadyReviewed) {
      return NextResponse.json(
        { message: "You already reviewed this product." },
        { status: 400 },
      );
    }

    const review = await reviewModel.create({
      product: productId,
      user: userId,
      order: order._id,
      rating,
      headline,
      comment,
      image,
      isVerifiedPurchase: true,
    });

    return NextResponse.json(
      { message: "Review submitted successfully", review },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong in api" },
      { status: 500 },
    );
  }
}
