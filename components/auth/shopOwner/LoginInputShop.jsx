//
"use client";

import { login } from "@/app/actions";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginInputShop() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const res = await login(formData);

      if (!!res.error) {
        setError(res.error.message);
      } else {
        router.push("/profile");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
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

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-bold mb-1">
            Email or mobile phone number
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="w-full px-2 py-1.5 border border-gray-400 rounded-sm outline-none focus:ring-1 focus:ring-amazon-secondary focus:border-amazon-secondary"
          />
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <label htmlFor="password" className="text-sm font-bold">
              Password
            </label>

            <Link
              href="/forgetpassword"
              className="text-sm text-amazon-blue hover:text-amazon-orange hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="relative">
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
          </div>
        </div>
        {/* login role based check */}
        <input type="hidden" name="role" value="shopOwner" />

        <button
          type="submit"
          className="w-full py-1.5 a-button-primary text-sm font-medium rounded-sm cursor-pointer"
        >
          Sign in
        </button>
      </form>
    </>
  );
}
