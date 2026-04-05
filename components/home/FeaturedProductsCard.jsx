import { auth } from "@/auth";
import { getTopSellingProducts } from "@/queries";
import { formatPrice } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../productsDetails/AddToCardButton";

//
export default async function FeaturedProductsCard() {
  const session = await auth();

  const topSellingProducts = await getTopSellingProducts(10);

  const topSellingProductsFiltered = topSellingProducts.filter(
    (product) => product.soldCount >= 10,
  );

  return (
    <div className="mt-8 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-bold">Featured Products</h2>
        <Link
          href="/products"
          className="text-amazon-blue text-sm hover:underline hover:text-red-700"
        >
          View All
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
        {/* <!-- Product 1 --> */}
        {topSellingProductsFiltered.map((product) => (
          <div key={product.id} className="flex-none w-48">
            <Link href={`/products/${product.slug}`}>
              <div className="bg-gray-50 h-48 flex items-center justify-center mb-2 p-2">
                <Image
                  width={300}
                  height={300}
                  src={product.images[0]?.url}
                  alt={product.images[0]?.alt}
                  className="h-full object-cover mix-blend-multiply"
                />
              </div>
              <div className="text-sm hover:text-amazon-orange text-amazon-blue line-clamp-2">
                {product.title}
              </div>
            </Link>
            <div className="text-xs text-gray-500">{product.shop.shopName}</div>
            <div className="mt-1">
              <span className="text-xs align-top">৳</span>
              <span className="text-xl font-bold">
                {formatPrice(product.price)}
              </span>
            </div>
            <div className="text-xs text-gray-500 mb-2">Get it by Tomorrow</div>

            {/* <button className="w-full bg-amazon-yellow hover:bg-amazon-yellow_hover text-sm py-1.5 rounded-md shadow-sm font-medium border border-amazon-secondary transition-colors">
              Add to Cart
            </button> */}
            <AddToCartButton
              product={product}
              userId={session?.user?.id}
              quantity={1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
