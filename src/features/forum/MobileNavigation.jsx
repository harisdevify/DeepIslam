import React from 'react';
import { RiPencilLine } from 'react-icons/ri';

function MobileNavigation() {
  // const getUserInitial = (username) => username.slice(0, 1).toUpperCase();

  return (
    <div className="fixed bottom-0 lg:hidden z-40 w-full bg-[#1F2A30] border-t border-[#2A373E]">
      <div className="flex items-center justify-around p-2">
        <button className="p-3 rounded-full hover:bg-[#2A373E]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
        </button>
        <button className="p-3 rounded-full hover:bg-[#2A373E]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </button>
        <button
          // onClick={() => setShowCreatePostModal(true)}
          className="p-3 bg-[#2DA3AA] rounded-full hover:bg-[#1d6d72] transform -translate-y-6 shadow-lg"
        >
          <RiPencilLine className="w-6 h-6" />
        </button>
        <button className="p-3 rounded-full hover:bg-[#2A373E]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </button>
        <button className="p-3 rounded-full hover:bg-[#2A373E]">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2DA3AA] to-[#1F2A30] flex items-center justify-center text-xs text-white">
            {/* {getUserInitial(currentUser.username)} */}
          </div>
        </button>
      </div>
    </div>
  );
}

export default MobileNavigation;
