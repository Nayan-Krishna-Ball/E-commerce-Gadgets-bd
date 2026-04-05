//

import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },

    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    headline: {
      type: String,
      trim: true,
    },

    comment: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    isVerifiedPurchase: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const reviewModel =
  mongoose.models.review ?? mongoose.model("review", reviewSchema);
