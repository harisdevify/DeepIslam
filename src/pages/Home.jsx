import { Tooltip } from '@mui/material';
import React from 'react';
import { CiSearch } from 'react-icons/ci';
import { MdSettingsVoice } from 'react-icons/md';
function Home() {
  return (
    <div className="mt-32 p-10">
      <div className="relative flex justify-center items-center w-full">
        <div className="relative w-1/2">
          <CiSearch className="absolute left-4 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-500 text-xl" />
          <input
            placeholder="What do you want to read?"
            type="text"
            className="border w-full pl-12 pr-5 py-3 bg-white rounded-3xl text-black outline-none maven"
          />
          <MdSettingsVoice
            data-tooltip-id="Search-toolpit"
            className="absolute right-4 outline-none top-1/2 cursor-pointer transform -translate-y-1/2 text-[#2BA4AB] text-2xl "
          />
          <Tooltip
            id="Search-toolpit"
            place="bottom"
            content="Search by Voice"
            style={{
              backgroundColor: 'black',
              color: 'white',
              fontSize: '13px',
              padding: '7px 12px',
              borderRadius: '6px',
            }}
          />
        </div>
      </div>
      <div className="flex gap-3 justify-center items-center w-full">
        <span className=" transition-all duration-100 maven cursor-pointer hover:text-[grey]">
          Quran Qiraath
        </span>
        <span className=" transition-all duration-100 maven cursor-pointer hover:text-[grey]">
          Quran Reading
        </span>
        <span className=" transition-all duration-100 maven cursor-pointer hover:text-[grey]">
          Quran Listening
        </span>
        <span className=" transition-all duration-100 maven cursor-pointer hover:text-[grey]">
          Quran Translation
        </span>
        <span className=" transition-all duration-100 maven cursor-pointer hover:text-[grey]">
          Quran Thatfsser
        </span>
      </div>
    </div>
  );
}

export default Home;
