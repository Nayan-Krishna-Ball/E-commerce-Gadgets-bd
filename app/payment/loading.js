export default function LoadingPaymentSuccess() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Confetti Circle */}
      <div className="relative mb-6">
        <div className="w-28 h-28 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
          <div className="text-green-600 text-4xl">🎉</div>
        </div>
      </div>

      {/* Success Text */}
      <h2 className="text-2xl font-bold text-green-700 animate-pulse">
        Payment Successful!
      </h2>

      {/* Subtext */}
      <p className="text-gray-600 text-sm mt-2 text-center px-6 animate-pulse">
        Thank you for your purchase. Preparing your order confirmation…
      </p>

      {/* Progress Bar */}
      <div className="mt-8 w-60 h-2 bg-green-200 rounded-full overflow-hidden">
        <div className="h-2 bg-green-500 animate-pulse-slow w-1/2"></div>
      </div>
    </div>
  );
}
