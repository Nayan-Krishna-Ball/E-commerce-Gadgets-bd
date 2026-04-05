//
import { auth } from "@/auth";
import AddProduct from "@/components/shop/addProduct/AddProduct";
import FooterShop from "@/components/shopOwnerDetails/FooterShop";
import NavShop from "@/components/shopOwnerDetails/NavShop";
import { getProductByProductId, getShopByUserId } from "@/queries";
import { AlertCircle, LogIn } from "lucide-react";
import Link from "next/link";

export default async function AddProductsPage({ searchParams }) {
  const session = await auth();
  const productId = searchParams?.id;
  const editedProductInfo = await getProductByProductId(productId, true);

  const userId = session?.user?.id || session?.user?._id;
  const shop = await getShopByUserId(userId);

  if (!session) {
    return (
      <div className="bg-amazon-background text-amazon-text flex flex-col min-h-screen">
        <NavShop />

        <div className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center border border-gray-200">
            <LogIn className="mx-auto w-12 h-12 text-amazon-secondary mb-4" />

            <h2 className="text-xl font-bold mb-2">You are not signed in</h2>
            <p className="text-sm text-gray-600 mb-6">
              Please log in to view items in your cart and continue shopping.
            </p>

            <Link
              href="/login"
              className="inline-block w-full py-2 bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary rounded-md font-bold text-sm"
            >
              Sign In
            </Link>
          </div>
        </div>

        <FooterShop />
      </div>
    );
  }

  if (session.user.role !== "shopOwner") {
    return (
      <div className="bg-amazon-background text-amazon-text flex flex-col min-h-screen">
        <NavShop />

        <div className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center border border-gray-200">
            <AlertCircle className="mx-auto w-12 h-12 text-red-500 mb-4" />

            <h2 className="text-xl font-bold mb-2">Seller area only</h2>
            <p className="text-sm text-gray-600 mb-6">
              This section is reserved for shop owners to manage products and
              orders. You can continue browsing and shopping from the store.
            </p>

            <Link
              href="/"
              className="inline-block w-full py-2 bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-md font-medium text-sm"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        <FooterShop />
      </div>
    );
  }

  return (
    <div className="bg-amazon-background text-amazon-text flex flex-col min-h-screen">
      <NavShop session={session} />
      <AddProduct shop={shop} editedProductInfo={editedProductInfo} />
      <FooterShop />
    </div>
  );
}
