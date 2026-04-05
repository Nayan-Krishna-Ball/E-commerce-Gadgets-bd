import { NextResponse } from "next/server";

import { connectDB } from "@/lib/db";
import { productModel } from "@/models/Products";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const product = await productModel.create(body);

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
