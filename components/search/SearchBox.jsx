//
"use client";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [category, setCategory] = useState("All");
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    if (!keyword || keyword.trim() === "") return;

    const params = new URLSearchParams(searchParams.toString());

    if (keyword) {
      params.set("q", keyword);
    } else {
      params.delete("q");
    }

    if (category && category !== "All") {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    router.push(`/products?${params.toString()}`);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);

    if (pathname !== "/products") return;

    const params = new URLSearchParams();
    if (value !== "All") params.set("category", value);
    if (keyword.trim()) params.set("q", keyword.trim());

    router.push(params.toString() ? `/products?${params}` : "/products");
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex-1 flex h-10 rounded-md overflow-hidden focus-within:ring-3 focus-within:ring-amazon-secondary">
      <select
        value={category}
        // onChange={(e) => setCategory(e.target.value)}
        onChange={handleCategoryChange}
        className="bg-gray-100 text-black text-xs px-2 border-r border-gray-300 cursor-pointer hover:bg-gray-200"
      >
        <option>All</option>
        <option>Laptops</option>
        <option>Phones</option>
        <option>Accessories</option>
        <option>Gaming</option>
      </select>
      <input
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleEnter}
        defaultValue={searchParams.get("q")?.toString()}
        type="text"
        placeholder="Search Gadgets, Laptops, Phones..."
        className="flex-1 px-3 text-black outline-none"
      />
      <button
        onClick={handleSearch}
        disabled={!keyword || keyword.trim() === ""}
        className={`px-4 flex items-center justify-center
    ${
      !keyword || keyword.trim() === ""
        ? "bg-gray-300 cursor-not-allowed"
        : "bg-amazon-secondary hover:bg-[#fa8900]"
    }`}
      >
        <Search className="text-black w-5 h-5" />
      </button>
    </div>
  );
}
