//

import { auth } from "@/auth";
import HomeHero from "@/components/home/HomeHero";

export default async function Home() {
  const session = await auth();

  return <HomeHero />;
}
