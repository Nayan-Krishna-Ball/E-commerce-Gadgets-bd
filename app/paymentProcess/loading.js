export default function LoadingPayment() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Animated Credit Card */}
      <div className="relative mb-8">
        <div className="w-28 h-16 bg-gradient-to-r from-amazon-orange to-amazon-yellow rounded-xl shadow-lg animate-pulse-slow flex items-center justify-center">
          <div className="w-20 h-10 bg-white rounded shadow-inner"></div>
        </div>
        <div className="absolute -bottom-12 flex flex-col items-center gap-2">
          <div className="w-10 h-10 border-4 border-amazon-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold text-lg animate-pulse">
            Processing Payment...
          </p>
        </div>
      </div>

      {/* Animated Dots */}
      <div className="flex gap-2 mt-4">
        <span className="w-3 h-3 bg-amazon-orange rounded-full animate-bounce"></span>
        <span className="w-3 h-3 bg-amazon-orange rounded-full animate-bounce [animation-delay:.2s]"></span>
        <span className="w-3 h-3 bg-amazon-orange rounded-full animate-bounce [animation-delay:.4s]"></span>
      </div>

      <p className="text-gray-500 text-sm mt-4 text-center px-6 animate-pulse">
        Please wait while we confirm your order and process your payment
        securely.
      </p>
    </div>
  );
}
