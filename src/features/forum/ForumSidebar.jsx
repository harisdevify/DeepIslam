import { DepartureBoard, ResetTv } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react';
import { FiChevronLeft, FiPlus } from 'react-icons/fi';

// React Icons (Feather and Remix icons)
import {
  RiArrowDownSLine,
  RiBookmarkLine,
  RiFireLine,
  RiHome4Line,
  RiSettings4Line,
} from 'react-icons/ri';
function ForumSidebar({
  isExpanded,
  toggleSidebar,
  activeSubreddit,
  setActiveSubreddit,
  currentUser,
  setShowCreatePostModal,
  setShowCreateCommunity,
  popularTopics,
}) {
  const getUserInitial = (username) => username.slice(0, 1).toUpperCase();

  return (
    <aside
      className={`fixed top-15 z-10 h-screen transition-all ${
        isExpanded ? 'w-64' : 'w-0 lg:w-20'
      }`}
    >
      <div
        className={`h-full bg-[#0E1A1E] border-r border-[#1D2D35] overflow-hidden ${
          isExpanded ? 'w-64' : 'w-0 lg:w-20'
        } transition-all duration-300`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-[#1D2D35] flex items-center justify-between bg-[#0B1416]">
            {isExpanded ? (
              <>
                <h2 className="text-xl font-bold text-[#2DA3AA] flex items-center gap-2">
                  <DepartureBoard className="text-2xl" />
                  DeepIslam
                </h2>
                <Button
                  onClick={toggleSidebar}
                  sx={{
                    padding: '4px 0px',
                    borderRadius: '8px',
                    color: '#9E9E9E',
                    '&:hover': {
                      backgroundColor: '#1D2D35',
                      color: '#fff',
                    },
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <FiChevronLeft className="text-xl" />
                </Button>
              </>
            ) : (
              <button
                onClick={toggleSidebar}
                className="w-full flex justify-center p-1.5 rounded-lg hover:bg-[#1D2D35]"
              >
                <ResetTv className="text-2xl text-[#2DA3AA]" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <div className="flex-1 p-3 overflow-y-auto">
            {/* Quick Actions */}
            <div className="flex flex-col items-center w-full">
              <div className="flex justify-center w-full mb-4">
                <Button
                  variant="contained"
                  onClick={() => setShowCreatePostModal(true)}
                  sx={{
                    width: '100%',
                    backgroundColor: '#2DA3AA',
                    '&:hover': {
                      backgroundColor: '#238189',
                    },
                    color: 'white',
                    py: '10px',
                    borderRadius: '8px',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    textTransform: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <FiPlus style={{ fontSize: '1.125rem' }} />
                  {isExpanded && 'Create Post'}
                </Button>
              </div>
            </div>

            {/* Main Navigation */}
            <nav className="flex flex-col items-center justify-center w-full mb-3">
              {[
                { icon: <RiHome4Line />, label: 'Home', count: 0 },
                { icon: <RiFireLine />, label: 'Popular', count: 0 },
                { icon: <RiBookmarkLine />, label: 'Saved', count: 12 },
              ].map((item, index) => (
                <Button
                  key={index}
                  onClick={item.onClick}
                  sx={{
                    justifyContent: isExpanded ? 'flex-start' : 'center',
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    color: item.active ? '#fff' : '#9CA3AF', // gray-400
                    backgroundColor: item.active ? '#1D2D35' : 'transparent',
                    '&:hover': {
                      backgroundColor: '#1D2D35',
                      color: '#fff',
                    },
                    textTransform: 'none',
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
                  {isExpanded && (
                    <div
                      style={{
                        marginLeft: '0.75rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                      }}
                    >
                      <span>{item.label}</span>
                      {item.count > 0 && (
                        <span
                          style={{
                            backgroundColor: '#2DA3AA',
                            fontSize: '0.75rem',
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            color: 'white',
                          }}
                        >
                          {item.count}
                        </span>
                      )}
                    </div>
                  )}
                </Button>
              ))}
            </nav>

            {/* Communities Section */}
            {isExpanded && (
              <div className="border-t border-[#1D2D35] pt-4">
                <div className="flex items-center justify-between px-1 mb-4">
                  <h3 className="text-sm font-medium text-gray-400">
                    YOUR COMMUNITIES
                  </h3>
                  <button
                    onClick={() => setShowCreateCommunity(true)}
                    className="p-1.5 hover:bg-[#1D2D35] rounded-lg text-gray-400 hover:text-white"
                  >
                    <FiPlus className="text-lg" />
                  </button>
                </div>

                <div className="space-y-2">
                  {popularTopics.map((topic, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        toggleSidebar();
                        setActiveSubreddit(topic.name);
                      }}
                      className={`flex items-center w-full p-2 rounded-lg group ${
                        activeSubreddit === topic.name
                          ? 'bg-[#1D2D35] text-white'
                          : 'hover:bg-[#1D2D35] text-gray-200'
                      } transition-colors`}
                    >
                      <span className="w-7 h-7 bg-[#2DA3AA] rounded-full flex items-center justify-center text-xs font-bold">
                        {topic.name[0]}
                      </span>
                      <div className="flex-1 ml-3 text-left">
                        <p className="text-sm">forum/{topic.name}</p>
                        <p className="text-xs text-gray-400">25.4k members</p>
                      </div>
                      {activeSubreddit === topic.name && (
                        <div className="w-2 h-2 bg-[#2DA3AA] rounded-full ml-2" />
                      )}
                    </button>
                  ))}
                </div>

                <button className="w-full mt-4 text-[#2DA3AA] text-sm font-medium flex items-center gap-2 hover:bg-[#1D2D35] p-2 rounded-lg">
                  <RiArrowDownSLine className="text-lg" />
                  Show More Communities
                </button>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="p-2 mt-14 sticky bottom-15 border-t border-[#1D2D35] bg-[#0B1416]">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2DA3AA] to-[#1D2D35] flex items-center justify-center text-sm font-bold text-white">
                {getUserInitial(currentUser.username)}
              </div>
              {isExpanded && (
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">
                    {currentUser.username}
                  </p>
                  <p className="text-xs text-gray-400">1.2K Followers</p>
                </div>
              )}
              {isExpanded && (
                <button className="p-1.5 hover:bg-[#1D2D35] rounded-lg text-gray-400 hover:text-white">
                  <RiSettings4Line className="text-lg" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default ForumSidebar;
