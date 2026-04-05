//
"use client";

import Image from "next/image";

const PaymentMethod = ({ card, setCard }) => {
  return (
    <div className="pb-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-900 text-white text-sm">
          3
        </span>
        <span className="font-bold text-lg text-amazon-orange">
          Choose a payment method
        </span>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        id="paymentForm"
        className="box p-6 space-y-6 shadow-sm"
      >
        <div className="space-y-4">
          <label className="flex items-start gap-3 p-3 border  rounded-md cursor-pointer hover:bg-amazon-background transition-colors bg-gray-50 border-amazon-orange ring-1 ring-amazon-orange">
            <div>
              <span className="font-bold block text-sm">
                Credit or Debit Card
              </span>
              <div className="flex gap-2 mt-2">
                <Image
                  height={40}
                  width={40}
                  src="/visa.jpg"
                  className="h-4"
                  alt="Visa"
                />
                <Image
                  height={20}
                  width={20}
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                  className="h-4"
                  alt="Mastercard"
                />
              </div>
            </div>
          </label>

          <div id="cardInputs" className="pl-8 space-y-4">
            <div>
              <label className="text-xs font-bold block mb-1">
                Name on card
              </label>
              <input
                onChange={(e) => setCard({ ...card, name: e.target.value })}
                type="text"
                placeholder="John Doe"
                className="w-full max-w-sm px-2 py-1 border border-gray-400 rounded-sm text-sm outline-none focus:ring-1 focus:ring-amazon-blue"
              />
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs font-bold block mb-1">
                  Card number
                </label>
                <input
                  onChange={(e) => setCard({ ...card, number: e.target.value })}
                  type="text"
                  placeholder="#### #### #### ####"
                  className="w-full px-2 py-1 border border-gray-400 rounded-sm text-sm outline-none focus:ring-1 focus:ring-amazon-blue"
                />
              </div>
              <div className="w-24">
                <label className="text-xs font-bold block mb-1">CVV</label>
                <input
                  onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                  type="password"
                  placeholder="***"
                  className="w-full px-2 py-1 border border-gray-400 rounded-sm text-sm outline-none focus:ring-1 focus:ring-amazon-blue"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-bold block mb-1">
                Expiration date
              </label>
              <div className="flex gap-2">
                <select className="bg-gray-100 border border-gray-300 rounded p-1 text-xs">
                  <option>01</option>
                  <option>02</option>
                  <option>03</option>
                  <option>04</option>
                  <option>05</option>
                  <option>06</option>
                  <option>07</option>
                  <option>08</option>
                  <option>09</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
                <select className="bg-gray-100 border border-gray-300 rounded p-1 text-xs">
                  <option>2025</option>
                  <option>2026</option>
                  <option>2027</option>
                  <option>2028</option>
                  <option>2029</option>
                  <option>2030</option>
                </select>
              </div>
            </div>
          </div>

          <div className="h-px bg-gray-200"></div>
        </div>
      </form>
    </div>
  );
};

export default PaymentMethod;
