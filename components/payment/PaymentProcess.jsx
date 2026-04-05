//
"use client";

import { ShieldCheck, Truck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import AddressDisplay from "./AdressForm/AddressDisplay";
import AddressForm from "./AdressForm/AddressForm";
import PaymentMethod from "./PayementPocessAllFile/PaymentMethod";
import ReviewItems from "./PayementPocessAllFile/ReviewItems";

export default function PaymentProcess({
  items,
  user,
  mode,
  qty,
  singleProduct,
}) {
  const [address, setAddress] = useState({
    name: user?.name || "",
    phone: user?.mobile || "",
    address: user?.address || "",
    city: user?.city || "",
    postalCode: user?.postalCode || "",
    country: "Bangladesh",
  });

  const [editingAddress, setEditingAddress] = useState(false);

  const [card, setCard] = useState({
    name: "",
    number: "",
    cvv: "",
  });

  const router = useRouter();

  const totalPrice = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

  const totalItemsLength = items.length;

  const placeOrder = async () => {
    if (!card.name || !card.number || !card.cvv) {
      toast.error("Please fill payment information");
      return;
    }

    if (!address.address || !address.city || !address.phone) {
      toast.error("Please fill shipping address");
      return;
    }

    const loadingToast = toast.loading("Processing your order...");
    try {
      const res = await fetch("/api/order/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          shippingAddress: address,
          paymentInfo: card,
          mode,
          items:
            mode === "buyNow"
              ? [
                  {
                    productId: singleProduct.id,
                    quantity: qty,
                  },
                ]
              : null,
        }),
      });

      // const data = await res.json();
      let data = {};
      try {
        data = await res.json();
      } catch (err) {
        console.error("No JSON returned", err);
      }
      toast.dismiss(loadingToast);

      if (res.ok) {
        toast.success("Payment Successful 🎉 Order Confirmed!");
        router.refresh();
        router.push("/payment/success");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error(error);
      toast.error("Server error. Please try again.");
    }
  };

  let serviceCharge = 500;

  return (
    <main className="checkout-container flex-1 py-10 px-4 flex flex-col lg:flex-row gap-8">
      {/* <!-- Left Side: Steps --> */}
      <div className="flex-1 space-y-6">
        {/* <!-- 1. Shipping Address Summary --> */}

        <div className="border-b border-gray-300 py-6 hover:bg-gray-50 transition-colors rounded-lg px-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-900 text-white text-sm">
                1
              </span>

              <span className="font-semibold text-lg">Shipping address</span>
            </div>

            {!editingAddress && (
              <button
                type="button"
                onClick={() => setEditingAddress(true)}
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                Change
              </button>
            )}
          </div>

          <div className="text-sm space-y-2">
            {editingAddress ? (
              <AddressForm address={address} setAddress={setAddress} />
            ) : (
              <AddressDisplay address={address} />
            )}
          </div>

          {editingAddress && (
            <div className="flex gap-3 mt-5">
              <button
                type="button"
                onClick={() => setEditingAddress(false)}
                className="px-4 py-2 text-sm rounded-md border hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setEditingAddress(false)}
                className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Save Address
              </button>
            </div>
          )}
        </div>

        {/* <!-- 2. Selected Products List --> */}

        <ReviewItems items={items} />

        {/* <!-- 3. Payment Method --> */}

        <PaymentMethod card={card} setCard={setCard} />
      </div>

      {/* <!-- Right Side: Order Summary --> */}
      <div className="w-full lg:w-[300px]">
        <div className="box p-4 sticky top-10">
          <button
            onClick={placeOrder}
            className="w-full py-2 mb-4 rounded-md btn-primary text-sm font-normal shadow-sm"
          >
            Place your order
          </button>
          <p className="text-[10px] text-gray-500 text-center mb-4 border-b border-gray-300 pb-4 leading-tight">
            By placing your order, you agree to Gadgets BDs
            <a
              href="#"
              className="text-amazon-blue text-xs hover:underline hover:text-amazon-orange"
            >
              {" "}
              privacy notice
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-amazon-blue text-xs hover:underline hover:text-amazon-orange"
            >
              conditions of use
            </a>
            .
          </p>

          <h3 className="font-bold text-lg mb-4">Order Summary</h3>
          <div className="space-y-2 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Items ({totalItemsLength}):</span>
              <span>৳ {totalPrice.toLocaleString("en-BD")}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee:</span>
              <span className="text-green-600 font-bold">FREE</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span>Service Fee:</span>
              <span>৳ {serviceCharge}</span>
            </div>
            <div className="flex justify-between text-amazon-orange text-lg font-bold pt-2">
              <span>Order Total:</span>
              <span>
                ৳ {(totalPrice + serviceCharge).toLocaleString("en-BD")}
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 text-xs">
            <p className="text-green-600 font-bold mb-2">
              <Truck className="w-4 h-4 inline mr-1" />
              FREE Delivery on orders over ৳50,000
            </p>
            <p className="text-gray-600">
              <ShieldCheck className="w-4 h-4 inline mr-1" />
              Secure checkout
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
