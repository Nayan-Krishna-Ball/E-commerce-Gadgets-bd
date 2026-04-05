"use client";

import { ArrowLeft, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddProduct({ shop, editedProductInfo }) {
  const router = useRouter();
  const [mainImage, setMainImage] = useState(null);
  const [extraImages, setExtraImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    cpu: "",
    ram: "",
    storage: "",
    display: "",
    aboutThisItem: "",
    shortDes: "",
  });

  useEffect(() => {
    if (editedProductInfo) {
      setForm({
        title: editedProductInfo.title || "",
        description: editedProductInfo.description || "",
        price: editedProductInfo.price || "",
        stock: editedProductInfo.stock || "",
        category: editedProductInfo.category || "",
        brand: editedProductInfo.brand || "",
        cpu: editedProductInfo.features?.cpu || "",
        ram: editedProductInfo.features?.ram || "",
        storage: editedProductInfo.features?.storage || "",
        display: editedProductInfo.features?.display || "",
        aboutThisItem: editedProductInfo.aboutItem?.join(", ") || "",
        shortDes:
          editedProductInfo.shortDescription?.split(" | ").join(", ") || "",
      });

      setMainImage(editedProductInfo.images?.[0]?.url || null);
    }
  }, [editedProductInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const uploadImage = async (file) => {
    const authRes = await fetch("/api/imagekit-auth");
    const auth = await authRes.json();

    const form = new FormData();
    form.append("file", file);
    form.append("fileName", `product-${Date.now()}`);
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

  const submitProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);

    const aboutRaw = formData.get("aboutThisItem");
    const capitalizeFirst = (text) =>
      text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

    const aboutItem = aboutRaw
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .map(capitalizeFirst);

    const shortRaw = formData.get("shortDes");
    const formatTag = (tag) => {
      tag = tag.trim();
      if (/\d/.test(tag)) return tag.toUpperCase();
      return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
    };

    const shortDescription = shortRaw
      ?.split(",")
      .map(formatTag)
      .filter((tag) => tag !== "")
      .join(" | ");

    const product = {
      title: formData.get("title"),
      pName: formData.get("title"),
      slug: formData.get("title").toLowerCase().replace(/\s+/g, "-"),
      description: formData.get("description"),
      price: Number(formData.get("price")),
      stock: Number(formData.get("stock")),
      category: formData.get("category"),
      brand: formData.get("brand"),
      images: [{ url: mainImage, alt: formData.get("title") }],
      aboutItem,
      shortDescription,
      shop: {
        shopId: shop?._id,
        shopName: shop.name,
      },
      features: {
        cpu: formData.get("cpu"),
        ram: formData.get("ram"),
        storage: formData.get("storage"),
        display: formData.get("display"),
      },
      status: "published",
    };

    let url = "/api/products";
    let method = "POST";

    if (editedProductInfo) {
      url = `/api/products/edit`;
      method = "PUT";
      product.productId = editedProductInfo._id;
    }

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success(
        editedProductInfo ? "Product updated 🎉" : "Product added 🎉",
        {
          style: {
            borderRadius: "8px",
            background: "#232F3E",
            color: "#fff",
          },
        },
      );
      e.target.reset();
      setMainImage(null);
      router.push("/shop/inventory");
      router.refresh();
    } else {
      toast.error(data.message || "Error");
    }

    setLoading(false);
  };

  return (
    <>
      <main className="max-w-[1000px] mx-auto w-full p-6">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-normal">Add a Product</h1>
            <p className="text-sm text-gray-600">
              Create a new listing for your gadget product.
            </p>
          </div>
          <Link
            href="/shop/inventory"
            className="text-amazon-blue hover:underline text-sm flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Manage List
          </Link>
        </div>

        <form
          onSubmit={submitProduct}
          action="#"
          method="POST"
          enctype="multipart/form-data"
          className="space-y-6"
        >
          {/* <!-- Step 1: Product Identity --> */}
          <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
              <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
                Step 1: Product Identity
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    value={form.title}
                    required
                    minLength={5}
                    placeholder="e.g., Apple MacBook Pro M2 - 16GB RAM"
                    className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    onChange={handleChange}
                    value={form.category}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                  >
                    <option>Laptops & Computers</option>
                    <option>Smartphones & Tablets</option>
                    <option>Audio & Headphones</option>
                    <option>Gaming Accessories</option>
                    <option>Cameras & Photography</option>
                    <option>Wearables & Smartwatches</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-1">Brand</label>
                  <select
                    name="brand"
                    onChange={handleChange}
                    value={form.brand}
                    className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                  >
                    <option>Apple</option>
                    <option>Samsung</option>
                    <option>Dell</option>
                    <option>HP</option>
                    <option>Lenovo</option>
                    <option>Sony</option>
                    <option>Razer</option>
                    <option>Logitech</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Condition
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue">
                    <option>New</option>
                    <option>Renewed</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="4"
                  onChange={handleChange}
                  value={form.description}
                  required
                  minLength={20}
                  placeholder="Describe your product features, specifications, and benefits..."
                  className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                ></textarea>
              </div>
            </div>
          </div>

          {/* <!-- Step 2: Pricing & Inventory --> */}
          <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
              <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
                Step 2: Pricing & Inventory
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Price (৳)
                  </label>
                  <input
                    name="price"
                    type="number"
                    onChange={handleChange}
                    value={form.price}
                    required
                    min={1}
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Stock Quantity
                  </label>
                  <input
                    name="stock"
                    type="number"
                    onChange={handleChange}
                    value={form.stock}
                    required
                    min={0}
                    placeholder="0"
                    className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">
                    SKU (Optional)
                  </label>
                  <input
                    name="cpu"
                    onChange={handleChange}
                    value={form.cpu}
                    type="text"
                    placeholder="e.g., MBP-M2-16-1TB"
                    className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Availability
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue">
                    <option>In Stock</option>
                    <option>Pre-Order</option>
                    <option>Out of Stock</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Warranty Period
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue">
                    <option>No Warranty</option>
                    <option>6 Months</option>
                    <option>1 Year</option>
                    <option>2 Years</option>
                    <option>3 Years</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Step 3: Product Images --> */}
          <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
              <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
                Step 3: Product Images
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div
                onClick={() => document.getElementById("bannerUpload").click()}
              >
                <label className="block text-sm font-bold mb-1">
                  Main Product Image
                </label>

                <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center hover:border-amazon-blue transition-colors cursor-pointer relative overflow-hidden">
                  {/*  IMAGE PREVIEW */}
                  {mainImage ? (
                    <>
                      <Image
                        height={400}
                        width={400}
                        src={mainImage}
                        alt="Preview"
                        className="w-full h-48 object-contain rounded-md"
                      />

                      {/* Change image overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center text-white text-sm font-medium transition">
                        Click to change image
                      </div>
                    </>
                  ) : (
                    <>
                      <Upload className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-600 mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG up to 5MB
                      </p>
                    </>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    id="bannerUpload"
                    className="hidden"
                    onChange={async (e) => {
                      if (!e.target.files?.[0]) return;

                      toast.loading("Uploading...", { id: "img" });
                      const url = await uploadImage(e.target.files[0]);

                      if (url) {
                        setMainImage(url);
                        toast.success("Image uploaded", {
                          id: "img",
                          style: {
                            borderRadius: "8px",
                            background: "#232F3E",
                            color: "#fff",
                          },
                        });
                      } else {
                        toast.error("Upload failed", { id: "img" });
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* <!-- Step 4: Specifications --> */}
          <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
              <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
                Step 4: Technical Specifications (Optional)
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Processor/Chipset
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Apple M2 Max"
                    className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">
                    RAM/Memory
                  </label>
                  <input
                    name="ram"
                    onChange={handleChange}
                    value={form.ram}
                    type="text"
                    placeholder="e.g., 32GB"
                    className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Storage
                  </label>
                  <input
                    name="storage"
                    onChange={handleChange}
                    value={form.storage}
                    type="text"
                    placeholder="e.g., 1TB SSD"
                    className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">
                    Display Size
                  </label>
                  <input
                    name="display"
                    onChange={handleChange}
                    value={form.display}
                    type="text"
                    placeholder="e.g., 16 inch"
                    className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">
                  Other Specifications
                </label>
                <textarea
                  name="aboutThisItem"
                  onChange={handleChange}
                  value={form.aboutThisItem}
                  rows="3"
                  placeholder="Add any other technical details (Battery life, Connectivity, Ports, etc.)"
                  className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Tags</label>
                <textarea
                  name="shortDes"
                  onChange={handleChange}
                  value={form.shortDes}
                  rows="3"
                  placeholder="Add any short tags (48mp, i7 Gen 3, Noise cancel, etc.)"
                  className="w-full px-3 py-2 border border-gray-400 rounded-md outline-none focus:ring-1 focus:ring-amazon-blue focus:border-amazon-blue"
                ></textarea>
              </div>
            </div>
          </div>

          {/* <!-- Action Buttons --> */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
            <Link
              href={"/shop/inventory"}
              type="button"
              onclick="window.location.href = 'manageList.html'"
              className="px-6 py-2 border border-gray-400 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="px-6 py-2 bg-amazon-yellow hover:bg-amazon-yellow_hover border border-amazon-secondary rounded-md text-sm font-bold shadow-sm transition-colors"
            >
              {loading ? "Publishing..." : "Publish Product"}
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
