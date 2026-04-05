//

import ShopOwnerLogin from "@/components/auth/shopOwner/ShopownerLogin";

import LoginRegisterFooter from "@/components/auth/Footer";
import LoginRegisterLogo from "@/components/auth/LoginRegisterLogo";

export default function LoginPage() {
  return (
    <div className="bg-white text-amazon-text flex flex-col min-h-screen items-center pt-8">
      <LoginRegisterLogo />
      <ShopOwnerLogin />

      <LoginRegisterFooter />
    </div>
  );
}
