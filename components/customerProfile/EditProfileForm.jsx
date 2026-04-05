"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const EditProfileForm = ({ user }) => {
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.mobile || "");
  const [address, setAddress] = useState(user?.address || "");
  const [city, setCity] = useState(user?.city || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");

  const userId = user?.id;

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("/api/user/update", {
        method: "POST",
        body: JSON.stringify({
          userId,
          name,
          phone,
          address,
          postalCode,
          city,
        }),
      });

      toast.success("Your profile updated success");
      router.refresh();
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg bg-white p-6">
      <h2 className="text-lg font-bold mb-4">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">Full Name</label>
          <input
            className="w-full mt-1 border rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-amazon-yellow"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Mobile Number</label>
          <input
            className="w-full mt-1 border rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-amazon-yellow"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Address </label>
          <input
            className="w-full mt-1 border rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-amazon-yellow"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <div>
            <label className="text-sm font-medium">City </label>
            <input
              className="w-full mt-1 border rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-amazon-yellow"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Postal code </label>
            <input
              className="w-full mt-1 border rounded px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-amazon-yellow"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>

        <button className="bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary px-4 py-2 rounded text-sm font-bold">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
