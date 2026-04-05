import Providers from "@/app/providers";
import { connectDB } from "@/lib/db";
// import "../globals.css";

export const metadata = {
  title: "Gadgets BD-Login",
  description: "Premium Tech Marketplace",
};

export default async function LoginLayout({ children }) {
  await connectDB();

  return (
    <>
      {/* <html lang="en">
      <body> */}
      <Providers> {children} </Providers>
      {/* </body>
    </html> */}
    </>
  );
}
