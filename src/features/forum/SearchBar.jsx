import React from 'react';
import { FiSearch } from 'react-icons/fi';

function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="container flex items-center justify-between px-4 py-3 mx-auto">
      <div className="flex items-center justify-center w-full space-x-4 md:flex">
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded px-4 py-2 bg-[#1F2A30] border-[#0B1416] placeholder-[#818384] text-white w-[20rem] lg:w-[35rem] outline-none"
          />
          <FiSearch className="text-[#818384] absolute right-3 top-3" />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
