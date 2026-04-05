//

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import LoginInput from "./LoginInput";
import SocialLogin from "./SocialLogin";

export default function LoginForm() {
  return (
    <>
      {/* <div className="bg-white text-amazon-text flex flex-col min-h-screen items-center pt-8"> */}
      {/* Logo */}
      {/* <LoginRegisterLogo /> */}
      {/* <!-- Login Card --> */}
      <div className="w-full max-w-[350px] p-6 a-box mb-6">
        <h1 className="text-2xl font-normal mb-4">Sign in</h1>

        <div className="flex justify-center gap-2 mb-6 bg-gray-100 p-1 rounded-sm shadow-sm">
          <Link
            href="/login"
            className="flex-1 text-center py-1 text-sm font-semibold rounded-sm transition
                   hover:bg-white hover:shadow-sm
                   bg-white shadow-sm text-amazon-blue"
          >
            Customer
          </Link>
          <Link
            href="/login-shop"
            className="flex-1 text-center py-1 text-sm font-semibold rounded-sm transition
                   hover:bg-white hover:shadow-sm
                   text-gray-500"
          >
            Shop Owner
          </Link>
        </div>

        <LoginInput />

        {/* solcial login */}
        <SocialLogin />

        <div className="mt-4 text-xs">
          <p>
            By continuing, you agree to Gadgets BDs
            <a href="#" className="text-amazon-blue hover:underline">
              Conditions of Use
            </a>
            and
            <a href="#" className="text-amazon-blue hover:underline">
              Privacy Notice
            </a>
            .
          </p>
        </div>

        <div className="mt-4">
          <a
            href="#"
            className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline flex items-center gap-1"
          >
            <ChevronRight className="w-3 h-3"></ChevronRight>
            Need help?
          </a>
        </div>
      </div>

      {/* <!-- Divider --> */}
      <div className="w-full max-w-[350px] mb-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-gray-500">
              New to Gadgets BD?
            </span>
          </div>
        </div>
      </div>

      {/* <!-- Create Account Button --> */}
      <div className="w-full max-w-[350px] mb-8">
        <Link
          href="/register"
          className="block w-full py-1.5 border border-gray-400 rounded-sm text-center text-sm hover:bg-gray-50 transition-colors"
        >
          Create your Gadgets BD account
        </Link>
      </div>

      {/* <!-- Footer --> */}
      {/* <LoginRegisterFooter /> */}

      {/* </div> */}
    </>
  );
}
