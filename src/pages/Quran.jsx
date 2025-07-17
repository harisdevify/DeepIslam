import React, { useEffect, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import { MdSettingsVoice } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { Tooltip } from '@mui/material';
import apiClient from '../services/apiClient';
function Quran() {
  const [activeSJR, setActiveSJR] = useState('Surah');
  const navigate = useNavigate(); //useNavigate() helps you move to another page in your React app without clicking a link. Instead of using <a> or <Link>

  // const [searchQuery, setSearchQuery] = useState('');
  const [surah, setSurah] = useState(null);
  const convertToArabicNumbers = (number) => {
    const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

    // Convert the number to a string, then map each character to the Arabic numeral
    return number
      .toString()
      .split('')
      .map((digit) => arabicDigits[parseInt(digit)])
      .join('');
  };

  useEffect(() => {
    apiClient
      .get('/surah')
      .then((res) => {
        setSurah(res.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const Juz = [
    {
      JuzNum: 1,
      JuzEnName: 'Alif Lam Meem',
      JuzArabicName: 'الٓمّٓ',
      JuzRoku: '15',
      StartSurah: 'Al-Baqarah',
      StartVerse: '1',
      TotalAyahs: '141',
    },
    {
      JuzNum: 2,
      JuzEnName: 'Sayaqool',
      JuzArabicName: 'سَيَقُولُ',
      JuzRoku: '16',
      StartSurah: 'Al-Baqarah',
      StartVerse: '142',
      TotalAyahs: '111',
    },
    {
      JuzNum: 3,
      JuzEnName: 'Tilkal Rusul',
      JuzArabicName: 'تِلْكَ ٱلرُّسُلُ',
      JuzRoku: '20',
      StartSurah: 'Al-Baqarah',
      StartVerse: '253',
      TotalAyahs: '103',
    },
    {
      JuzNum: 4,
      JuzEnName: 'Lantanalu',
      JuzArabicName: 'لَن تَنَالُواْ',
      JuzRoku: '18',
      StartSurah: 'Aal-E-Imran',
      StartVerse: '92',
      TotalAyahs: '176',
    },
    {
      JuzNum: 5,
      JuzEnName: 'Wal Mohsanat',
      JuzArabicName: 'وَٱلْمُحْصَنَٰتُ',
      JuzRoku: '14',
      StartSurah: 'An-Nisa',
      StartVerse: '24',
      TotalAyahs: '120',
    },
    {
      JuzNum: 6,
      JuzEnName: 'La Yohibbullah',
      JuzArabicName: 'لَا يُحِبُّ اللَّهُ',
      JuzRoku: '20',
      StartSurah: 'An-Nisa',
      StartVerse: '148',
      TotalAyahs: '110',
    },
  ];
  const Revelation_Order = [
    {
      SurahNum: 96,
      SurahName: "Al-'Alaq",
      SurahArabicName: '٩٦',
      RevelationOrder: 1,
      Place: 'Makkah',
      TotalAyahs: 19,
    },
    {
      SurahNum: 68,
      SurahName: 'Al-Qalam',
      SurahArabicName: '٦٨',
      RevelationOrder: 2,
      Place: 'Makkah',
      TotalAyahs: 52,
    },
    {
      SurahNum: 73,
      SurahName: 'Al-Muzzammil',
      SurahArabicName: '٧٣',
      RevelationOrder: 3,
      Place: 'Makkah',
      TotalAyahs: 20,
    },
    {
      SurahNum: 74,
      SurahName: 'Al-Muddaththir',
      SurahArabicName: '٧٤',
      RevelationOrder: 4,
      Place: 'Makkah',
      TotalAyahs: 56,
    },
    {
      SurahNum: 1,
      SurahName: 'Al-Fatiha',
      SurahArabicName: '١',
      RevelationOrder: 5,
      Place: 'Makkah',
      TotalAyahs: 7,
    },
    {
      SurahNum: 111,
      SurahName: 'Al-Masad',
      SurahArabicName: '١١١',
      RevelationOrder: 6,
      Place: 'Makkah',
      TotalAyahs: 5,
    },
    {
      SurahNum: 81,
      SurahName: 'At-Takwir',
      SurahArabicName: '٨١',
      RevelationOrder: 7,
      Place: 'Makkah',
      TotalAyahs: 29,
    },
    {
      SurahNum: 87,
      SurahName: "Al-A'la",
      SurahArabicName: '٨٧',
      RevelationOrder: 8,
      Place: 'Makkah',
      TotalAyahs: 19,
    },
    {
      SurahNum: 92,
      SurahName: 'Al-Lail',
      SurahArabicName: '٩٢',
      RevelationOrder: 9,
      Place: 'Makkah',
      TotalAyahs: 21,
    },
  ];

  const LoadingSkeleton = ({ count }) => {
    return (
      <div className="grid w-[71.5rem] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="h-26 bg-[#1F2A30] rounded-lg border border-gray-800 flex items-center justify-between p-4 relative overflow-hidden"
          >
            {/* Left - Number diamond */}
            <div className="relative z-10">
              <div className="w-10 h-10 bg-gray-700 rounded-md rotate-45 flex items-center justify-center"></div>
            </div>

            {/* Middle - Title and subtitle */}
            <div className="flex-1 ml-4 z-10">
              <div className="w-32 h-6 bg-gray-700 rounded-md mb-2 animate-pulse"></div>
              <div className="w-24 h-4 bg-gray-600 rounded-md animate-pulse"></div>
            </div>

            {/* Right - Arabic and ayahs */}
            <div className="flex flex-col items-end z-10">
              <div className="w-20 h-6 bg-gray-700 rounded-md mb-2 animate-pulse"></div>
              <div className="w-16 h-4 bg-gray-600 rounded-md animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="mt-10 md:mt-20  py-10 px-2 md:px-10 xl:px-32 text-[#B0BEC5]">
        <div className="flex flex-col justify-center items-center">
          <img
            src="/justLOGO.png"
            className="w-[12rem] md:w-[15rem]"
            alt="img"
          />
          <h1 className="md:text-4xl mt-10 maven text-[1.8rem] font-extrabold text-[#B0BEC5] text-center">
            All About the Quran
          </h1>
        </div>
        <div className="relative flex mt-5 justify-center items-center w-full">
          <div className="relative w-full sm:w-1/2">
            <CiSearch className="absolute left-4 top-1/2 cursor-pointer transform -translate-y-1/2 text-gray-500 text-xl" />
            <input
              // value={searchQuery}
              // onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Surah or Juz"
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
        <div className="mt-10 px-4">
          <div>
            {/* Tabs */}
            <div className="flex gap-10 font-bold maven">
              {['Surah', 'Juz', 'Revelation_Order'].map((tab) => (
                <h1
                  key={tab}
                  onClick={() => setActiveSJR(tab)}
                  className={`cursor-pointer transition-all duration-300 ${
                    activeSJR === tab ? 'border-b-3 border-white' : ''
                  }`}
                >
                  {tab}
                </h1>
              ))}
            </div>
            <div className="border-b-[0.5px] rounded"></div>
          </div>
          <div className="grid grid-cols-1 mt-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 md:gap-10">
            {/* Surah Section */}
            {activeSJR === 'Surah' &&
              (!surah ? (
                <LoadingSkeleton count={15} /> // Show loading skeleton while fetching data
              ) : (
                surah.map(
                  (
                    {
                      englishName,
                      number,
                      englishNameTranslation,
                      numberOfAyahs,
                    },
                    index
                  ) => (
                    <div
                      key={index}
                      className="border bg-black/30 rounded-md cursor-pointer transition-all hover:text-[#2BA4AB]"
                      onClick={() => navigate(`/Quran/surah/${number}`)}
                    >
                      <div className="flex justify-between px-4 py-3 items-center">
                        <div className="flex items-center gap-3">
                          <span className="w-[2.5rem] h-[2.5rem] rounded-sm bg-[#343A40] flex justify-center items-center rotate-45">
                            <span className="-rotate-45 text-lg sm:text-base">
                              {number}
                            </span>
                          </span>
                          <div>
                            <h1 className="font-semibold text-lg sm:text-base">
                              {englishName}
                            </h1>
                            <p className="text-[13px] text-[#777777] sm:text-[12px]">
                              {englishNameTranslation}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="quran-text text-gray-700 hover:text-amber-300 transition-colors duration-150 text-2xl">
                            {convertToArabicNumbers(number)}
                          </p>
                          <span className="text-[13px] text-[#777777] sm:text-[12px]">
                            {numberOfAyahs} Ayahs
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )
              ))}

            {/* Juz Section */}
            {activeSJR === 'Juz' &&
              Juz.map(
                (
                  {
                    JuzNum,
                    JuzEnName,
                    JuzArabicName,
                    JuzRoku,
                    StartSurah,
                    StartVerse,
                    TotalAyahs,
                  },
                  index
                ) => (
                  <div
                    key={index}
                    className="border rounded-md cursor-pointer transition-all hover:text-green-500"
                    onClick={() => navigate(`/Quran/Juz/${JuzArabicName}`)}
                  >
                    <div className="flex justify-between px-4 py-3 items-center">
                      <div className="flex items-center gap-3">
                        <span className="w-[2.5rem] h-[2.5rem] rounded-sm bg-[#343A40] flex justify-center items-center rotate-45">
                          <span className="-rotate-45 text-lg sm:text-base">
                            {JuzNum}
                          </span>
                        </span>
                        <div>
                          <h1 className="font-semibold text-lg sm:text-base">
                            {JuzEnName}
                          </h1>
                          <p className="text-[13px] mt-2 text-[#777777] sm:text-[12px]">
                            Start Surah: {StartSurah}
                          </p>
                          <p className="text-[13px] text-[#777777] sm:text-[12px]">
                            Start Verse: {StartVerse}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="surah-name text-gray-700 text-2xl">
                          {JuzArabicName}
                        </p>
                        <span className="text-[13px] text-[#777777] sm:text-[12px]">
                          {JuzRoku} Rukuu
                        </span>
                        <p className="text-[13px] text-[#777777] sm:text-[12px]">
                          Total Verse: {TotalAyahs}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )}
            {/* Revelation Order Section */}
            {activeSJR === 'Revelation_Order' &&
              Revelation_Order.map(
                (
                  {
                    SurahNum,
                    SurahName,
                    SurahArabicName,
                    RevelationOrder,
                    Place,
                    TotalAyahs,
                  },
                  index
                ) => (
                  <div
                    key={index}
                    className="border rounded-md cursor-pointer transition-all hover:text-green-500"
                    onClick={() =>
                      navigate(`/Quran/Revelation/${SurahArabicName}`)
                    } // Fix: Navigate correctly
                  >
                    <div className="flex justify-between px-4 py-3 items-center">
                      <div className="flex items-center gap-3">
                        <span className="w-[2.5rem] h-[2.5rem] rounded-sm bg-[#343A40] flex justify-center items-center rotate-45">
                          <span className="-rotate-45 text-lg sm:text-base">
                            {RevelationOrder}
                          </span>
                        </span>
                        <div>
                          <h1 className="font-semibold text-lg sm:text-base">
                            {SurahName}
                          </h1>
                          <p className="text-[13px] mt-2 text-[#777777] sm:text-[12px]">
                            Place: {Place}
                          </p>
                          <p className="text-[13px] text-[#777777] sm:text-[12px]">
                            Surah Number: {SurahNum}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="quran-text text-gray-700 text-2xl">
                          {SurahArabicName}
                        </p>
                        <span className="text-[13px] text-[#777777] sm:text-[12px]">
                          Total Ayahs: {TotalAyahs}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Quran;
