import Image from "next/image";
import Link from "next/link";
import AddToCartDetails from "./AddToCartProductDetails";
import ProductInfoHero from "./ProductInfoHero";
import ProductTabSection from "./ProductTabSection";
import RelatedProducts from "./RelatedProducts";

export default function ProductsDetails({ product, shop, reviews, session }) {
  return (
    <div className="bg-white text-amazon-text flex flex-col min-h-screen">
      <main className="flex-1 max-w-[1500px] mx-auto w-full p-4">
        {/* <!-- Breadcrumbs --> */}
        <div className="text-xs text-gray-500 mb-4 flex items-center gap-1">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <i data-lucide="chevron-right" className="w-3 h-3"></i>
          <Link href="/products" className="hover:underline">
            {product.category}
          </Link>
          <i data-lucide="chevron-right" className="w-3 h-3"></i>
          <Link href="/products" className="hover:underline">
            {product.category} & {product.subCategory}
          </Link>
          <i data-lucide="chevron-right" className="w-3 h-3"></i>
          <span className="text-amazon-text font-bold">{product.pName}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* <!-- Left: Image Gallery --> */}

          <div className="lg:col-span-5 flex gap-4">
            <div className="flex flex-col gap-2">
              <button className="w-10 h-10 border border-amazon-secondary rounded overflow-hidden hover:shadow-md">
                <Image
                  height={50}
                  width={50}
                  alt="left image"
                  src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=100"
                  className="w-full h-full object-cover"
                />
              </button>
              <button className="w-10 h-10 border border-gray-300 rounded overflow-hidden hover:shadow-md">
                <Image
                  height={50}
                  width={50}
                  alt="left image"
                  src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=100"
                  className="w-full h-full object-cover"
                />
              </button>
              <button className="w-10 h-10 border border-gray-300 rounded overflow-hidden hover:shadow-md">
                <Image
                  height={50}
                  width={50}
                  alt="left image"
                  src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=100"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
            <div className="flex-1 border border-gray-200 rounded p-4 bg-gray-50">
              <Image
                src={product.images?.[0]?.url}
                alt={product.images?.[0]?.alt || product.title}
                width={600}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* <!-- Center: Product Info --> */}
          <ProductInfoHero product={product} />

          {/* <!-- Right: Buy Box --> */}
          <AddToCartDetails product={product} />
        </div>

        {/* <!-- Tabs Section --> */}
        <ProductTabSection
          product={product}
          shop={shop}
          reviews={reviews}
          session={session}
        />

        {/* <!-- Related Products --> */}
        <RelatedProducts product={product} />
      </main>
    </div>
  );
}
