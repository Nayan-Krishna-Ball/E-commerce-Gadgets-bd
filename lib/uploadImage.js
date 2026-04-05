//

export const uploadToImageKit = async (file, fileName = "file") => {
  try {
    const authRes = await fetch("/api/imagekit-auth");
    const auth = await authRes.json();

    const form = new FormData();
    form.append("file", file);
    form.append("fileName", `${fileName}-${Date.now()}`);
    form.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY);
    form.append("signature", auth.signature);
    form.append("expire", auth.expire);
    form.append("token", auth.token);

    const res = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();
    return data.url;
  } catch (err) {
    console.error(err);
    return null;
  }
};
