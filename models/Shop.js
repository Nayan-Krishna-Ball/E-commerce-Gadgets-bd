//

import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },

    logo: {
      type: String,
    },
    coverImage: {
      type: String,
    },

    description: {
      type: String,
    },

    location: {
      city: String,
      country: String,
      fullAddress: String,
    },

    rating: {
      average: { type: Number, default: 0 },
      totalRatings: { type: Number, default: 0 },
    },

    stats: {
      totalProducts: Number,
      joinedDate: Date,
      responseTime: String,
    },

    specialization: { type: String },

    policies: {
      returnPolicy: String,
      warranty: String,
      shipping: String,
      payment: String,
    },
    //owner add
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    // new
    ownerInfo: {
      name: String,
      phone: String,
      email: String,
    },
    businessInfo: {
      yearEstablished: Number,
      employees: Number,
      website: String,
      brands: [String],
    },
  },
  { timestamps: true },
);

export const shopModel =
  mongoose.models.shop ?? mongoose.model("shop", shopSchema);

// export const shopModel =
//   mongoose.models.shops || mongoose.model("shop", shopSchema);
