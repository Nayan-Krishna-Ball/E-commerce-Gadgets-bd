// import { connectDB } from "@/lib/db";
// import "../globals.css";
import Providers from "../providers";

export const metadata = {
  title: "Gadgets BD",
  description: "Premium Tech Marketplace",
};

export default function LoginLayout({ children }) {
  // await connectDB();

  return (
    <>
      <Providers>{children} </Providers>
    </>
  );
}
