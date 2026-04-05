//

import { auth } from "@/auth";
import { getCartByUserId } from "@/queries";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import HomeLogout from "./HomeLogout";
import SearchBox from "./search/SearchBox";

export default async function HomeNav() {
  const session = await auth();

  //Cart items length
  const allCartItems = await getCartByUserId(session?.user?.id);
  const allCartProductLength = allCartItems?.items?.length;

  const user = session?.user;
  const role = user?.role;

  return (
    <nav className="bg-amazon text-white">
      {/* <!-- Top Nav --> */}
      <div className="max-w-[1500px] mx-auto flex items-center p-2 gap-4">
        {/* <!-- Logo --> */}
        <Link
          href="/"
          className="flex items-center hover:outline hover:outline-1 hover:outline-white rounded-sm p-1"
        >
          <span className="text-2xl font-bold tracking-tighter">
            gadgets<span className="italic text-amazon-secondary">BD</span>
          </span>
        </Link>

        {/* <!-- Search --> */}
        <SearchBox />
        {/* <!-- Right Actions --> */}
        <div className="flex items-center gap-4">
          {/* <!-- Language --> */}
          <div className="hidden md:flex items-center hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer">
            <div className="font-bold text-sm">EN</div>
          </div>

          {/* <!-- Account --> */}

          {!user ? (
            <Link
              href="/login"
              className="hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer"
            >
              <div className="text-xs leading-none text-gray-300">
                Hello, Sign in
              </div>
              <div className="font-bold text-sm">Account & Lists</div>
            </Link>
          ) : (
            <div className="relative group hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer">
              <div className="text-xs leading-none text-gray-300">
                Hello, {user.name}
              </div>
              <div className="font-bold text-sm">My Account</div>

              {/* Dropdown */}

              <div
                className="absolute right-0 top-full w-48 bg-white text-black shadow-lg rounded opacity-0 invisible
                            group-hover:opacity-100 group-hover:visible  transition duration-200 z-50 "
              >
                {/* Common */}
                <Link href="/" className="block px-4 py-2 hover:bg-gray-100">
                  Home
                </Link>

                {role === "shopOwner" && (
                  <>
                    <Link
                      href="/profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Shop Profile
                    </Link>

                    <Link
                      href="/shop/add-product"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Add Product
                    </Link>
                    <Link
                      href="/shop/inventory"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Manage Products
                    </Link>
                  </>
                )}

                {(role === "customer" || !role) && (
                  <>
                    <Link
                      href="/customer-profile"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/products"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Products
                    </Link>
                    <Link
                      href="/shops"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Shops
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}

          {!user && (
            <Link
              href="/login-shop"
              className="hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer"
            >
              <div className="font-bold text-sm">Become a Seller</div>
            </Link>
          )}

          {user && <HomeLogout />}

          {/* <!-- Cart --> */}
          <Link
            href="/cart"
            className="flex items-end hover:outline hover:outline-1 hover:outline-white rounded-sm p-1 cursor-pointer relative"
          >
            <ShoppingCart className="w-8 h-8" />
            <span className="font-bold text-amazon-secondary absolute top-0 left-1/2 -translate-x-1/2 text-sm">
              {allCartProductLength || 0}
            </span>
            <span className="font-bold text-sm hidden md:block">Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
