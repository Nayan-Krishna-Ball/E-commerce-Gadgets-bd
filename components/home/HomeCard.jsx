import Image from "next/image";
import Link from "next/link";

//
export default function HomeCard() {
  return (
    <div className="relative z-10 -mt-32 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* <!-- Card 1 --> */}
        <div className="bg-white p-4 flex flex-col gap-4 shadow-sm z-20">
          <h2 className="text-xl font-bold">Laptops & PCs</h2>
          <div className="grid grid-cols-2 gap-2 h-full">
            <Image
              src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300"
              className="w-full h-full object-cover mb-1"
              alt="Laptop"
              width={150}
              height={150}
            />
            <Image
              src="https://images.unsplash.com/photo-1675868374786-3edd36dddf04?w=300"
              className="w-full h-full object-cover mb-1"
              alt="PC Setup"
              width={150}
              height={150}
            />
            <Image
              src="https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300"
              className="w-full h-full object-cover mb-1"
              alt="Desktop"
              width={150}
              height={150}
            />
            <Image
              src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=300"
              className="w-full h-full object-cover mb-1"
              alt="Keyboard"
              width={150}
              height={150}
            />
          </div>
          <Link
            href="/products"
            className="text-amazon-blue text-sm hover:underline hover:text-red-700 mt-auto"
          >
            See all laptops
          </Link>
        </div>

        {/* <!-- Card 2 --> */}
        <div className="bg-white p-4 flex flex-col gap-4 shadow-sm z-20">
          <h2 className="text-xl font-bold">Smartphones</h2>
          <div className="w-full h-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500"
              className="w-full h-full object-cover"
              alt="Mobile phone"
              width={500}
              height={300}
            />
          </div>
          <Link
            href="/products"
            className="text-amazon-blue text-sm hover:underline hover:text-red-700 mt-auto"
          >
            Shop smartphones
          </Link>
        </div>

        {/* <!-- Card 3 --> */}
        <div className="bg-white p-4 flex flex-col gap-4 shadow-sm z-20">
          <h2 className="text-xl font-bold">Accessories</h2>
          <div className="w-full h-full bg-gray-100 flex items-center justify-center overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
              className="w-full h-full object-cover"
              alt="Accessories"
              width={500}
              height={300}
            />
          </div>
          <Link
            href="/products"
            className="text-amazon-blue text-sm hover:underline hover:text-red-700 mt-auto"
          >
            Shop accessories
          </Link>
        </div>

        {/* <!-- Card 4 (Sign in promo) --> */}
        <div className="bg-white p-4 flex flex-col gap-4 shadow-sm z-20 justify-between">
          <div className="shrink-0">
            <h2 className="text-xl font-bold">
              Sign in for the best tech deals
            </h2>
            <button className="bg-amazon-yellow w-full py-2 rounded-md shadow-sm mt-4 text-sm hover:bg-amazon-yellow_hover">
              Sign in securely
            </button>
          </div>
          <div className="mt-4 grow h-full">
            <Image
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500"
              className="w-full h-full object-cover"
              alt="Tech deals"
              width={500}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
