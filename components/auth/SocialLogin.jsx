//
"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SocialLogin() {
  const handleGoogleLogIn = (event) => {
    signIn("google", { callbackUrl: "http://localhost:3000" });
  };

  return (
    <>
      <div className="mt-4">
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>
        <button
          onClick={handleGoogleLogIn}
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 py-2 rounded-md shadow-sm transition font-medium"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>
      </div>
    </>
  );
}
