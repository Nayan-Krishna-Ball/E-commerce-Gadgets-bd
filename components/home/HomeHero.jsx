import HomeFooter from "../FooterHome";
import HomeNav from "../HomeNav";
import FeaturedProductsCard from "./FeaturedProductsCard";
import HomeCard from "./HomeCard";
import HomeInfo from "./HomeInfo";
// import HomeNav from "./HomeNav";
import PopularCate from "./PopularCate";
import ShopBrands from "./ShopBrands";

//
export default function HomeHero() {
  return (
    <>
      {/* <body className="bg-amazon-background text-amazon-text flex flex-col min-h-screen"> */}
      {/* <!-- Navbar --> */}

      <HomeNav />

      {/* <!-- Main Content --> */}

      <main className="flex-1 max-w-[1500px] mx-auto w-full">
        {/* <!-- Hero Banner --> */}

        <div
          className="relative w-full h-64 md:h-80 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2574&auto=format&fit=crop)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-amazon-background to-transparent"></div>
        </div>

        {/* <!-- Categories & Content Grid --> */}

        <div className="relative z-10 -mt-32 px-4">
          <HomeCard />
          <FeaturedProductsCard />
        </div>

        {/* <!-- Why Shop With Us Section --> */}

        <HomeInfo />

        {/* <!-- Popular Categories Section --> */}

        <PopularCate />

        {/* <!-- Shop by Brand Section --> */}

        <ShopBrands />
      </main>

      {/* <!-- Footer --> */}

      <HomeFooter />
    </>
  );
}
