//

import { connectDB } from "@/lib/db";
import { cartModel } from "@/models/Cart";
import { productModel } from "@/models/Products";
import { NextResponse } from "next/server";

// export async function PATCH(req) {
//   try {
//     await connectDB();

//     const { userId, productId, quantity } = await req.json();

//     if (!userId || !productId || !quantity) {
//       return NextResponse.json(
//         { message: "Missing required fields" },
//         { status: 400 },
//       );
//     }

//     // const product = await productModel.findById(productId);

//     // if (quantity > product.stock) {
//     //   return NextResponse.json(
//     //     { message: "Not enough stock available" },
//     //     { status: 400 },
//     //   );
//     // }

//     const cart = await cartModel.findOne({ user: userId });

//     if (!cart) {
//       return NextResponse.json({ message: "Cart not found" }, { status: 404 });
//     }

//     // Find product in cart
//     const item = cart.items.find(
//       (item) => item.product.toString() === productId,
//     );

//     if (!item) {
//       return NextResponse.json(
//         { message: "Item not found in cart" },
//         { status: 404 },
//       );
//     }

//     // Update quantity
//     item.quantity = Number(quantity);

//     await cart.save();

//     return NextResponse.json({
//       message: "Quantity updated",
//       cart,
//     });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ message: "Server error" }, { status: 500 });
//   }
// }

export async function PATCH(req) {
  try {
    await connectDB();

    const { userId, productId, quantity } = await req.json();
    const newQty = Number(quantity);

    if (!userId || !productId || newQty < 1) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    const cart = await cartModel.findOne({ user: userId });

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    const item = cart.items.find((i) => i.product.toString() === productId);

    if (!item) {
      return NextResponse.json(
        { message: "Item not in cart" },
        { status: 404 },
      );
    }

    const oldQty = item.quantity;
    const delta = newQty - oldQty;

    if (delta > 0) {
      const product = await productModel.findOneAndUpdate(
        { _id: productId, stock: { $gte: delta } }, // ensure stock available
        { $inc: { stock: -delta, soldCount: delta } },
        { new: true },
      );

      if (!product) {
        return NextResponse.json(
          { message: "Not enough stock available" },
          { status: 400 },
        );
      }
    }

    if (delta < 0) {
      await productModel.findByIdAndUpdate(productId, {
        $inc: { stock: Math.abs(delta), soldCount: -Math.abs(delta) },
      });
    }

    // Update cart AFTER stock is handled
    item.quantity = newQty;
    await cart.save();

    return NextResponse.json({
      message: "Quantity updated & stock synced",
      cart,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
