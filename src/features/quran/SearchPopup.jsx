import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { RxCross1 } from 'react-icons/rx';

const SearchPopup = ({ onClose }) => {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  // Mock search history
  const [searchHistory] = useState([
    'Quran translation',
    'Islamic books',
    'Daily duas',
    'Hadith collections',
  ]);
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed inset-0 flex h-[100vh] items-center  justify-center z-50"
    >
      <div
        className="fixed inset-0 bg-black/50 h-screen backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="bg-[#202424] p-6 rounded-lg shadow-lg w-full max-w-lg mx-4 relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl text-gray-700 font-semibold">Search</h2>
          <button
            onClick={onClose}
            className="text-gray-500 active:scale-90 transform transition-all duration-100 cursor-pointer hover:text-gray-700"
          >
            <RxCross1 className="text-2xl" />
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search everything here..."
            className="w-full px-4 py-2 pl-10 border placeholder:text-gray-400 text-gray-600 border-gray-300 rounded-lg outline-gray-400"
          />
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        </div>
        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="mt-4 bg-[#343A40] p-3 rounded-lg shadow">
            <h3 className="text-sm font-semibold  text-gray-500 mb-2">
              Recent Searches
            </h3>
            <ul>
              {searchHistory.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-500 text-sm transition-all duration-75 transform hover:skew-1 py-1 px-2 hover:bg-gray-200 rounded cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SearchPopup;
