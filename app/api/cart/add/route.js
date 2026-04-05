//

import { connectDB } from "@/lib/db";
import { cartModel } from "@/models/Cart";
import { productModel } from "@/models/Products";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    await connectDB();

    const { userId, productId, quantity = 1 } = await req.json();

    // const product = await productModel.findById(productId).lean();
    const product = await productModel
      .findOneAndUpdate(
        { _id: productId, stock: { $gte: quantity } },
        { $inc: { stock: -quantity, soldCount: quantity } },
        { new: true },
      )
      .lean();

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    const shopId = product.shop.shopId;

    let cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      cart = await cartModel.create({
        user: userId,
        items: [
          {
            product: productId,
            shop: shopId,
            quantity,
            price: product.price,
          },
        ],
      });
      return NextResponse.json(cart);
    }
    // 🔁 Check if product already in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        shop: shopId,
        quantity,
        price: product.price,
      });
    }

    await cart.save();

    return NextResponse.json(cart);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Cart error" }, { status: 500 });
  }
};

// export async function POST(req) {
//   await connectDB();
//   const { userId, productId, quantity } = await req.json();

//   const product = await productModel.findById(productId);

//   if (!product) {
//     return NextResponse.json({ message: "Product not found" }, { status: 404 });
//   }

//   // 🚨 STOCK CHECK HERE
//   if (quantity > product.stock) {
//     return NextResponse.json({ message: "Not enough stock" }, { status: 400 });
//   }

//   // check existing cart item
//   let cart = await cartModel.findOne({ user: userId });

//   const existingItem = cart.items.find(
//     (item) => item.product.toString() === productId,
//   );

//   if (existingItem) {
//     const newQty = existingItem.quantity + quantity;

//     if (newQty > product.stock) {
//       return NextResponse.json({ message: "Stock exceeded" }, { status: 400 });
//     }

//     existingItem.quantity = newQty;
//   } else {
//     cart.items.push({
//       product: productId,
//       shop: shopId,
//       quantity,
//       price: product.price,
//     });
//   }

//   await cart.save();

//   return NextResponse.json(cart);
// }
