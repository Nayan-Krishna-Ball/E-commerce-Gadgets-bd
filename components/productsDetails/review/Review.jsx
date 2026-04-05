"use client";

import { Camera, Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useState } from "react";
import toast from "react-hot-toast";

export default function Review({ product, session }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [headline, setHeadline] = useState("");
  const [comment, setComment] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const sessionUser = session?.user?.id;

  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // setSelectedFile(file);
    if (file) {
      setSelectedFile(file);
      toast.success("Image upoaded!");
    }
  };

  const uploadImage = async (file) => {
    const authRes = await fetch("/api/imagekit-auth");
    const auth = await authRes.json();

    const form = new FormData();
    form.append("file", file);
    form.append("fileName", `review-${Date.now()}`);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!rating) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment) {
      toast.error("Please write a review");
      return;
    }

    setLoading(true);

    let imageUrl = null;

    try {
      if (selectedFile) {
        imageUrl = await uploadImage(selectedFile);
      }

      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          rating,
          headline,
          comment,
          image: imageUrl,
          userId: sessionUser,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
      } else {
        toast.success("Review submitted successfully!");
        router.push(`/products/${product.slug}`);
        router.refresh();
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto w-full px-6 py-10">
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-8 space-y-10">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">
            Create Review
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Share your thoughts with other customers
          </p>
        </div>

        {/* Product Info */}
        <div className="flex items-center gap-4 border-b border-gray-200 pb-6">
          <Image
            height={70}
            width={70}
            src={product?.images?.[0]?.url || "/placeholder.png"}
            alt={product?.title || "Product"}
            className="w-16 h-16 object-cover border border-gray-200 rounded-md"
          />
          <h2 className="font-semibold text-gray-800 text-base">
            {product?.title}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/*  Rating */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Overall Rating
            </h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= (hover || rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </section>

          {/*  Media Upload */}
          {/* <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Add a photo or video
            </h3>
            <p className="text-sm text-gray-500">
              Images and videos help other shoppers.
            </p>

            <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition gap-2">
             
             
              <Camera className="w-8 h-8 text-gray-400" />
              <span className="text-xs text-gray-500">Add media</span>
              <input
                onChange={handleFileChange}
                type="file"
                className="hidden"
              />
            </label>
          </section> */}
          {/*  Media Upload */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Add a photo or video
            </h3>
            <p className="text-sm text-gray-500">
              Images and videos help other shoppers.
            </p>

            <label className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition gap-2 relative overflow-hidden">
              {selectedFile ? (
                <Image
                  src={URL.createObjectURL(selectedFile)}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <>
                  <Camera className="w-8 h-8 text-gray-400" />
                  <span className="text-xs text-gray-500">Add media</span>
                </>
              )}
              <input
                onChange={handleFileChange}
                type="file"
                className="hidden"
              />
            </label>
          </section>

          {/*  Headline */}
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Add a headline
            </h3>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="What's most important to know?"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </section>

          {/* Review */}
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800">
              Add a written review
            </h3>
            <textarea
              rows="6"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like or dislike? What did you use this product for?"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
            ></textarea>
          </section>

          {/* Submit */}
          <div className="pt-6 border-t border-gray-200 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-400 hover:bg-yellow-500 transition px-8 py-2 rounded-md font-semibold border border-yellow-500 shadow-sm"
            >
              {loading ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
