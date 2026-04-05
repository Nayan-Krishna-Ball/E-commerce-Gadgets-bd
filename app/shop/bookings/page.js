//
import { auth } from "@/auth";
import ShopBooking from "@/components/shop/bookings/ShopBooking";
import FooterShop from "@/components/shopOwnerDetails/FooterShop";
import NavShop from "@/components/shopOwnerDetails/NavShop";
import { getShopByUserId } from "@/queries";
import { getOrdersByShopId } from "@/queries/order";

import { redirect } from "next/navigation";

export default async function ShopBookingsPage() {
  const session = await auth();
  const userId = session?.user?.id || session?.user?._id;
  const shop = await getShopByUserId(userId);

  const order = await getOrdersByShopId(shop._id);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "shopOwner") {
    redirect("/");
  }
  return (
    <div className="bg-amazon-background text-amazon-text flex flex-col min-h-screen">
      <NavShop session={session} />
      <ShopBooking orders={order} />
      <FooterShop />
    </div>
  );
}
