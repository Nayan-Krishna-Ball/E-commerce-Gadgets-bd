import Providers from "@/app/providers";
import { connectDB } from "@/lib/db";

export const metadata = {
  title: "Gadgets BD-Register",
  description: "Premium Tech Marketplace",
};

export default async function LoginLayout({ children }) {
  await connectDB();

  return (
    <>
      <Providers> {children} </Providers>
    </>
  );
}
