//
"use client";
import { LogIn, LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function NavLogOutShop({ session }) {
  return (
    <>
      {session?.user ? (
        <>
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <span>{session.user.name}</span>
          </div>

          <button
            onClick={() => signOut({ callbackUrl: "/login-shop" })}
            className="flex items-center gap-1 hover:text-amazon-secondary transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </>
      ) : (
        <Link
          href="/login-shop"
          className="flex items-center gap-1 hover:text-amazon-secondary transition"
        >
          <LogIn className="w-4 h-4" />
          Login
        </Link>
      )}
    </>
  );
}
