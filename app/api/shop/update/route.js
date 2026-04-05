//

import { auth } from "@/auth";
import { connectDB } from "@/lib/db";
import { shopModel } from "@/models/Shop";

export async function PUT(req) {
  await connectDB();
  const session = await auth();
  if (!session)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const shop = await shopModel.findOne({ owner: session.user.id });

  if (!shop) return Response.json({ error: "Shop not found" }, { status: 404 });

  // Only owner can update
  if (shop.owner.toString() !== session.user.id) {
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  Object.assign(shop, body);
  await shop.save();

  return Response.json({ success: true, shop });
}
