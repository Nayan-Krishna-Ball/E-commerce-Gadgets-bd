import { auth } from "@/auth";
import FooterShop from "@/components/shopOwnerDetails/FooterShop";
import NavShop from "@/components/shopOwnerDetails/NavShop";
import ShopOwnerProfile from "@/components/shopOwnerDetails/shopOwnerProfile";
import { getShopByUserId } from "@/queries";
import { redirect } from "next/navigation";

export default async function ShopOwnerProfilePage() {
  const session = await auth();
  const userId = session?.user?.id || session?.user?._id;
  const shop = await getShopByUserId(userId);

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "shopOwner") {
    redirect("/");
  }
  return (
    <div className="bg-amazon-background text-amazon-text flex flex-col min-h-screen">
      <NavShop session={session} />
      <ShopOwnerProfile shop={shop} />
      <FooterShop />
    </div>
  );
}
