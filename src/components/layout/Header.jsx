import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useRef, useState } from 'react';
import { CgMenuGridO } from 'react-icons/cg';
import {
  FaBook,
  FaCogs,
  FaDownload,
  FaHome,
  FaPen,
  FaPhone,
  FaQuran,
  FaUser,
} from 'react-icons/fa';
import { MdForum, MdOutlineLanguage } from 'react-icons/md';
import { Link, NavLink } from 'react-router-dom';
import SearchPopup from '../../features/quran/SearchPopup';

function Header() {
  // audio
  const audioRef = useRef(null);
  const [, setIsPlaying] = useState(false);

  // Language Menu Dropdown
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);

      audioRef.current.onended = () => setIsPlaying(false);
    }
  };

  const [showHeader] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);
  const toggleMenu = () => setOpenMenu(!openMenu);

  const [ShowSearchPopup, setShowSearchPopup] = useState(false);

  const handleCloseOnClick = () => {
    setOpenMenu(false);
  };

  useEffect(() => {
    // Disable scrolling on the body when the menu is open
    if (openMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openMenu]);

  const Navlinks = [
    {
      path: '/',
      label: 'Home',
      icon: <FaHome />,
    },
    {
      path: '/quran',
      label: 'All About the Quran',
      icon: <FaQuran />,
    },
    {
      path: '/questionList',
      label: 'Question&Answer',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 3h18v14H5l-4 4V3z" />
          <path d="M7 9h6" />
          <path d="M7 13h4" />
          <circle cx="18" cy="18" r="3" />
          <path d="M17 21v-2a1 1 0 0 1 2 0v2" />
        </svg>
      ),
    },

    {
      path: '/forumComponent',
      label: 'forumComponent',
      icon: <MdForum />,
    },
    {
      path: '/services',
      label: 'Services',
      icon: <FaCogs />,
    },
    {
      path: '/courses',
      label: 'Courses',
      icon: <FaBook />,
    },
    {
      path: '/download',
      label: 'Download',
      icon: <FaDownload />,
    },
    {
      path: '/blog',
      label: 'Blog',
      icon: <FaPen />,
    },
    {
      path: '/contact',
      label: 'Contact',
      icon: <FaPhone />,
    },
    {
      path: '/contact',
      label: 'Connect Us',
      icon: <FaPhone />,
    },
    {
      path: '/contact',
      label: 'Navigation',
      icon: <FaPhone />,
    },
    {
      path: '/blog',
      label: 'Help',
      icon: <FaPen />,
    },
    {
      path: '/layout',
      label: 'Laout',
      icon: <FaPen />,
    },
  ];
  return (
    <header
      className={`w-full transition-transform duration-500 ${
        showHeader ? 'translate-y-0' : '-translate-y-full'
      } fixed top-0 z-50`}
    >
      {/* Navbar */}
      <nav className="px-4 md:px-7 py-3 flex justify-between bg-[#1F2A30] border-b border-[#25414f]">
        <div className="flex md:gap-5 gap-3 items-center">
          <Tooltip title="Menu">
            <CgMenuGridO
              className="text-3xl cursor-pointer outline-none active:scale-90 active:text-[#2BA4AB] transition-all duration-100 transform"
              onClick={toggleMenu}
            />
          </Tooltip>
          <h1 className="text-2xl md:text-3xl font-bold maven">
            <span onClick={playAudio} className="cursor-pointer">
              🌙 DeepIslam
            </span>
          </h1>
        </div>
        {/* WelComming Audio on Click of logo*/}
        <div className="relative left-[5.2rem] -top-[2.9rem]">
          <audio ref={audioRef}>
            <source src="/DeepIslam.mp3" type="audio/mpeg" />
          </audio>
        </div>

        <div className="flex md:gap-5 gap-3 items-center">
          <div>
            {/* Language Icon Button */}
            <Tooltip
              title="Change Language"
              placement="top"
              PopperProps={{
                modifiers: [
                  {
                    name: 'offset',
                    options: {
                      offset: [0, -8], // [horizontal, vertical] — adjust the vertical distance
                    },
                  },
                ],
              }}
            >
              <IconButton
                onClick={handleClick}
                aria-controls={open ? 'language-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{
                  color: 'white',
                  fontSize: '23px',
                  '&:active': {
                    transform: 'scale(0.9)',
                    color: '#2BA4AB',
                  },
                  transition: 'all 0.1s',
                }}
              >
                <MdOutlineLanguage />
              </IconButton>
            </Tooltip>
            {/* MUI Menu */}
            <Menu
              id="language-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              PaperProps={{
                sx: {
                  bgcolor: '#1F2A30',
                  border: '1px solid #25414f',
                  color: 'white',
                },
              }}
            >
              <MenuItem disabled>Languages</MenuItem>
              <MenuItem onClick={handleClose}>English</MenuItem>
              <MenuItem onClick={handleClose}>Arabic</MenuItem>
              <MenuItem onClick={handleClose}>Urdu</MenuItem>
            </Menu>
          </div>

          <Tooltip title="Forum">
            <Link to={'/forumComponent'}>
              <MdForum className="active:scale-90 active:text-[#2BA4AB] transition-all duration-100 transform text-[23px] md:text-2xl cursor-pointer outline-none" />
            </Link>
          </Tooltip>
          <Tooltip title="Q&A">
            <Link to={'/questionList'}>
              <svg
                className="active:scale-90 outline-none active:text-[#2BA4AB] transition-all duration-100 transform"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 3h18v14H5l-4 4V3z" />
                <path d="M7 9h6" />
                <path d="M7 13h4" />
                <circle cx="18" cy="18" r="3" />
                <path d="M17 21v-2a1 1 0 0 1 2 0v2" />
              </svg>
            </Link>
          </Tooltip>
          <div className="flex items-center gap-2 cursor-pointer ml-0 md:ml-10">
            <Tooltip title="Login">
              <Link to={'/login'}>
                <FaUser className="active:scale-90 active:text-[#2BA4AB] transition-all duration-100 transform text-[23px] md:text-xl cursor-pointer outline-none" />
              </Link>
            </Tooltip>
          </div>
        </div>
      </nav>
      {/* navbar */}
      <ul
        className={` sidebar ${
          openMenu ? 'active' : ''
        } z-50 fixed overflow-y-scroll shrink-0 flex flex-col shadow-2xl shadow-grey-500 pb-48 h-[100vh] top-0 left-0 bg-[#1F2A30] transition-all duration-30`}
      >
        <div className="sticky z-10 top-0 border-b-[1px] border-[#1c3644] bg-[#1F2A30] px-4 py-[14px] flex justify-between items-center">
          <h1 className="text-2xl md:text-2xl font-bold maven">🌙 DeepIslam</h1>
          <Tooltip title="Close Menu">
            <CloseIcon
              onClick={toggleMenu}
              sx={{
                fontSize: '24px',
                cursor: 'pointer',
                outline: 'none',
                transition: 'all 0.1s',
                '&:active': {
                  transform: 'scale(0.9)',
                  color: '#2BA4AB',
                },
              }}
            />
          </Tooltip>
        </div>

        <h1 className="text-center text-xl font-bold mt-4 text-white shadow-black">
          Welcome to DeepIslam.com
        </h1>
        <div className="flex px-4 flex-col justify-center w-[20rem]">
          <h1 className="px-5 border-b pb-3 mt-10 border-[#464B4F] uppercase maven text-[12px] font-semibold">
            Menu
          </h1>
          {Navlinks.map(({ path, label, icon }, index) => (
            <li
              key={index}
              className="py-3 text-start border-b border-[#464B4F]"
            >
              <NavLink
                to={path}
                onClick={handleCloseOnClick}
                className="flex items-center gap-3 hover:text-amber-500 text-[#E7E9EA] text-[16px]"
              >
                <span>{icon}</span>
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </div>
      </ul>

      {ShowSearchPopup && (
        <SearchPopup onClose={() => setShowSearchPopup(false)} />
      )}
    </header>
  );
}

export default Header;
