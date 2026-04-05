//

import { connectDB } from "@/lib/db";
import { shopModel } from "@/models/Shop";
import { userModel } from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import slugify from "slugify";

export const POST = async (req) => {
  const { name, mobile, password, email, role, shopname } = await req.json();

  await connectDB();

  const hashedPassword = await bcrypt.hash(password, 5);

  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return new NextResponse("User this email allready exists", {
      status: 400,
    });
  }

  // const newUser = {
  //   name,
  //   mobile,
  //   password: hashedPassword,
  //   email,
  //   role,
  //   shopname,
  // };
  try {
    const user = await userModel.create({
      name,
      mobile,
      password: hashedPassword,
      email,
      role,
    });

    // try to create shop name for shopOwner

    if (role === "shopOwner" && shopname) {
      const shop = await shopModel.create({
        name: shopname,
        slug: slugify(shopname, { lower: true }),
        owner: user._id,
        stats: {
          joinedDate: new Date(),
          totalProducts: 0,
        },
      });

      user.shop = shop._id;
      await user.save();
    }

    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }
};
