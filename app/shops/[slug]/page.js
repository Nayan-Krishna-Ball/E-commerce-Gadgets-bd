//

import SingleShop from "@/components/shops/SingleShop";
import { getAllProductsByShopId, getShopBySlug } from "@/queries";

import HomeFooter from "@/components/FooterHome";
import HomeNav from "@/components/HomeNav";
export default async function SingleShopPage({ params: { slug } }) {
  const shopBySlug = await getShopBySlug(slug);

  const shopProducts = await getAllProductsByShopId(shopBySlug._id);

  return (
    <div className="bg-amazon-background text-amazon-text flex flex-col min-h-screen">
      <HomeNav />
      <SingleShop shop={shopBySlug} shopProducts={shopProducts} />

      <HomeFooter />
    </div>
  );
}
