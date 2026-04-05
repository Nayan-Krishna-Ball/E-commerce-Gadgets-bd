//

import { connectDB } from "@/lib/db";
import { cartModel } from "@/models/Cart";
import { productModel } from "@/models/Products";

export async function addToCartServer({ userId, productId, quantity }) {
  await connectDB();

  const product = await productModel.findById(productId).lean();
  if (!product) throw new Error("Product not found");

  let cart = await cartModel.findOne({ user: userId });

  if (!cart) {
    cart = await cartModel.create({
      user: userId,
      items: [
        {
          product: productId,
          shop: product.shop.shopId,
          quantity,
          price: product.price,
        },
      ],
    });
    return cart;
  }

  const index = cart.items.findIndex((i) => i.product.toString() === productId);
  if (index > -1) cart.items[index].quantity += quantity;
  else
    cart.items.push({
      product: productId,
      shop: product.shop.shopId,
      quantity,
      price: product.price,
    });

  await cart.save();
  return cart;
}
