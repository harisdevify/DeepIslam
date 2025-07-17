import React from 'react';

function UserProfile() {
  return (
    <aside
      className="hidden xl:block w-96 pb-5 sticky right-2 top-25
        h-[calc(100vh-4rem)] overflow-y-auto"
    >
      <div className="max-w-md mx-auto bg-[#0E1A1E] rounded-sm overflow-hidden shadow-xl border-[.1px] border-gray-800">
        {/* Header with cover image */}
        <div className="relative h-24 bg-gradient-to-r from-[#2E989F] to-teal-900">
          {/* Profile Actions */}
          <div className="absolute flex gap-2 top-2 right-2">
            <button className="bg-black/30 backdrop-blur-sm text-white p-1.5 rounded-lg hover:bg-black/50 transition-all text-xs">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                ></path>
              </svg>
            </button>
          </div>

          {/* Profile Avatar */}
          <div className="absolute transform -translate-x-1/2 -bottom-10 left-1/2">
            <div className="relative">
              <div className="absolute rounded-full -inset-1 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-70"></div>
              <div className="relative z-10 w-20 h-20 overflow-hidden border-4 border-gray-900 rounded-full">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuDQ18xpTpXFHXhPOB4h61flM_bpQ4gXAJqQ&s"
                  alt="User Avatar"
                  className="object-cover w-full h-full"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-gray-900 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="px-4 pt-12 pb-5">
          {/* User Info */}
          <div className="mb-4 text-center">
            <h1 className="flex items-center justify-center gap-2 text-xl font-bold">
              Hacker
            </h1>

            <div className="flex items-center justify-center mt-1 text-sm text-gray-400">
              <span>@hacker_00100</span>
            </div>
          </div>

          {/* Activity Stats */}
          <div className="mb-4 border rounded-lg bg-gray-800/50 border-gray-700/50">
            <div className="grid grid-cols-3 divide-x divide-gray-700/50">
              <div className="py-2 text-center">
                <div className="text-base font-bold">248</div>
                <div className="text-xs text-gray-400">Posts</div>
              </div>

              <div className="py-2 text-center">
                <div className="text-base font-bold">1.2K</div>
                <div className="text-xs text-gray-400">Followers</div>
              </div>

              <div className="py-2 text-center">
                <div className="text-base font-bold">5</div>
                <div className="text-xs text-gray-400">Awards</div>
              </div>
            </div>
          </div>

          {/* Engagement Score */}
          <div className="p-3 mb-4 border rounded-lg bg-gray-800/50 border-gray-700/50">
            <div className="flex justify-between items-center text-xs text-gray-400 mb-1.5">
              <div className="flex items-center gap-1.5">
                <svg
                  className="w-3.5 h-3.5 text-[#2C959C]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  ></path>
                </svg>
                <span>Activity Level</span>
              </div>
              <span className="text-[#2C959C] font-medium">72%</span>
            </div>

            {/* Progress Bar */}
            <div className="h-2 overflow-hidden bg-gray-700 rounded-full">
              <div
                className="h-full bg-[white] rounded-full"
                style={{ width: '72%' }}
              ></div>
            </div>
          </div>

          {/* Bio */}
          <div className="p-3 mb-4 border rounded-lg bg-gray-800/50 border-gray-700/50">
            <p className="text-sm text-gray-300">
              Student of Islamic studies focusing on Tafsir and Hadith. I share
              reflections on Quranic verses daily and host weekly discussions on
              contemporary Islamic topics.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button className="flex-1 bg-[#2C959C] hover:from-emerald-700 hover:to-teal-800 text-white py-2 rounded font-medium text-sm flex items-center justify-center gap-1.5">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                ></path>
              </svg>
              Follow
            </button>

            <button className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 rounded font-medium text-sm flex items-center justify-center gap-1.5 border border-gray-600">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                ></path>
              </svg>
              Message
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Community Info Card */}
      <div className="max-w-md mx-auto mt-5 bg-[#0E1A1E] rounded-xl overflow-hidden shadow-sm border-[.1px] border-gray-800 mb-6">
        {/* Background layers */}
        <div className="relative">
          {/* Header accent bar */}
          <div className="h-2 bg-gradient-to-r from-[#2E989F] to-teal-900"></div>

          {/* Content area */}
          <div className="p-4">
            {/* Community header */}
            <div className="flex items-center mb-3">
              <div className="w-10 h-10 mr-3 overflow-hidden border border-gray-700 rounded-full">
                <img
                  src="/DeepIslam.png"
                  alt="DeepIslam Logo"
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <h2 className="flex items-center text-lg font-bold">
                  <span>DeepIslam</span>
                  <svg
                    className="w-4 h-4 ml-1.5 text-emerald-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </h2>
                <p className="text-xs text-gray-400">Official Community</p>
              </div>
            </div>

            {/* Community description */}
            <p className="p-3 mb-4 text-sm text-gray-300 border rounded-lg bg-gray-800/50 border-gray-700/50">
              A community dedicated to Islamic discussions, Quranic studies, and
              spiritual growth.
            </p>
            <div></div>
            {/* Community statistics */}
            <div className="p-3 mb-4 border rounded-lg bg-gray-800/50 border-gray-700/50">
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="text-xs text-gray-400">Founded</div>
                  <div className="text-sm font-medium">2019</div>
                </div>

                <div className="text-center">
                  <div className="text-xs text-gray-400">Members</div>
                  <div className="text-sm font-medium">125K</div>
                </div>

                <div className="text-center">
                  <div className="text-xs text-gray-400">Activity</div>
                  <div className="flex items-center justify-center text-sm font-medium">
                    <span>High</span>
                    <div className="w-2 h-2 rounded-full bg-green-500 ml-1.5"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Join button */}
            <button className="w-full bg-gradient-to-r from-[#2E989F] to-teal-900 hover:to-teal-800 text-white py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                ></path>
              </svg>
              Join Community
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default UserProfile;
