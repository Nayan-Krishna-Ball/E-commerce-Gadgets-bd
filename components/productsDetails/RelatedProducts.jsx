//

import { getProductsByCategory } from "@/queries";
import Image from "next/image";
import Link from "next/link";

export default async function RelatedProducts({ product }) {
  const { category } = product;
  const relatedProducts = await getProductsByCategory(category);

  const filteredProducts = relatedProducts.filter(
    (prod) => prod.id !== product.id,
  );

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="text-xl font-bold mb-6">Related Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* <!-- Related Product 1 --> */}
        {filteredProducts.map((prod) => (
          <Link
            key={prod.id}
            href={`/products/${prod.slug}`}
            className="border border-gray-200 rounded p-3 hover:shadow-md transition"
          >
            <div className="bg-gray-50 h-32 flex items-center justify-center mb-2">
              <Image
                width={200}
                height={200}
                alt={prod.images?.[0]?.alt || prod.title}
                src={prod.images?.[0]?.url}
                className="h-full object-cover"
              />
            </div>
            <p className="text-sm text-amazon-blue hover:text-amazon-orange line-clamp-2 mb-1">
              {prod.title}
            </p>
            <p className="text-sm font-bold">৳{prod.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
