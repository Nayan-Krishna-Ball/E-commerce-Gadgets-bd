import LoginRegisterFooter from "@/components/auth/Footer";
import ForgetPassword from "@/components/auth/forgetPassword/ForgetPassword";
import LoginRegisterLogo from "@/components/auth/LoginRegisterLogo";

//
export default function ForgetPassWordPage() {
  return (
    <div class="bg-white text-amazon-text flex flex-col min-h-screen items-center pt-8">
      <LoginRegisterLogo />
      <ForgetPassword />
      <LoginRegisterFooter />
    </div>
  );
}
