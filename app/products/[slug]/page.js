//
import { auth } from "@/auth";
import HomeFooter from "@/components/FooterHome";
import HomeNav from "@/components/HomeNav";
import ProductsDetails from "@/components/productsDetails/ProductsDetails";
import {
  getProductBySlug,
  getReviewsByProductId,
  getShopById,
} from "@/queries";

export default async function ProductsDetailsPage({ params: { slug } }) {
  const product = await getProductBySlug(slug);

  const shopId = product.shop.shopId;

  const shop = await getShopById(shopId);

  const session = await auth();

  const reviews = await getReviewsByProductId(product.id, session?.user?.id);

  return (
    <>
      <HomeNav />
      <ProductsDetails
        product={product}
        shop={shop}
        session={session}
        reviews={reviews}
      />

      <HomeFooter />
    </>
  );
}
