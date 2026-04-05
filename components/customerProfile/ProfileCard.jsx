"use client";

import { Camera, Mail, Phone, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import toast from "react-hot-toast";

const ProfileCard = ({ user }) => {
  const router = useRouter();
  const fileRef = useRef();

  const userId = user?.id;

  const uploadImage = async (file) => {
    const authRes = await fetch("/api/imagekit-auth");
    const auth = await authRes.json();

    const form = new FormData();
    form.append("file", file);
    form.append("fileName", `profile-${Date.now()}`);
    form.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY);
    form.append("signature", auth.signature);
    form.append("expire", auth.expire);
    form.append("token", auth.token);

    const uploadRes = await fetch(
      "https://upload.imagekit.io/api/v1/files/upload",
      { method: "POST", body: form },
    );

    const data = await uploadRes.json();
    return data.url;
  };

  const changeImage = async (e) => {
    if (!e.target.files?.[0]) return;

    const toastId = toast.loading("Uploading...");

    try {
      const url = await uploadImage(e.target.files[0]);

      if (!url) throw new Error();

      await fetch("/api/user/update", {
        method: "POST",
        body: JSON.stringify({
          userId,
          image: url,
        }),
      });

      toast.success("Profile photo updated 🎉", { id: toastId });
      router.refresh();
    } catch {
      toast.error("Upload failed ❌", { id: toastId });
    }
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
      <div className="flex flex-col items-center gap-4">
        <div
          className="relative group cursor-pointer"
          onClick={() => fileRef.current.click()}
        >
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              width={110}
              height={110}
              className="rounded-full object-cover border-4 border-gray-200"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-yellow-400 flex items-center justify-center text-3xl font-bold text-gray-800">
              {initials}
            </div>
          )}

          <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
            <Camera className="text-white w-6 h-6" />
          </div>
        </div>

        <p className="text-sm text-gray-500">Click to change photo</p>

        <input
          type="file"
          ref={fileRef}
          onChange={changeImage}
          className="hidden"
        />
      </div>

      <div className="mt-6 space-y-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Account Information
        </h2>

        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
            <User className="w-4 h-4 text-gray-500" />
            <span className="font-medium">{user?.name}</span>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
            <Mail className="w-4 h-4 text-gray-500" />
            <span>{user?.email}</span>
          </div>

          <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
            <Phone className="w-4 h-4 text-gray-500" />
            <span>{user?.mobile || "Not added"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
