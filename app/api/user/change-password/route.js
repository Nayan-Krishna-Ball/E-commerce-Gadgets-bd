import { connectDB } from "@/lib/db";
import { userModel } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { userId, oldPassword, newPassword } = await req.json();

  await connectDB();

  const user = await userModel.findById(userId);
  if (!user) {
    return Response.json({ error: "User not found" });
  }

  const match = await bcrypt.compare(oldPassword, user.password);

  if (!match) {
    return Response.json({ error: "Wrong password" });
  }

  user.password = await bcrypt.hash(newPassword, 5);
  await user.save();

  return Response.json({ success: true });
}
