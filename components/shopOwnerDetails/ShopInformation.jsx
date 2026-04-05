//
import { CheckCircle, Star } from "lucide-react";
import Image from "next/image";

export default function ShopInformation({ shop }) {
  return (
    <div id="viewMode" className="space-y-6">
      {/* <!-- Shop Preview Card --> */}
      <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-300 flex justify-between items-center">
          <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
            Shop Preview
          </h2>
          <span className="flex items-center bg-green-50 px-2 py-1 rounded border border-green-200">
            <CheckCircle className="w-3 h-3 text-green-600 mr-1" />
            <span className="text-[10px] font-bold text-green-700 uppercase">
              Verified
            </span>
          </span>
        </div>
        <div className="p-6">
          {/* <!-- Shop Card Preview --> */}
          <div className="max-w-sm mx-auto bg-white border border-gray-200 rounded-sm overflow-hidden shadow-md">
            <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
              <Image
                id="previewBanner"
                height={200}
                width={200}
                src={shop?.coverImage}
                alt={shop?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3
                id="previewName"
                className="font-bold text-lg text-amazon-blue mb-1"
              >
                {shop?.name}
              </h3>
              <p id="previewLocation" className="text-sm text-gray-500 mb-3">
                {shop?.location?.city}, Bangladesh
              </p>

              <div className="flex items-center gap-1 mb-3">
                <div className="flex text-amazon-secondary">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span id="previewRatings" className="text-xs text-amazon-blue">
                  {shop?.rating?.totalRatings} ratings
                </span>
              </div>

              <p id="previewDescription" className="text-sm text-gray-700 mb-4">
                {shop?.description}
              </p>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="text-xs">
                  <span className="text-gray-500">Specializes in:</span>
                  <span id="previewSpecialization" className="font-bold">
                    {" "}
                    {shop?.specialization}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Shop Details --> */}
      <div className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden">
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-300">
          <h2 className="font-bold text-gray-700 uppercase tracking-wider text-xs">
            Shop Information
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Shop Name
            </label>
            <p className="font-medium">{shop?.name}</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Owner Name
            </label>
            <p className="font-medium">{shop?.ownerInfo?.name}</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Email</label>
            <p className="font-medium">{shop?.ownerInfo?.email}</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Phone Number
            </label>
            <p className="font-medium">{shop?.ownerInfo?.phone}</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Location</label>
            <p className="font-medium"> {shop?.location?.city}, Bangladesh</p>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Specialization
            </label>
            <p className="font-medium">{shop?.specialization}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-500 mb-1">
              Shop Description
            </label>
            <p className="font-medium">{shop?.description}</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-500 mb-1">Address</label>
            <p className="font-medium">
              {shop?.location?.city} , {shop?.location?.fullAddress}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
