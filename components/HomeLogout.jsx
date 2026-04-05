//

"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function HomeLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });

    toast.custom(
      (t) => (
        <div
          className={`
          ${t.visible ? "animate-slideInRight" : "animate-slideOutRight"} 
          max-w-sm w-full bg-gray-900 text-white shadow-lg rounded-xl flex ring-1 ring-black ring-opacity-20
          overflow-hidden pointer-events-auto
        `}
        >
          <div className="flex-1 w-0 p-4 flex items-center gap-3">
            <LogOut className="h-6 w-6 text-orange-500" />
            <div className="flex-1">
              <p className="text-sm font-bold">Logged Out!</p>
              <p className="text-xs text-gray-300 mt-0.5">
                You have successfully logged out. See you soon! 👋
              </p>
            </div>
          </div>
        </div>
      ),
      { duration: 1500 },
    );
    router.push("/");
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1 hover:outline hover:outline-1 hover:outline-white rounded-sm px-2 py-1 transition"
    >
      <LogOut className="w-5 h-5 text-amazon-secondary" />
      <div className="hidden md:block text-sm font-bold">Logout</div>
    </button>
  );
}
