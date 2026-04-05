///

import HomeFooter from "@/components/FooterHome";
import HomeNav from "@/components/HomeNav";
import ShopsList from "@/components/shops/ShopsList";
import { getPaginatedShops } from "@/queries";

export default async function ShopsPage({ searchParams }) {
  const page = Number(searchParams.page) || 1;

  const { shops, totalPages } = await getPaginatedShops(page, 6);

  return (
    <div className="bg-amazon-background text-amazon-text flex flex-col min-h-screen">
      <HomeNav />
      <ShopsList shops={shops} totalPages={totalPages} currentPage={page} />

      <HomeFooter />
    </div>
  );
}
