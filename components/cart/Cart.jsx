//
"use client";
import { formatPrice } from "@/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Cart({ allCartItems, allCartProductLength }) {
  const [cartItems, setCartItems] = useState(allCartItems?.items);

  const router = useRouter();

  const totalPrice = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleQtyChange = async (productId, newQty, stock) => {
    if (newQty > stock) {
      toast.error("Stock limit reached");
      return;
    }

    // Update UI instantly
    const updatedItems = cartItems.map((item) =>
      item.product._id === productId
        ? { ...item, quantity: Number(newQty) }
        : item,
    );
    setCartItems(updatedItems);

    // Update DB
    try {
      await fetch("/api/cart/updateQty", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: allCartItems.user,
          productId,
          quantity: newQty,
        }),
      });
      router.refresh();
    } catch (err) {
      toast.error("Failed to update quantity");
    }
  };

  const handleDelete = async (productId) => {
    toast((t) => (
      <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-5 w-80">
        <p className="text-sm font-semibold text-gray-800">
          Remove item from cart?
        </p>
        <p className="text-xs text-gray-500 mt-1">
          This product will be removed permanently.
        </p>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={() => toast.dismiss(t.id)}
            className="px-4 py-1.5 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              toast.dismiss(t.id);
              deleteItem(productId);
            }}
            className="px-4 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition shadow"
          >
            Remove
          </button>
        </div>
      </div>
    ));
  };

  const deleteItem = async (productId) => {
    setCartItems((prev) =>
      prev.filter((item) => item.product._id !== productId),
    );

    try {
      const res = await fetch("/api/cart/deleteCart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: allCartItems.user,
          productId,
          // try here
          quantity: cartItems.find((item) => item.product._id === productId)
            ?.quantity,
        }),
      });

      if (res.ok) {
        toast.success("Item removed from cart 🗑️");
        router.refresh();
      } else {
        toast.error("Failed to remove item");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <main className="max-w-[1500px] mx-auto w-full p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* <!-- Cart Items --> */}

        <div className="flex-1">
          {/* <!-- Cart Header --> */}
          <div className="bg-white p-4 mb-4 border-b border-gray-300">
            <h1 className="text-2xl font-normal mb-2">Shopping Cart</h1>
            <div className="text-sm text-gray-600">
              <Link
                href="/products"
                className="text-amazon-blue hover:underline"
              >
                Continue shopping
              </Link>
            </div>
          </div>

          {/* <!-- Cart Items List --> */}

          <div className="bg-white">
            {/* <!-- Item 1 --> */}

            {cartItems?.map((item) => (
              <div
                key={item._id}
                className="p-4 border-b border-gray-300 flex gap-4 hover:bg-gray-50"
              >
                <div className="w-32 h-32 flex-shrink-0">
                  <Image
                    height={128}
                    width={128}
                    src={item?.product?.images?.[0]?.url}
                    className="w-full h-full object-cover rounded border border-gray-200"
                    alt={item.product.title}
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-base mb-1">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="text-amazon-blue hover:text-amazon-orange hover:underline"
                    >
                      {item.product.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-green-700 font-medium">
                    {" "}
                    {item.product.stock ? "In Stock" : "Out of Stock"}{" "}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Sold by: {item?.shop?.name} Official
                  </p>
                  <p className="text-xs text-gray-600">
                    Eligible for FREE Shipping
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    {/* <!-- Quantity Selector --> */}
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-600">Qty:</label>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          handleQtyChange(
                            item.product._id,
                            e.target.value,
                            item.product.stock,
                          )
                        }
                        className="border border-gray-400 rounded-md px-2 py-1 text-sm bg-gray-50 outline-none focus:ring-1 focus:ring-amazon-blue"
                      >
                        {Array.from(
                          { length: item.product.stock },
                          (_, i) => i + 1,
                        ).map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                    </div>

                    <span className="text-gray-300">|</span>

                    {/* <!-- Delete Button --> */}
                    <button
                      onClick={() => handleDelete(item.product._id)}
                      className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline"
                    >
                      Delete
                    </button>

                    <span className="text-gray-300">|</span>

                    {/* <!-- Save for Later --> */}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-amazon-orange">
                    ৳ {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}

            {/* <!-- Subtotal --> */}
            <div className="p-4 text-right">
              <p className="text-lg">
                Subtotal ({allCartProductLength} items):
                <span className="font-bold text-amazon-orange">
                  ৳{formatPrice(totalPrice)}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* <!-- Order Summary Sidebar --> */}
        <div className="lg:w-80">
          <div className="bg-white p-4 border border-gray-300 rounded">
            <div className="mb-4">
              <p className="text-sm mb-2">
                <i
                  data-lucide="check-circle"
                  className="w-4 h-4 inline text-green-600 mr-1"
                ></i>
                <span className="text-green-700 font-medium">
                  Your order qualifies for FREE Shipping!
                </span>
              </p>
            </div>

            <div className="mb-4">
              <p className="text-lg mb-1">
                Subtotal ({allCartItems?.items.length} items):
                <span className="font-bold text-amazon-orange">
                  ৳{formatPrice(totalPrice)}
                </span>
              </p>
              <div className="flex items-start gap-2 text-xs">
                <input type="checkbox" id="gift" className="mt-0.5" />
                <label for="gift" className="text-gray-700">
                  This order contains a gift
                </label>
              </div>
            </div>

            <Link
              href="/paymentProcess"
              class="w-full py-2 bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary rounded-md text-sm font-bold shadow-sm transition-colors mb-2 text-center block"
            >
              Proceed to Checkout
            </Link>

            <div className="text-xs text-gray-600 mt-4">
              <p className="mb-2">
                <i
                  data-lucide="shield-check"
                  className="w-3 h-3 inline mr-1"
                ></i>
                Secure transaction
              </p>
              <p>
                <i data-lucide="truck" className="w-3 h-3 inline mr-1"></i>
                Ships from Gadgets BD
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
