//
"use client";

import { Eye, Pencil } from "lucide-react";
import { useState } from "react";
import EditShopForm from "./EditShopForm";
import ShopInformation from "./ShopInformation";

export default function ShopOwnerProfile({ shop }) {
  const [toggleMode, setToggleMode] = useState(true);
  return (
    <>
      {/* <!-- Main Content --> */}
      <main className="max-w-[1200px] mx-auto w-full p-6">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-normal">Shop Profile</h1>
            <p className="text-sm text-gray-600">
              Manage your shop information and appearance on Gadgets BD
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setToggleMode(true)}
              className={`px-4 py-2 text-sm font-bold transition-colors flex items-center gap-1 border
                 ${
                   toggleMode
                     ? "bg-gray-200 text-gray-700 border border-gray-400 rounded-md shadow-sm"
                     : "bg-amazon-yellow border-amazon-secondary rounded-md shadow-sm hover:bg-amazon-yellow_hover"
                 }`}
            >
              <Eye className="w-4 h-4 inline mr-1" />
              View Mode
            </button>
            <button
              onClick={() => setToggleMode(false)}
              className={`px-4 py-2 text-sm font-bold transition-colors flex items-center gap-1 border
               ${
                 !toggleMode
                   ? "bg-gray-200 text-gray-700 border border-gray-400 rounded-md shadow-sm"
                   : "bg-amazon-yellow border-amazon-secondary rounded-md shadow-sm hover:bg-amazon-yellow_hover"
               }`}
            >
              <Pencil className="w-4 h-4 inline mr-1" />
              Edit Mode
            </button>
          </div>
        </div>

        {/* <!-- View Mode --> */}
        {toggleMode ? (
          <ShopInformation shop={shop} />
        ) : (
          <EditShopForm setToggleMode={setToggleMode} shop={shop} />
        )}
      </main>
    </>
  );
}
