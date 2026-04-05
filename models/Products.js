//

import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    pName: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
    },

    shortDescription: {
      type: String,
    },

    aboutItem: {
      type: [String],
      required: false,
    },

    features: {
      cpu: { type: String },
      gpu: { type: String },
      ram: { type: String },
      storage: { type: String },
      display: { type: String },
      battery: { type: String },
      camera: { type: String },
      ports: { type: [String] },
    },

    price: {
      type: Number,
      required: true,
    },

    discountPrice: {
      type: Number,
      required: false,
    },

    stock: {
      type: Number,
      default: 0,
    },

    soldCount: {
      type: Number,
      default: 0,
    },

    images: {
      type: [
        {
          url: { type: String, required: true },
          alt: { type: String },
        },
      ],
    },

    category: {
      type: String,
    },

    subCategory: {
      type: String,
    },

    brand: {
      type: String,
    },

    tags: {
      type: [String],
    },

    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },

    shop: {
      shopId: { type: mongoose.Schema.Types.ObjectId, ref: "Shop" },
      shopName: { type: String },
    },

    status: {
      type: String,
      enum: ["unpublished", "published"],
      default: "unpublished",
    },

    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const productModel =
  mongoose.models.product ?? mongoose.model("product", productSchema);
