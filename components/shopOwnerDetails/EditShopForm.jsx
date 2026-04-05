//
"use client";

import { uploadToImageKit } from "@/lib/uploadImage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import BannerUpload from "./BannerUpload";

export default function EditShopForm({ shop, setToggleMode }) {
  const [coverImage, setCoverImage] = useState(shop?.coverImage || "");
  const [formData, setFormData] = useState({
    name: shop?.name || "",
    ownerName: shop?.ownerInfo?.name || "",
    email: shop?.ownerInfo?.email || "",
    phone: shop?.ownerInfo?.phone || "",
    description: shop?.description || "",
    city: shop?.location?.city || "Dhaka",
    specialization: shop?.specialization || "Laptops & PCs",
    fullAddress: shop?.location?.fullAddress || "",
    yearEstablished: shop?.businessInfo?.yearEstablished || "",
    employees: shop?.businessInfo?.employees || "",
    brands: shop?.businessInfo?.brands?.join(", ") || "",
    website: shop?.businessInfo?.website || "",
  });

  const router = useRouter();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBannerUpload = async (file) => {
    const toastId = toast.loading("Uploading...");

    const url = await uploadToImageKit(file, "shop-banner");

    if (url) {
      setCoverImage(url);
      toast.success("Banner uploaded 🎉", { id: toastId });
    } else {
      toast.error("Upload failed ❌", { id: toastId });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      // name: formData.name,
      description: formData.description,
      specialization: formData.specialization,
      coverImage,
      ownerInfo: {
        name: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
      },
      location: {
        city: formData.city,
        fullAddress: formData.fullAddress,
      },
      businessInfo: {
        yearEstablished: formData.yearEstablished,
        employees: formData.employees,
        brands: formData.brands.split(",").map((b) => b.trim()),
        website: formData.website,
      },
    };

    try {
      const res = await fetch("/api/shop/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      toast.success("Shop updated successfully 🎉", {
        style: {
          borderRadius: "8px",
          background: "#232F3E",
          color: "#fff",
        },
      });

      router.refresh();
      setToggleMode(true);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update shop ❌");
    }
  };

  return (
    <div id="editMode">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Basic Information */}
        <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
            <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
              Basic Information
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-1">
                  Shop Name *
                </label>
                <input
                  type="text"
                  name="name"
                  disabled
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">
                  Owner Name *
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">
                Shop Description *
              </label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
              />
            </div>
          </div>
        </div>

        {/* Location & Specialization */}
        <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
            <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
              Location & Specialization
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-1">
                  City/Location *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                >
                  <option>Dhaka</option>
                  <option>Chittagong</option>
                  <option>Sylhet</option>
                  <option>Rajshahi</option>
                  <option>Khulna</option>
                  <option>Barisal</option>
                  <option>Rangpur</option>
                  <option>Mymensingh</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">
                  Specialization *
                </label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                >
                  <option>Laptops & PCs</option>
                  <option>Smartphones</option>
                  <option>Gaming Gear</option>
                  <option>Audio & Headphones</option>
                  <option>Cameras & Lenses</option>
                  <option>Wearables</option>
                  <option>Accessories</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">
                Full Address *
              </label>
              <textarea
                name="fullAddress"
                rows="2"
                value={formData.fullAddress}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
              />
            </div>
          </div>
        </div>

        {/* Shop Banner */}
        <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
          <BannerUpload coverImage={coverImage} onUpload={handleBannerUpload} />
        </div>

        {/* Additional Information */}
        <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
            <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
              Additional Information
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold mb-1">
                  Year Established
                </label>
                <input
                  type="number"
                  name="yearEstablished"
                  value={formData.yearEstablished}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">
                  Number of Employees
                </label>
                <input
                  type="number"
                  name="employees"
                  value={formData.employees}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">
                Official Brand Partnerships (Optional)
              </label>
              <input
                type="text"
                name="brands"
                value={formData.brands}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple brands with commas
              </p>
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">
                Website URL (Optional)
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
          <button
            type="button"
            onClick={() => setToggleMode(true)}
            className="px-6 py-2 border border-gray-400 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary rounded-md text-sm font-bold shadow-sm transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
