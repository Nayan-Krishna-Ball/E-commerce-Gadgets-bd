//

import { auth } from "@/auth";
import ShopManageList from "@/components/shop/manageList/ShopManageList";
import FooterShop from "@/components/shopOwnerDetails/FooterShop";
import NavShop from "@/components/shopOwnerDetails/NavShop";
import { getAllProductsByShopId, getShopByUserId } from "@/queries";
import { redirect } from "next/navigation";

export default async function ShopManageListPage() {
  const session = await auth();

  const userId = session?.user?.id || session?.user?._id;
  const shop = await getShopByUserId(userId);
  const shopProducts = await getAllProductsByShopId(shop._id);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "shopOwner") {
    redirect("/");
  }

  return (
    <div className="bg-amazon-background text-amazon-text flex flex-col min-h-screen">
      <NavShop session={session} />
      <ShopManageList shopProducts={shopProducts} />
      <FooterShop />
    </div>
  );
}
