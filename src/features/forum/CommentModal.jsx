import CloseIcon from '@mui/icons-material/Close';
import {
  alpha,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Dialog,
  Divider,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  MessageCircle as Comment,
  Edit as EditIcon,
  ChevronUp as ExpandLessIcon,
  ChevronDown as ExpandMoreIcon,
  Filter as FilterIcon,
  CornerDownRight as ReplyIcon,
  Search as SearchIcon,
  SendIcon,
  Share2 as Share,
  ArrowDownUp as SortIcon,
  ThumbsUp,
  Clock as TimeIcon,
} from 'lucide-react';

import { Close } from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getFontClass } from '../../utils/languageDetector';

// Theme constants
const THEME = {
  primary: {
    main: '#289297',
    light: '#38A3A8',
    dark: '#1A7276',
  },

  background: {
    default: '#1F2A30',
    paper: '#172328',
    input: '#1F2A30',
    hover: 'rgba(255, 255, 255, 0.08)',
  },

  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    disabled: 'rgba(255, 255, 255, 0.5)',
  },

  divider: 'rgba(255, 255, 255, 0.12)',

  action: {
    active: '#289297',
    hover: 'rgba(40, 146, 151, 0.08)',
  },
};

const CommentModal = ({
  post,
  onClose,
  handleReaction,
  islamicReactions,
  currentUser,
  handleCommentReaction,
  handleAddComment,
  postReactions,
  loading = false,
}) => {
  const commentInputRef = useRef(null);
  const commentSectionRef = useRef(null);
  const [expandedComments, setExpandedComments] = useState(new Set());
  const [sortOrder, setSortOrder] = useState('most_relevant');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [showMoreText, setShowMoreText] = useState({});
  const [replyTo, setReplyTo] = useState(null);
  const [replyToInternal, setReplyToInternal] = useState(null);
  const [focusComment, setFocusComment] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  // const [showReactionsForPost, setShowReactionsForPost] = useState(false);
  // const [hoveredReaction, setHoveredReaction] = useState(null);
  // Initialize and sync comments with post prop
  const [comments, setComments] = useState({});

  // Initialize comments only once when modal opens
  useEffect(() => {
    const commentsMap = {};
    post.comments?.forEach((comment) => {
      commentsMap[comment.id] = {
        ...comment,
        replies: comment.replies || [],
        isEditing: false,
      };
    });
    setComments(commentsMap);
  }, [post.id, post.comments]); // Only re-run if post ID changes

  // Comment reactions array
  const commentReactions = [
    { type: 'like', emoji: '👍', label: 'Like' },
    { type: 'love', emoji: '❤️', label: 'Love' },
  ];

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All comments' },
    { value: 'mine', label: 'My comments' },
    { value: 'unread', label: 'Unread' },
  ];

  // Function to handle showing more text
  const handleShowMoreText = (postId) => {
    setShowMoreText((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  // Function to get reply username
  const getReplyUsername = useCallback(() => {
    if (!replyTo || !comments[replyTo]) return '';
    return comments[replyTo].author || 'user';
  }, [replyTo, comments]);

  // Set reply to both local and parent state
  const handleSetReplyTo = useCallback((commentId) => {
    setReplyToInternal(commentId);
    setReplyTo(commentId);
    // Focus on comment input after setting reply
    setTimeout(() => {
      if (commentInputRef.current) {
        commentInputRef.current.focus();
      }
    }, 100);
  }, []);

  // Clear reply when submitting or canceling
  const clearReply = useCallback(() => {
    setReplyTo(null);
    setReplyToInternal(null);
  }, []);

  // Handle focusing on a comment
  const handleFocusComment = useCallback((commentId) => {
    setFocusComment(commentId);
    // Scroll to comment if needed
  }, []);

  // Format relative time with better UX
  const formatRelativeTime = useCallback((date) => {
    const formatted = formatDistanceToNow(new Date(date), { addSuffix: true });
    // Replace "about" and other verbose parts for cleaner display
    return formatted
      .replace('about ', '')
      .replace('less than a minute ago', 'just now');
  }, []);

  // Get user initials for avatar with fallback
  const getUserInitial = useCallback((username, userId) => {
    if (!username && !userId) return '?';
    return username
      ? username.charAt(0).toUpperCase()
      : userId?.charAt(0).toUpperCase();
  }, []);

  // Sort options
  const sortOptions = [
    { value: 'most_relevant', label: 'Most relevant' },
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'most_reactions', label: 'Top reactions' },
  ];

  // Get sorted and filtered comments
  const getSortedComments = useCallback(() => {
    if (!post || !post.comments) return [];

    const filtered = Object.values(comments).filter((comment) => {
      const matchesSearch = comment.text
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Apply filter type
      if (filterType === 'mine') {
        return matchesSearch && comment.authorId === currentUser.id;
      }

      return matchesSearch;
    });

    switch (sortOrder) {
      case 'newest':
        return filtered.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
      case 'oldest':
        return filtered.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
        );
      case 'most_reactions':
        return filtered.sort((a, b) => {
          const aTotal = Object.values(a.reactions || {}).reduce(
            (sum, val) => sum + val,
            0
          );
          const bTotal = Object.values(b.reactions || {}).reduce(
            (sum, val) => sum + val,
            0
          );
          return bTotal - aTotal;
        });
      default:
        return filtered;
    }
  }, [comments, searchTerm, sortOrder, filterType, currentUser.id, post]);

  // Memoized sorted comments for performance
  const sortedComments = useMemo(
    () => getSortedComments(),
    [getSortedComments]
  );

  // Handle save edit with error handling
  const handleSaveEdit = useCallback(
    (commentId) => {
      if (!newComment.trim()) return;

      setComments((prev) => ({
        ...prev,
        [commentId]: {
          ...prev[commentId],
          text: newComment,
          edited: true,
          isEditing: false,
        },
      }));
      setNewComment('');
    },
    [newComment]
  );

  // Toggle expand/collapse comment thread
  const toggleExpandComment = useCallback((commentId) => {
    setExpandedComments((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(commentId)) {
        newExpanded.delete(commentId);
      } else {
        newExpanded.add(commentId);
      }
      return newExpanded;
    });
  }, []);

  // Handle search term changes
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Clear search input
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  // Handle sort menu
  const handleSortMenuOpen = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortMenuClose = () => {
    setSortAnchorEl(null);
  };

  const handleSortSelect = (value) => {
    setSortOrder(value);
    handleSortMenuClose();
  };

  // Handle filter menu
  const handleFilterMenuOpen = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterMenuClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (value) => {
    setFilterType(value);
    handleFilterMenuClose();
  };

  // Handle comment submission with loading state
  const handleCommentSubmit = useCallback(async () => {
    if (!newComment.trim() || submitting) return;

    try {
      setSubmitting(true);
      await handleAddComment(newComment, replyTo);
      setNewComment('');
      clearReply();
      if (commentInputRef.current) {
        commentInputRef.current.focus();
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      // Could show an error toast here
    } finally {
      setSubmitting(false);
    }
  }, [handleAddComment, newComment, replyTo, submitting, clearReply]);

  // Handle keyboard shortcut for comment submission
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleCommentSubmit();
      } else if (e.key === 'Escape' && replyTo) {
        clearReply();
      }
    },
    [handleCommentSubmit, replyTo, clearReply]
  );

  // Function to render a comment with proper styling
  const renderComment = useCallback(
    (comment, depth = 0) => {
      if (!comment) return null;

      const hasReplies = comment.replies?.length > 0;
      const isExpanded = expandedComments.has(comment.id);
      const isEdited = comment.edited;
      const isMine = comment.authorId === currentUser.id;

      // Calculate left padding based on depth
      const leftPadding = depth * 1;

      return (
        <Box
          key={comment.id}
          id={`comment-${comment.id}`}
          sx={{
            position: 'relative',
            pl: leftPadding,
            mt: 2,
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 2,
              backgroundColor: THEME.background.paper,
              borderRadius: 2,
              border:
                focusComment === comment.id
                  ? `1px solid ${THEME.primary.main}`
                  : 'none',
              transition: 'all 0.2s ease',
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  background: isMine
                    ? `linear-gradient(135deg, ${THEME.primary.main}, ${THEME.primary.dark})`
                    : 'linear-gradient(135deg, #e0e0e0, #757575)',
                  color: 'white',
                  fontSize: '0.875rem',
                  fontWeight: 'bold',
                }}
              >
                {getUserInitial(comment.author, comment.authorId)}
              </Avatar>

              <Box sx={{ flexGrow: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    color={THEME.text.primary}
                    fontWeight="bold"
                  >
                    {comment.author}
                  </Typography>

                  <Tooltip title={new Date(comment.timestamp).toLocaleString()}>
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
                    >
                      <TimeIcon size={12} color={THEME.text.secondary} />
                      <Typography
                        variant="caption"
                        color={THEME.text.secondary}
                      >
                        {formatRelativeTime(new Date(comment.timestamp))}
                      </Typography>
                    </Box>
                  </Tooltip>

                  {isEdited && (
                    <Typography
                      variant="caption"
                      color={THEME.text.secondary}
                      sx={{ fontStyle: 'italic' }}
                    >
                      edited
                    </Typography>
                  )}
                </Box>

                <Box sx={{ position: 'relative', mb: 1 }}>
                  <Typography
                    variant="body2"
                    color={THEME.text.primary}
                    sx={{
                      whiteSpace: 'pre-line',
                      wordBreak: 'break-word',
                    }}
                  >
                    {comment.text}
                  </Typography>

                  {isMine && (
                    <Box
                      className="comment-actions"
                      sx={{
                        position: 'absolute',
                        right: 0,
                        top: 0,
                        opacity: 0,
                        transition: 'opacity 0.2s',
                        display: 'flex',
                        gap: 0.5,
                        '&:hover': {
                          opacity: 1,
                        },
                        [`${Paper}:hover &`]: {
                          opacity: 0.5,
                        },
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => {
                          setComments((prev) => ({
                            ...prev,
                            [comment.id]: {
                              ...prev[comment.id],
                              isEditing: !prev[comment.id].isEditing,
                            },
                          }));
                          setNewComment(comment.text);
                        }}
                        sx={{
                          p: 0.5,
                          color: THEME.primary.main,
                          '&:hover': {
                            color: THEME.primary.light,
                            bgcolor: alpha(THEME.primary.main, 0.1),
                          },
                        }}
                      >
                        <EditIcon size={16} />
                      </IconButton>
                    </Box>
                  )}
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    flexWrap: 'wrap',
                  }}
                >
                  {commentReactions.map((reaction) => (
                    <Button
                      key={reaction.type}
                      onClick={() =>
                        handleCommentReaction(
                          post.id,
                          comment.id,
                          reaction.type
                        )
                      }
                      aria-label={reaction.label}
                      variant="text"
                      size="small"
                      sx={{
                        minWidth: 0,
                        px: 1,
                        py: 0.5,
                        borderRadius: 4,
                        color:
                          comment.userReaction === reaction.type
                            ? THEME.primary.main
                            : THEME.text.secondary,
                        gap: '5px',
                        '&:hover': {
                          bgcolor: alpha(THEME.primary.main, 0.1),
                        },
                      }}
                    >
                      <ThumbsUp size={16} />
                      {reaction.emoji}{' '}
                      {comment.reactions?.[reaction.type]?.count || 0}
                    </Button>
                  ))}

                  <Button
                    onClick={() => handleSetReplyTo(comment.id)}
                    variant="text"
                    size="small"
                    startIcon={<ReplyIcon size={16} />}
                    sx={{
                      color: THEME.text.secondary,
                      '&:hover': { color: THEME.primary.main },
                    }}
                  >
                    Reply
                  </Button>

                  {depth < 5 && hasReplies && (
                    <Button
                      onClick={() => toggleExpandComment(comment.id)}
                      variant="text"
                      size="small"
                      endIcon={
                        isExpanded ? (
                          <ExpandLessIcon size={16} />
                        ) : (
                          <ExpandMoreIcon size={16} />
                        )
                      }
                      sx={{
                        color: THEME.text.secondary,
                        '&:hover': { color: THEME.primary.main },
                      }}
                    >
                      {isExpanded
                        ? 'Collapse'
                        : `View ${
                            comment.replyCount || comment.replies.length
                          } ${comment.replyCount === 1 ? 'reply' : 'replies'}`}
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>

            {comment.isEditing && (
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <TextField
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  size="small"
                  fullWidth
                  multiline
                  maxRows={4}
                  variant="outlined"
                  sx={{
                    bgcolor: THEME.background.input,
                    '& .MuiOutlinedInput-root': {
                      color: THEME.text.primary,
                      '& fieldset': {
                        borderColor: THEME.divider,
                      },
                      '&:hover fieldset': {
                        borderColor: alpha(THEME.primary.main, 0.5),
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: THEME.primary.main,
                      },
                    },
                  }}
                />
                <Button
                  onClick={() => handleSaveEdit(comment.id)}
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{
                    bgcolor: THEME.primary.main,
                    '&:hover': {
                      bgcolor: THEME.primary.dark,
                    },
                  }}
                >
                  Save
                </Button>
                <Button
                  onClick={() =>
                    setComments((prev) => ({
                      ...prev,
                      [comment.id]: { ...prev[comment.id], isEditing: false },
                    }))
                  }
                  variant="outlined"
                  size="small"
                  sx={{
                    borderColor: THEME.divider,
                    color: THEME.text.primary,
                    '&:hover': {
                      borderColor: THEME.text.secondary,
                    },
                  }}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Paper>

          {hasReplies && (
            <Collapse in={isExpanded}>
              <Box
                sx={{
                  ml: 5,
                  mt: 1,
                  position: 'relative',
                  borderLeft: isExpanded ? '2px solid' : 'none',
                  borderColor: THEME.divider,
                  pl: 2,
                }}
              >
                {comment.replies.map((reply) =>
                  renderComment(reply, depth + 1)
                )}
              </Box>
            </Collapse>
          )}
        </Box>
      );
    },
    [
      expandedComments,
      focusComment,
      currentUser.id,
      getUserInitial,
      formatRelativeTime,
      handleSetReplyTo,
      toggleExpandComment,
      handleCommentReaction,
      handleSaveEdit,
      newComment,
    ]
  );

  // CommentsList component implementation
  const CommentsList = useCallback(
    ({ comments }) => {
      if (!comments || comments.length === 0) {
        return (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: 4,
            }}
          >
            <Comment size={40} color={THEME.text.disabled} />
            <Typography
              variant="body1"
              color={THEME.text.secondary}
              sx={{ mt: 2 }}
            >
              No comments yet
            </Typography>
            <Typography variant="body2" color={THEME.text.disabled}>
              Be the first to comment
            </Typography>
          </Box>
        );
      }

      return (
        <Box ref={commentSectionRef} sx={{ p: 2 }}>
          {comments.map((comment) => renderComment(comment))}
        </Box>
      );
    },
    [renderComment]
  );

  // Calculate post reaction statistics
  const postReaction = postReactions.find((pr) => pr.id === post.id) || {
    reactions: {},
    userReaction: null,
  };

  const reactionCounts = postReaction.reactions || {};
  const totalReactions = Object.values(reactionCounts).reduce(
    (sum, reaction) => sum + (reaction.count || 0),
    0
  );

  const reactionSummary = Object.entries(reactionCounts)
    .filter(([, data]) => data.count > 0)
    .map(([type, data]) => {
      const reactionConfig = islamicReactions?.find((r) => r.type === type);
      return `${reactionConfig?.emoji || '❓'} ${data.count}`;
    });

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: THEME.background.default,
          color: THEME.text.primary,
          maxHeight: '95vh',
          display: 'flex',
          flexDirection: 'column',
          height: '95vh',
          borderRadius: 2,
        },
      }}
    >
      {/* Header - Fixed at top */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          bgcolor: THEME.background.default,
          borderBottom: `1px solid ${THEME.divider}`,
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            flex: 1,
            textAlign: 'center',
          }}
        >
          {post.author}&apos;s Post
        </Typography>

        <IconButton
          onClick={onClose}
          sx={{
            width: 20,
            height: 20,
            p: 2,
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
            bgcolor: 'rgba(255, 255, 255, 0.08)',
            transform: 'rotate(0deg)', // default rotation
            transition: 'transform 0.2s ease', // animate between states
            '&:hover': {
              bgcolor: '#060605',
              transform: 'rotate(90deg) scale(1.1)',
            },
          }}
        >
          <CloseIcon sx={{ fontSize: 18 }} />
        </IconButton>
      </Box>

      {/* Loading indicator */}
      {loading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <CircularProgress size={40} sx={{ color: THEME.primary.main }} />
          <Typography variant="body2" color={THEME.text.primary}>
            Loading content...
          </Typography>
        </Box>
      )}

      {/* Main content area - Scrollable */}
      <Box
        sx={{
          flex: '1 1 auto', // Change to this
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          opacity: loading ? 0.5 : 1,
          transition: 'opacity 0.2s',
          position: 'relative', // Add this line
        }}
      >
        {/* Post content section */}
        <Box
          sx={{
            p: 2,
            borderBottom: `1px solid ${THEME.divider}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Avatar
              sx={{
                bgcolor: THEME.background.paper,
                width: 48,
                height: 48,
                border: `2px solid ${THEME.primary.main}`,
              }}
            >
              {getUserInitial(post.author)}
            </Avatar>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                {post.author}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <TimeIcon size={12} color={THEME.text.secondary} />
                <Typography variant="caption" color={THEME.text.secondary}>
                  {formatRelativeTime(new Date(post.createdAt))}
                </Typography>
              </Box>
            </Box>
          </Box>

          {post.title && (
            <div
              className={getFontClass(post.title)}
              style={{
                fontWeight: 'bold',
                marginBottom: '12px',
                fontSize: '1.25rem',
                color: THEME.text.primary,
              }}
            >
              {post.title}
            </div>
          )}

          {post.text && (
            <div
              className={getFontClass(post.text)}
              style={{
                color: THEME.text.secondary,
                marginBottom: '16px',
                whiteSpace: 'pre-line',
                fontSize: '1rem',
                wordBreak: 'break-word',
              }}
            >
              {post.text.length > 300 && !showMoreText[post.id]
                ? `${post.text.substring(0, 300)}...`
                : post.text}

              {post.text.length > 300 && (
                <button
                  onClick={() => handleShowMoreText(post.id)}
                  style={{
                    color: THEME.primary.main,
                    textTransform: 'none',
                    marginLeft: '8px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  {showMoreText[post.id] ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>
          )}

          {post.image && (
            <Box
              component="img"
              src={post.image}
              alt="Post content"
              sx={{
                maxHeight: 380,
                width: '100%',
                objectFit: 'contain',
                bgcolor: THEME.background.paper,
                borderRadius: 1,
              }}
            />
          )}

          {post.video && (
            <Box
              component="video"
              controls
              src={post.video}
              sx={{
                maxHeight: 380,
                width: '100%',
                objectFit: 'contain',
                bgcolor: THEME.background.paper,
                borderRadius: 1,
                mt: 2,
              }}
            />
          )}
        </Box>

        {/* Engagement stats */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${THEME.divider}`,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {totalReactions > 0 ? (
              <Typography variant="body2" color={THEME.primary.light}>
                {reactionSummary.join(' · ')}
              </Typography>
            ) : (
              <Typography variant="body2" color={THEME.text.secondary}>
                0 reactions
              </Typography>
            )}
          </Box>

          <Typography variant="body2" color={THEME.text.secondary}>
            {post.commentCount || Object.keys(comments).length}{' '}
            {post.commentCount === 1 ? 'Comment' : 'Comments'}
          </Typography>
        </Box>

        {/* Action buttons */}
        <Box
          sx={{
            display: 'flex',
            borderBottom: `1px solid ${THEME.divider}`,
          }}
        >
          <Button
            startIcon={<ThumbsUp size={18} />}
            onClick={() => handleReaction(post.id, 'like')}
            sx={{
              flex: 1,
              color:
                postReaction.userReaction === 'like'
                  ? THEME.primary.main
                  : THEME.text.primary,
              borderRadius: 0,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': { bgcolor: THEME.background.hover },
            }}
          >
            {postReaction.userReaction === 'like' ? 'Liked' : 'Like'}
          </Button>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ bgcolor: THEME.divider }}
          />
          <Button
            startIcon={<Comment size={18} />}
            onClick={() => {
              handleFocusComment(post.id);
              commentInputRef.current?.focus();
            }}
            sx={{
              flex: 1,
              color: THEME.text.primary,
              borderRadius: 0,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': { bgcolor: THEME.background.hover },
            }}
          >
            Comment
          </Button>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ bgcolor: THEME.divider }}
          />
          <Button
            startIcon={<Share size={18} />}
            sx={{
              flex: 1,
              color: THEME.text.primary,
              borderRadius: 0,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': { bgcolor: THEME.background.hover },
            }}
          >
            Share
          </Button>
        </Box>

        {/* Filter and search bar */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${THEME.divider}`,
            gap: 2,
          }}
        >
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              onClick={handleSortMenuOpen}
              startIcon={<SortIcon size={16} />}
              endIcon={<ExpandMoreIcon size={16} />}
              variant="outlined"
              size="small"
              aria-haspopup="true"
              aria-expanded={Boolean(sortAnchorEl)}
              aria-controls="sort-menu"
              sx={{
                borderColor: THEME.divider,
                color: THEME.text.primary,
                textTransform: 'none',
                '&:hover': {
                  borderColor: THEME.primary.main,
                  bgcolor: alpha(THEME.primary.main, 0.08),
                },
              }}
            >
              {sortOptions.find((option) => option.value === sortOrder)
                ?.label || 'Sort'}
            </Button>
            <Menu
              id="sort-menu"
              anchorEl={sortAnchorEl}
              keepMounted
              open={Boolean(sortAnchorEl)}
              onClose={handleSortMenuClose}
              PaperProps={{
                sx: {
                  bgcolor: THEME.background.paper,
                  color: THEME.text.primary,
                  borderRadius: 1,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                },
              }}
            >
              {sortOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={() => handleSortSelect(option.value)}
                  selected={sortOrder === option.value}
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: alpha(THEME.primary.main, 0.1),
                      '&:hover': {
                        bgcolor: alpha(THEME.primary.main, 0.2),
                      },
                    },
                    '&:hover': {
                      bgcolor: THEME.background.hover,
                    },
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>

            <Button
              onClick={handleFilterMenuOpen}
              startIcon={<FilterIcon size={16} />}
              endIcon={<ExpandMoreIcon size={16} />}
              variant="outlined"
              size="small"
              aria-haspopup="true"
              aria-expanded={Boolean(filterAnchorEl)}
              aria-controls="filter-menu"
              sx={{
                display: { xs: 'none', sm: 'inline-flex' }, // Hide on xs, show on sm and up
                borderColor: THEME.divider,
                color: THEME.text.primary,
                textTransform: 'none',
                '&:hover': {
                  borderColor: THEME.primary.main,
                  bgcolor: alpha(THEME.primary.main, 0.08),
                },
              }}
            >
              {filterOptions.find((option) => option.value === filterType)
                ?.label || 'Filter'}
            </Button>
            <Menu
              id="filter-menu"
              anchorEl={filterAnchorEl}
              keepMounted
              open={Boolean(filterAnchorEl)}
              onClose={handleFilterMenuClose}
              PaperProps={{
                sx: {
                  bgcolor: THEME.background.paper,
                  color: THEME.text.primary,
                  borderRadius: 1,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                },
              }}
            >
              {filterOptions.map((option) => (
                <MenuItem
                  key={option.value}
                  onClick={() => handleFilterSelect(option.value)}
                  selected={filterType === option.value}
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: alpha(THEME.primary.main, 0.1),
                      '&:hover': {
                        bgcolor: alpha(THEME.primary.main, 0.2),
                      },
                    },
                    '&:hover': {
                      bgcolor: THEME.background.hover,
                    },
                  }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <TextField
            placeholder="Search comments..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearchChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon size={18} color={THEME.text.disabled} />
                </InputAdornment>
              ),
              endAdornment: searchTerm ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                    size="small"
                    edge="end"
                    sx={{ color: THEME.text.disabled }}
                  >
                    <Close size={16} />
                  </IconButton>
                </InputAdornment>
              ) : null,
              sx: {
                bgcolor: THEME.background.input,
                borderRadius: 1,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: THEME.divider,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: alpha(THEME.primary.main, 0.5),
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: THEME.primary.main,
                },
                color: THEME.text.primary,
              },
            }}
            sx={{
              flex: {
                xs: '1 1 100%',
                sm: '1 1 auto',
              },
              mt: {
                xs: 1,
                sm: 0,
              },
              maxWidth: {
                xs: '100%',
                sm: '300px',
              },
            }}
          />
        </Box>

        {/* Comments list section */}
        <CommentsList comments={sortedComments} />

        {/* New comment input - Fixed at bottom */}
        <Box
          sx={{
            p: 2,
            borderTop: `1px solid ${THEME.divider}`,
            bgcolor: THEME.background.default,
            position: 'sticky',
            bottom: 0,
            zIndex: 10,
            width: '100%', // Add this line
            marginTop: 'auto', // Add this line to push it to the bottom
          }}
        >
          {replyToInternal && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 1,
                mb: 1,
                bgcolor: alpha(THEME.primary.main, 0.05),
                borderRadius: 1,
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontStyle: 'italic', color: THEME.text.secondary }}
              >
                Replying to <strong>{getReplyUsername()}</strong>
              </Typography>
              <IconButton
                size="small"
                onClick={clearReply}
                aria-label="Cancel reply"
                sx={{
                  p: 0.5,
                  color: THEME.text.secondary,
                  '&:hover': { color: THEME.text.primary },
                }}
              >
                <Close size={14} />
              </IconButton>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Avatar
              sx={{
                width: 36,
                height: 36,
                background: `linear-gradient(135deg, ${THEME.primary.main}, ${THEME.primary.dark})`,
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 'bold',
              }}
            >
              {getUserInitial(currentUser.username, currentUser.id)}
            </Avatar>

            <TextField
              inputRef={commentInputRef}
              placeholder={
                replyToInternal ? 'Write a reply...' : 'Write a comment...'
              }
              fullWidth
              multiline
              rows={isComposing ? 3 : 1}
              onFocus={() => setIsComposing(true)}
              // Don't blur immediately when clicking outside to allow interactions with buttons
              onBlur={() => setTimeout(() => setIsComposing(false), 200)}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyDown}
              variant="outlined"
              InputProps={{
                sx: {
                  bgcolor: THEME.background.input,
                  color: THEME.text.primary,
                  p: 1,
                  borderRadius: 2,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: THEME.divider,
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: alpha(THEME.primary.main, 0.5),
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: THEME.primary.main,
                  },
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip placement="top" title="Press Enter to send">
                      <IconButton
                        onClick={handleCommentSubmit}
                        disabled={!newComment.trim() || submitting}
                        sx={{
                          color: newComment.trim()
                            ? THEME.primary.main
                            : THEME.text.disabled,
                          '&:hover': {
                            bgcolor: alpha(THEME.primary.main, 0.1),
                          },
                          transition: 'color 0.2s',
                        }}
                      >
                        {submitting ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <SendIcon size={20} />
                        )}
                      </IconButton>
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CommentModal;
