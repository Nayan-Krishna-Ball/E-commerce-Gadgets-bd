//

import { Upload } from "lucide-react";
import Image from "next/image";

export default function BannerUpload({ coverImage, onUpload }) {
  return (
    <div className="p-6">
      <div className="mb-4">
        <div className="h-48 rounded-md overflow-hidden border">
          <Image
            src={
              coverImage ||
              "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600"
            }
            width={500}
            height={300}
            className="w-full h-full object-cover"
            alt="Banner"
          />
        </div>
      </div>

      <label className="cursor-pointer block border-2 border-dashed rounded-md p-6 text-center hover:border-blue-500">
        <Upload className="mx-auto mb-2 text-gray-400" />
        <p className="text-sm">Click to upload banner</p>

        <input
          type="file"
          className="hidden"
          onChange={(e) => e.target.files && onUpload(e.target.files[0])}
        />
      </label>
    </div>
  );
}
