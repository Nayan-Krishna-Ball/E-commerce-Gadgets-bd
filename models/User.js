//

import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  image: {
    required: false,
    type: String,
  },
  mobile: {
    required: true,
    type: String,
  },
  address: {
    required: false,
    type: String,
  },
  postalCode: {
    required: false,
    type: String,
  },
  city: {
    required: false,
    type: String,
  },
  role: {
    type: String,
    required: true,
    default: "customer",
  },
  shopname: {
    required: false,
    type: String,
  },
  //shopid for shopOwner
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shop",
  },
});

export const userModel =
  mongoose.models.users ?? mongoose.model("users", userSchema);
