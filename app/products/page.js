//

import HomeFooter from "@/components/FooterHome";
import HomeNav from "@/components/HomeNav";
import AllProducts from "@/components/products/AllProducts";

//
export default function ProductsPage({ searchParams }) {
  return (
    <>
      <div className="bg-white text-amazon-text flex flex-col min-h-screen">
        <HomeNav />
        <AllProducts searchParams={searchParams} />
        <HomeFooter />
      </div>
    </>
  );
}
