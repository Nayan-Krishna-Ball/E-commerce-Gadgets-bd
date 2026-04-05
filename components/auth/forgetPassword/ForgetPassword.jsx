//
export default function ForgetPassword() {
  return (
    <>
      {/* <!-- Info Card --> */}
      <div className="w-full max-w-[350px] p-6 a-box mb-6">
        <h1 className="text-2xl font-normal mb-2">Password assistance</h1>
        <p className="text-sm mb-4">
          Enter the email address or mobile phone number associated with your
          Gadgets BD account.
        </p>

        <form action="#" method="POST" id="resetForm" className="space-y-4">
          <div>
            <label for="email" className="block text-sm font-bold mb-1">
              Email or mobile phone number
            </label>
            <input
              type="text"
              id="email"
              required
              className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary"
            />
          </div>

          <button
            type="submit"
            className="w-full py-1.5 rounded-sm a-button-primary text-sm shadow-sm"
          >
            Continue
          </button>
        </form>

        {/* <!-- Success Message --> */}
        <div
          id="successMessage"
          className="hidden mt-4 bg-green-50 border border-green-200 p-3 rounded-sm text-xs text-green-800"
        >
          <div className="flex items-start gap-2">
            <i
              data-lucide="check-circle"
              className="w-4 h-4 text-green-600 mt-0.5"
            ></i>
            <div>
              <strong>Check your email</strong>
              <p className="mt-1">
                We have sent a password reset link to your email address.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Help Section --> */}
      <div className="w-full max-w-[350px]">
        <h2 className="text-lg font-bold mb-2">
          Has your email or mobile number changed?
        </h2>
        <p className="text-sm mb-4">
          If you no longer use the e-mail address associated with your Gadgets
          BD account, you may contact
          <a href="#" className="text-amazon-blue hover:underline">
            Customer Service
          </a>
          for help restoring access to your account.
        </p>
      </div>
    </>
  );
}
