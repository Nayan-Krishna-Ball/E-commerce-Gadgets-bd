//
import ImageKit from "imagekit";

export async function GET() {
  const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
  });

  const authParams = imagekit.getAuthenticationParameters();
  return new Response(JSON.stringify(authParams), {
    headers: { "Content-Type": "application/json" },
  });
}
