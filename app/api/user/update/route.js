//

import { connectDB } from "@/lib/db";
import { userModel } from "@/models/User";

export async function POST(req) {
  const { userId, name, mobile, address, postalCode, city, image } =
    await req.json();

  await connectDB();

  const updatedData = {
    name,
    mobile,
    address,
    postalCode,
    city,
    image,
  };

  await userModel.findByIdAndUpdate(userId, updatedData);

  return Response.json({ success: true });
}
