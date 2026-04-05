///
"use client";

import { Info } from "lucide-react";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoginRegisterFooter from "../Footer";
import LoginRegisterLogo from "../LoginRegisterLogo";
import SocialLogin from "../SocialLogin";

export default function RegisterForm() {
  const [userType, setUserType] = useState("customer");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const isShopOwner = userType === "shopOwner";

  const submitUser = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const formData = new FormData(event.currentTarget);

      const name = formData.get("name");
      const email = formData.get("email");
      const mobile = formData.get("mobile");
      const role = userType;
      const shopname = formData.get("shopname");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      if (password.length <= 5) {
        setError("Please give at least 6 characters");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const response = await fetch("api/auth/register", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          mobile,
          role,
          shopname: role === "shopOwner" ? shopname : undefined,
        }),
      });
      const message = await response.text();
      if (!response.ok) {
        setError(message);
        return;
      }

      response.status === 201 && router.push("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white text-amazon-text flex flex-col min-h-screen items-center pt-8">
      <LoginRegisterLogo />

      <div className="w-full max-w-[350px] p-6 a-box mb-6">
        <h1 className="text-2xl font-normal mb-4">Create account</h1>

        {error && (
          <div className="flex items-start gap-3 p-3 rounded-md border border-red-300 bg-red-50 text-red-700 animate-fadeIn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mt-0.5 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10A8 8 0 11 2 10a8 8 0 0116 0zm-8-4a1 1 0 00-1 1v3a1 1 0 102 0V7a1 1 0 00-1-1zm0 8a1.25 1.25 0 100-2.5A1.25 1.25 0 0010 14z"
                clipRule="evenodd"
              />
            </svg>

            <div className="text-sm font-medium">{error}</div>
          </div>
        )}

        <form onSubmit={submitUser} className="space-y-4">
          {/* Account Type Toggle */}
          <div className="flex gap-2 mb-4 bg-gray-100 p-1 rounded-sm">
            <button
              type="button"
              onClick={() => setUserType("customer")}
              className={`flex-1 py-1 text-xs font-bold rounded-sm transition ${
                userType === "customer" ? "bg-white shadow-sm" : "text-gray-500"
              }`}
            >
              Customer
            </button>

            <button
              type="button"
              onClick={() => setUserType("shopOwner")}
              className={`flex-1 py-1 text-xs font-bold rounded-sm transition ${
                userType === "shopOwner"
                  ? "bg-white shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Shop Owner
            </button>

            {/* Hidden input to submit value */}
            <input type="hidden" name="userType" value={userType} />
          </div>

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-1">
              Your name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="First and last name"
              className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary"
            />
          </div>

          {/* Shop Name — ONLY for Shop Owner */}
          {isShopOwner && (
            <div>
              <label
                htmlFor="shopName"
                className="block text-sm font-bold mb-1"
              >
                Shop name
              </label>
              <input
                type="text"
                id="shopname"
                name="shopname"
                placeholder="Your shop name"
                required={isShopOwner}
                className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary"
              />
            </div>
          )}

          {/* Mobile */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-bold mb-1">
              Mobile number
            </label>
            <div className="flex gap-2">
              <select className="px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary">
                <option>BD +880</option>
              </select>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                required
                placeholder="Mobile number"
                className="flex-1 px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-bold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary"
            />
          </div>

          {/* Password */}

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-bold mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              required
              className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amazon-orange transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
            <p className="text-xs text-gray-600 mt-1">
              Passwords must be at least 6 characters.
            </p>
          </div>
          {/* <div>
            <label htmlFor="password" className="block text-sm font-bold mb-1">
              Password
            </label>
            <input
              type="password" 
              id="password"
              name="password"
              required
              placeholder="At least 6 characters"
              className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary"
            />
            <p className="text-xs text-gray-600 mt-1">
              Passwords must be at least 6 characters.
            </p>
          </div> */}

          {/* Confirm Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-bold mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="confirmPassword"
              required
              className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-amazon-orange transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
            <p className="text-xs text-gray-600 mt-1">
              Passwords must be at least 6 characters.
            </p>
          </div>
          {/* <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-bold mb-1"
            >
              Re-enter password
            </label>
            <input
              name="confirmPassword"
              type="password"
              id="passwordConfirm"
              required
              className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary"
            />
          </div> */}

          <button
            type="submit"
            className="w-full py-1.5 a-button-primary text-sm font-medium rounded-sm cursor-pointer"
          >
            Create your Gadgets BD account
          </button>
        </form>

        {!isShopOwner && <SocialLogin />}

        <div className="mt-4 text-xs">
          <p>
            {" "}
            By creating an account, you agree to Gadgets BDs
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

        <div className="mt-4 pt-4 border-t border-gray-300">
          <p className="text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-amazon-blue hover:text-amazon-orange hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Shop Owner Info Box */}
        {isShopOwner && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-sm">
            <div className="flex gap-2">
              <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />

              <div className="text-xs text-blue-900">
                <p className="font-bold mb-1">Shop Owner Registration</p>
                <p>
                  After registration, you will be able to set up your shop
                  profile, add products, and start selling on Gadgets BD
                  marketplace.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <LoginRegisterFooter />
    </div>
  );
}
