//
import { auth } from "@/auth";
import ChangePasswordForm from "@/components/customerProfile/ChangePasswordForm";
import EditProfileForm from "@/components/customerProfile/EditProfileForm";
import ProfileCard from "@/components/customerProfile/ProfileCard";
import HomeFooter from "@/components/FooterHome";
import HomeNav from "@/components/HomeNav";
import { getUserByUserId } from "@/queries/user";

import { AlertCircle, LogIn } from "lucide-react";
import Link from "next/link";

const UserProfilePage = async () => {
  const session = await auth();

  const user = await getUserByUserId(session.user.email);

  if (!session) {
    return (
      <div className="bg-amazon-background min-h-screen flex flex-col">
        <HomeNav />

        <div className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center border">
            <LogIn className="mx-auto w-12 h-12 text-amazon-secondary mb-4" />

            <h2 className="text-xl font-bold mb-2">You are not signed in</h2>
            <p className="text-sm text-gray-600 mb-6">
              Please log in to view your profile.
            </p>

            <Link
              href="/login"
              className="block w-full py-2 bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary rounded-md font-bold text-sm"
            >
              Sign In
            </Link>
          </div>
        </div>

        <HomeFooter />
      </div>
    );
  }

  if (session.user.role === "shopOwner") {
    return (
      <div className="bg-amazon-background min-h-screen flex flex-col">
        <HomeNav />

        <div className="flex-1 flex items-center justify-center px-4">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center border">
            <AlertCircle className="mx-auto w-12 h-12 text-red-500 mb-4" />

            <h2 className="text-xl font-bold mb-2">Access Restricted</h2>

            <p className="text-sm text-gray-600 mb-6">
              Seller accounts should use the Seller Dashboard.
            </p>

            <Link
              href="/seller"
              className="block w-full py-2 bg-gray-200 hover:bg-gray-300 border rounded-md"
            >
              Go to Seller Dashboard
            </Link>
          </div>
        </div>

        <HomeFooter />
      </div>
    );
  }

  return (
    <div className="bg-amazon-background text-amazon-text min-h-screen flex flex-col">
      <HomeNav />

      <main className="max-w-[1000px] mx-auto w-full p-4 py-6">
        <h1 className="text-3xl font-normal mb-6">Your Profile</h1>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="md:w-1/3 sticky top-6 self-start">
            <ProfileCard user={user} />
          </div>

          <div className="md:w-2/3 space-y-6">
            <EditProfileForm user={user} />
            <ChangePasswordForm user={user} />
          </div>
        </div>
      </main>
      <HomeFooter />
    </div>
  );
};

export default UserProfilePage;
