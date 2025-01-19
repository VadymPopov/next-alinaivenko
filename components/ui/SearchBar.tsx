'use client';

import { MdSearch } from 'react-icons/md';

interface SearchBarProps {
  query: string;
  onSearch: (_searchTerm: string) => void;
}

export function SearchBar({ query, onSearch }: SearchBarProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search appointments"
        className="text-xs rounded-lg border border-accentColor px-4 py-3 pl-10 sm:text-base focus:outline-accentColor"
      />
      <MdSearch
        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-textColorDarkBg"
        size={24}
      />
    </div>
  );
}
