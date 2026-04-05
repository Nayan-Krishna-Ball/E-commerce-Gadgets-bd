//
import { auth } from "@/auth";
import HomeNav from "@/components/HomeNav";
import PaymentFooter from "@/components/payment/PayementFooter";
import Success from "@/components/payment/success/Success";
import { getOrderByUserId } from "@/queries";
import { AlertCircle, LogIn } from "lucide-react";
import Link from "next/link";

export default async function PaymenstSuccessPage() {
  const session = await auth();

  const order = await getOrderByUserId(session?.user?.id);
  const latestOrder = order?.[0];

  if (!session) {
    return (
      <div className="bg-amazon-background text-amazon-text flex flex-col min-h-screen">
        <HomeNav />

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

        <PaymentFooter />
      </div>
    );
  }

  if (session.user.role === "shopOwner") {
    return (
      <div className="bg-amazon-background text-amazon-text flex flex-col min-h-screen">
        <HomeNav />

        <div className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center border border-gray-200">
            <AlertCircle className="mx-auto w-12 h-12 text-red-500 mb-4" />

            <h2 className="text-xl font-bold mb-2">Access Restricted</h2>
            <p className="text-sm text-gray-600 mb-6">
              This page is for customers only. Seller accounts can manage
              products and orders from Seller Central.
            </p>

            <Link
              href="/profile"
              className="inline-block w-full py-2 bg-gray-200 hover:bg-gray-300 border border-gray-300 rounded-md font-medium text-sm"
            >
              Go to Seller Dashboard
            </Link>
          </div>
        </div>

        <PaymentFooter />
      </div>
    );
  }

  return (
    <div className="bg-white text-amazon-text flex flex-col min-h-screen">
      <HomeNav />
      <Success latestOrder={latestOrder} />
      <PaymentFooter />
    </div>
  );
}
