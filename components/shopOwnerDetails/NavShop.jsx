//
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import NavLogOutShop from "./NavLogOutShop";

export default function NavShop({ session }) {
  const pathname = usePathname();
  const navLinkClass = (path) =>
    `hover:underline underline-offset-4 decoration-2 ${
      pathname === path
        ? "underline decoration-amazon-secondary"
        : "no-underline hover:text-amazon-secondary transition "
    }`;

  return (
    <nav className="bg-amazon text-white p-3 shadow-md">
      <div className="max-w-[1500px] mx-auto flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold tracking-tighter">
              gadgets<span className="italic text-amazon-secondary">BD</span>
              <span className="text-sm font-normal ml-2 bg-gray-700 px-2 py-0.5 rounded">
                seller central
              </span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          <Link
            href="/shop/add-product"
            className={navLinkClass("/shop/add-product")}
          >
            Add Product
          </Link>

          <Link
            href="/shop/inventory"
            className={navLinkClass("/shop/inventory")}
          >
            Manage Products
          </Link>
          <Link
            href="/shop/bookings"
            className={navLinkClass("/shop/bookings")}
          >
            Orders
          </Link>
          <Link href="/profile" className={navLinkClass("/profile")}>
            Shop Profile
          </Link>

          <div className="h-4 w-px bg-gray-600"></div>

          {/*  Auth Section */}
          <NavLogOutShop session={session} />
        </div>
      </div>
    </nav>
  );
}
