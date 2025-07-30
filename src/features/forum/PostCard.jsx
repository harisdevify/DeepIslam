import PropTypes from 'prop-types';
import { useState } from 'react';

// Material UI imports
import { Share as ShareIcon } from '@mui/icons-material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BugReportIcon from '@mui/icons-material/BugReport';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkIcon from '@mui/icons-material/Link';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { AiOutlineLike } from 'react-icons/ai';

// Component imports
import PostContentRenderer from '../../features/forum/PostContentRenderer';
import { getFontClass } from '../../utils/languageDetector';

const PostCard = ({
  post,
  // currentUser,
  postReactions,
  islamicReactions,
  handleReaction,
  handlePollVote,
  selectedOptions,
  setSelectedPostForComments,
}) => {
  // State management
  const [showMoreText, setShowMoreText] = useState(false);
  const [showReactionsForPost, setShowReactionsForPost] = useState(false);
  const [hoveredReaction, setHoveredReaction] = useState(null);

  // Menu states
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const [moreAnchorEl, setMoreAnchorEl] = useState(null);
  const openShareMenu = Boolean(shareAnchorEl);
  const openMoreMenu = Boolean(moreAnchorEl);

  // Find post reaction data
  const postReaction = postReactions.find((pr) => pr.id === post.id) || {
    reactions: {},
    userReaction: null,
  };
  const userReaction = postReaction.userReaction;
  const reactionCounts = postReaction.reactions || {};
  const totalReactions = Object.values(reactionCounts).reduce(
    (sum, reaction) => sum + (reaction.count || 0),
    0
  );
  const reactionSummary = Object.entries(reactionCounts)
    .filter(([, data]) => data.count > 0)
    .map(([type, data]) => {
      const emoji = islamicReactions.find((r) => r.type === type)?.emoji;
      return `${data.count} ${emoji}`;
    })
    .join(' ');

  // Handlers
  const handleShowMoreText = () => {
    setShowMoreText((prev) => !prev);
  };

  // Share menu handlers
  const handleShareClick = (event) => {
    setShareAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setShareAnchorEl(null);
  };

  // More menu handlers
  const handleMoreClick = (event) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    handleShareClose();
  };

  const handleTwitterShare = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        window.location.href
      )}`,
      '_blank'
    );
    handleShareClose();
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`,
      '_blank'
    );
    handleShareClose();
  };

  const handleSave = () => {
    // Save logic
    handleMoreClose();
  };

  const handleReport = () => {
    // Report logic
    handleMoreClose();
  };

  return (
    <div className="bg-[#0f1a1f] rounded-sm w-full shadow-lg hover:shadow-xl">
      <div className="p-2 lg:p-4">
        {/* Post header */}
        <div className="flex items-center gap-3 mb-3 text-sm">
          <span className="bg-gradient-to-r from-[#289297] to-[#1a5a6c] text-white px-3 py-1 rounded-full text-xs font-medium">
            forum/{post.subreddit}
          </span>
          <span className="text-[#6c7a80] flex items-center">
            <span className="w-1 h-1 bg-[#6c7a80] rounded-full mr-2" />/
            {post.author}
          </span>
        </div>

        {/* Post content */}
        <div className="mb-4">
          <h3
            className={`text-lg font-semibold text-white mb-1 ${getFontClass(
              post.text
            )}`}
          >
            {post.title}
          </h3>
          {post.text && (
            <div
              className={`text-gray-300 px-4 text-[clamp(1rem,1.2vw,1.25rem)] leading-[clamp(1.5rem,2vw,1.9rem)] py-2 ${getFontClass(
                post.text
              )}`}
            >
              <span className="whitespace-pre-line">
                {post.text.length > 300 && !showMoreText
                  ? `${post.text.substring(0, 300)}...`
                  : post.text}
              </span>
              {post.text.length > 300 && (
                <button
                  onClick={handleShowMoreText}
                  className="text-[#2F878D] hover:underline mt-1 cursor-pointer text-sm"
                >
                  {showMoreText ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Post media */}
        {post.image && (
          <div className="mb-4">
            {post.type === 'video' ? (
              <video
                controls
                className="max-h-[480px] w-full rounded-xl border border-[#1d2d35]"
              >
                <source src={post.image} type="video/mp4" />
              </video>
            ) : (
              <div className="w-full flex justify-center bg-[#1F2A30] rounded-lg">
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full max-h-[480px] object-contain rounded-lg border border-[#1d2d35]"
                />
              </div>
            )}
          </div>
        )}

        {/* Special post types */}
        <PostContentRenderer
          post={post}
          handlePollVote={handlePollVote}
          selectedOptions={selectedOptions}
        />

        {/* Post actions */}
        <div className="max-w-full rounded-sm shadow">
          {/* Reaction count summary */}
          <div className="flex justify-between items-center px-4 py-2 border-b border-[#2A373E]">
            <div className="flex items-center">
              {totalReactions > 0 && (
                <div className="flex items-center">
                  <span className="ml-2 text-sm font-medium text-emerald-300/80">
                    {reactionSummary || totalReactions}
                  </span>
                </div>
              )}
              {totalReactions <= 0 && (
                <div className="flex items-center">
                  <span className="ml-2 text-sm font-medium text-white">
                    0 reactions
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center text-[#6c7a80] text-sm">
              {post.commentCount > 0 ? (
                <span>{post.commentCount} comments</span>
              ) : (
                <span>0 comments</span>
              )}
            </div>
          </div>

          {/* Post actions bar */}
          <div className="flex items-center px-2 py-1 justify-evenly">
            {/* Like button */}
            <Button
              sx={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                py: 1,
                px: 2,
                flex: 1,
                color: '#6c7a80',
                transition: 'background-color 0.3s, color 0.3s',
                '&:hover': {
                  backgroundColor: '#1a2b33',
                  '& .MuiSvgIcon-root, & span': {
                    color: '#289297',
                  },
                },
                textTransform: 'none',
              }}
              onClick={() => setShowReactionsForPost(!showReactionsForPost)}
            >
              <span className="mr-2">
                {userReaction ? (
                  <span className="text-xl">
                    {
                      islamicReactions.find((r) => r.type === userReaction)
                        ?.emoji
                    }
                  </span>
                ) : (
                  <AiOutlineLike className="text-xl" />
                )}
              </span>
              <span className="font-medium">
                {userReaction
                  ? islamicReactions.find((r) => r.type === userReaction)?.label
                  : 'Like'}
              </span>

              {/* Reactions popup */}
              {showReactionsForPost && (
                <div
                  onMouseLeave={() => setShowReactionsForPost(false)}
                  className="absolute bottom-full left-0 mb-2 backdrop-blur-sm bg-[#1F2A30]/70 px-1 rounded-full shadow-lg border border-[#2A373E] flex gap-1 sm:gap-2 z-50 animate-fast-fade"
                >
                  {islamicReactions.map((reaction) => (
                    <span
                      key={reaction.type}
                      onClick={() => handleReaction(post.id, reaction.type)}
                      onMouseEnter={() => setHoveredReaction(reaction.type)}
                      onMouseLeave={() => setHoveredReaction(null)}
                      className="p-1 sm:p-1.5 rounded-full relative group transition-transform"
                    >
                      <span className="block text-xl transition-all duration-100 transform cursor-pointer sm:text-2xl hover:scale-150">
                        {reaction.emoji}
                      </span>
                      {hoveredReaction === reaction.type && (
                        <span className="absolute hidden px-2 py-1 text-xs text-white transition-opacity -translate-x-1/2 bg-black rounded opacity-100 -top-8 left-1/2 sm:block whitespace-nowrap">
                          {reaction.label}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              )}
            </Button>

            {/* Comment button */}
            <Button
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                py: 1,
                px: 2,
                flex: 1,
                color: '#6c7a80',
                transition: 'background-color 0.3s, color 0.3s',
                '&:hover': {
                  backgroundColor: '#1a2b33',
                  '& .MuiSvgIcon-root, & span': {
                    color: '#289297',
                  },
                },
                textTransform: 'none',
              }}
              onClick={() => setSelectedPostForComments(post)}
            >
              <ChatBubbleOutlineIcon
                sx={{
                  fontSize: {
                    xs: '20px',
                    sm: '24px',
                  },
                  marginRight: '8px',
                  transition: 'color 0.3s',
                }}
              />
              <span className="font-medium group-hover:text-[#289297] transition-colors">
                Comment
              </span>
            </Button>

            {/* Share button - using MUI Menu */}
            <div className="relative flex-1">
              <Button
                fullWidth
                onClick={handleShareClick}
                startIcon={<ShareIcon />}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  py: 1,
                  px: 2,
                  borderRadius: '8px',
                  color: '#6c7a80',
                  transition: 'background-color 0.3s, color 0.3s',
                  '&:hover': {
                    backgroundColor: '#1a2b33',
                    '& .MuiSvgIcon-root, & span': {
                      color: '#289297',
                    },
                  },
                  textTransform: 'none',
                }}
              >
                <span style={{ fontWeight: 500, marginLeft: 8 }}>Share</span>
              </Button>

              <Menu
                anchorEl={shareAnchorEl}
                open={openShareMenu}
                onClose={handleShareClose}
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
                    fontFamily: 'inherit',
                    bgcolor: '#1F2A30',
                    color: 'white',
                    border: '1px solid #2A373E',
                    borderRadius: '3px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    '& .MuiMenuItem-root:hover': {
                      bgcolor: '#2A373E',
                    },
                    mt: 1,
                  },
                }}
              >
                <MenuItem onClick={handleCopyLink}>
                  <ListItemIcon>
                    <LinkIcon sx={{ color: '#d1d5db' }} fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Copy link</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleTwitterShare}>
                  <ListItemIcon>
                    <TwitterIcon sx={{ color: '#d1d5db' }} fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Twitter</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleFacebookShare}>
                  <ListItemIcon>
                    <FacebookIcon sx={{ color: '#d1d5db' }} fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Facebook</ListItemText>
                </MenuItem>
              </Menu>
            </div>

            {/* More options button - using MUI Menu */}
            <Tooltip title="More options">
              <IconButton
                onClick={handleMoreClick}
                sx={{
                  color: '#6c7a80',
                  '&:hover': {
                    color: '#289297',
                    bgcolor: '#1a2b33',
                  },
                  '@media (min-width: 640px)': {
                    transform: 'rotate(0)',
                  },
                  transform: 'rotate(90deg)',
                }}
              >
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={moreAnchorEl}
              open={openMoreMenu}
              onClose={handleMoreClose}
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
                  color: 'white',
                  border: '1px solid #2A373E',
                  borderRadius: '3px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  '& .MuiMenuItem-root:hover': {
                    bgcolor: '#2A373E',
                  },
                  mt: 1,
                },
              }}
            >
              <MenuItem onClick={handleSave}>
                <ListItemIcon>
                  <BookmarkBorderIcon
                    sx={{ color: '#d1d5db' }}
                    fontSize="small"
                  />
                </ListItemIcon>
                <ListItemText>Save</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleReport}>
                <ListItemIcon>
                  <BugReportIcon sx={{ color: '#d1d5db' }} fontSize="small" />
                </ListItemIcon>
                <ListItemText>Report</ListItemText>
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  postReactions: PropTypes.array.isRequired,
  islamicReactions: PropTypes.array.isRequired,
  handleReaction: PropTypes.func.isRequired,
  handlePollVote: PropTypes.func.isRequired,
  selectedOptions: PropTypes.object.isRequired,
  setSelectedPostForComments: PropTypes.func.isRequired,
};

export default PostCard;
