"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

interface Props {
  onSearch: (query: string) => void;
  onFilter: (filter: string) => void;
}

export default function SearchWithFilter({ onSearch, onFilter }: Props) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selected, setSelected] = useState("");

  const filters = [
    { label: "Latest Posts", value: "latest" },
    { label: "Oldest Posts", value: "oldest" },
    { label: "Most Liked", value: "likes" },
    { label: "Most Commented", value: "comments" },
    { label: "Images", value: "image" },
    { label: "PDFs", value: "pdf" },
    { label: "PPTs", value: "ppt" },
    { label: "Text Posts", value: "text" },
  ];

  const handleFilterSelect = (value: string) => {
    setSelected(value);
    onFilter(value);
    setShowFilters(false);
  };

  return (
    <div className="bg-[#0a0014] border border-[#6600ff] rounded-2xl p-4 w-full">
      {/* Search Bar */}
      <div className="relative flex items-center">
        <Search className="absolute left-3 text-gray-400 size-5" />
        <input
          type="text"
          placeholder="Search users or posts..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          className="w-full bg-transparent text-white placeholder-gray-400 border border-[#6600ff]/40 rounded-xl pl-10 pr-24 py-2 focus:outline-none focus:ring-2 focus:ring-[#6600ff]/60"
        />

        {/* Filter Button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-2 flex items-center gap-2 bg-[#6600ff]/30 hover:bg-[#6600ff]/50 px-3 py-1.5 rounded-lg transition text-sm"
        >
          <SlidersHorizontal className="size-4" />
          <span>Filter</span>
        </button>

        {/* Filter Dropdown */}
        {showFilters && (
          <div className="absolute right-0 top-12 w-52 bg-[#0d001f] border border-[#6600ff] rounded-xl shadow-lg z-50">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => handleFilterSelect(f.value)}
                className={`w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-[#6600ff]/20 ${
                  selected === f.value ? "bg-[#6600ff]/30 text-white" : "text-gray-300"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}