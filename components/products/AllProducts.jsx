//

import { getAllProducts } from "@/queries";

import FilterProducts from "../search/FilterProducts";
import NotFoundPage from "./NotFoundPage";
import ProductsCard from "./ProductsCard";

export default async function AllProducts({ searchParams }) {
  const filters = {
    category: searchParams.category,
    keyword: searchParams.q,
    brand: searchParams.brand,
    rating: searchParams.rating,
    price: searchParams.price,
    stock: searchParams.stock,
  };

  const products = await getAllProducts(filters);

  if (!products.length) {
    return (
      <>
        <NotFoundPage />
      </>
    );
  }

  return (
    <main className="flex-1 max-w-[1500px] mx-auto w-full p-4">
      {/* <!-- Results Header --> */}
      <div className="flex justify-between items-center mb-4 shadow-sm border-b pb-2">
        <div className="text-sm">
          <span>
            1-{products.length} of over {products.length} results for
          </span>
          <span className="font-bold text-amazon-orange">
            {" "}
            {searchParams?.q || searchParams?.category || "All Products"}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select className="text-sm bg-gray-100 border border-gray-300 rounded px-2 py-1 shadow-sm focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary">
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Avg. Customer Review</option>
            <option>Newest Arrivals</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* <!-- Sidebar Filters --> */}
        <div className="w-64 hidden lg:block flex-shrink-0 border-r pr-4">
          {/* <!-- Category --> */}
          <FilterProducts />
        </div>

        {/* <!-- Product Grid --> */}
        <ProductsCard products={products} />
      </div>
    </main>
  );
}
