//
import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",

    required: true,
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shop",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
  },
  { timestamps: true },
);

// export default mongoose.models.Cart || mongoose.model("cart", cartSchema);

export const cartModel =
  mongoose.models.carts ?? mongoose.model("carts", cartSchema);
