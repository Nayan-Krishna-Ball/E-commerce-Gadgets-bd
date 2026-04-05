//
import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
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
  title: String,
  slug: String,
  image: String,
  price: Number,
  quantity: Number,

  status: {
    type: String,
    default: "Processing",
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    items: [orderItemSchema],

    shippingAddress: {
      name: String,
      phone: String,
      address: String,
      city: String,
      postalCode: String,
      country: String,
    },

    paymentMethod: {
      type: String,
      default: "Card",
    },

    itemsPrice: Number,
    deliveryFee: Number,
    serviceFee: Number,
    totalPrice: Number,

    paymentStatus: {
      type: String,
      default: "Pending",
    },

    // orderStatus: {
    //   type: String,
    //   default: "Processing",
    // },
  },

  { timestamps: true },
);

export const orderModel =
  mongoose.models.order ?? mongoose.model("order", orderSchema);
