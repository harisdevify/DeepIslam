import React, { useCallback, useEffect, useRef, useState } from 'react';
import CommentModal from '../features/forum/CommentModal';
import CreatePostModal from '../features/forum/CreatePostModal.JSX';
import ForumHeader from '../features/forum/ForumHeader';
import ForumSidebar from '../features/forum/ForumSidebar';
import MobileNavigation from '../features/forum/MobileNavigation';
import PopularTopicsTabs from '../features/forum/PopularTopicsTabs';
import PostCard from '../features/forum/PostCard';
import SearchBar from '../features/forum/SearchBar';
import UserProfile from '../features/forum/UserProfile';

const Forum = () => {
  // <=!== State management ==!=>
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem('redditPosts');
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const [postReactions, setPostReactions] = useState(() => {
    const savedReactions = localStorage.getItem('postReactions');
    return savedReactions
      ? JSON.parse(savedReactions)
      : posts.map((post) => ({
          id: post.id,
          reactions: {},
          userReaction: null,
        }));
  });
  const [sortOption, setSortOption] = useState('new');
  const [activeSubreddit, setActiveSubreddit] = useState('All');
  const [currentUser] = useState({ username: 'demo_user', id: 'user1' });
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [selectedPostForComments, setSelectedPostForComments] = useState(null);

  const [selectedOptions, setSelectedOptions] = useState({});

  // <=!=UI states==!=>
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);
  const [, setShowCreateCommunity] = useState(false);

  // <=!=Refs==!=>
  const mainContentRef = useRef(null);

  // <=!=Effects==!=>

  useEffect(() => {
    localStorage.setItem('postReactions', JSON.stringify(postReactions));
  }, [postReactions]);

  useEffect(() => {
    localStorage.setItem('redditPosts', JSON.stringify(posts));
    let filtered = [...posts];

    if (activeSubreddit !== 'All') {
      filtered = filtered.filter((post) => post.subreddit === activeSubreddit);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          (post.text && post.text.toLowerCase().includes(query))
      );
    }

    setFilteredPosts(sortPosts(filtered, sortOption));
  }, [posts, searchQuery, activeSubreddit, sortOption]);

  const handlePollVote = (postId, option) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId || !post.poll) return post;

        const newVotes = { ...post.poll.votes };
        const prevOption = selectedOptions[postId];

        // Remove previous vote if exists
        if (prevOption) {
          newVotes[prevOption] = Math.max((newVotes[prevOption] || 0) - 1, 0);
        }

        // Add new vote if different from previous
        if (!prevOption || prevOption !== option) {
          newVotes[option] = (newVotes[option] || 0) + 1;
        }

        return {
          ...post,
          poll: {
            ...post.poll,
            votes: newVotes,
          },
        };
      })
    );

    setSelectedOptions((prev) => ({
      ...prev,
      [postId]: prev[postId] === option ? null : option,
    }));
  };

  const handleReaction = (postId, reactionType) => {
    setPostReactions((prev) =>
      prev.map((pr) => {
        if (pr.id !== postId) return pr;

        const currentReaction = pr.userReaction;
        const userId = currentUser.id;
        const newReactions = { ...pr.reactions };

        // Remove previous reaction if it exists
        if (currentReaction) {
          newReactions[currentReaction] = {
            count: Math.max((newReactions[currentReaction]?.count || 1) - 1, 0),
            users: (newReactions[currentReaction]?.users || []).filter(
              (id) => id !== userId
            ),
          };
        }

        // Add new reaction if different from current or no current reaction
        if (currentReaction !== reactionType) {
          newReactions[reactionType] = {
            count: (newReactions[reactionType]?.count || 0) + 1,
            users: [...(newReactions[reactionType]?.users || []), userId],
          };
        }

        return {
          ...pr,
          reactions: newReactions,
          userReaction: currentReaction === reactionType ? null : reactionType,
        };
      })
    );
  };

  const handleAddComment = (postId, commentText, parentCommentId = null) => {
    const newComment = {
      id: Date.now(),
      text: commentText,
      author: currentUser.username,
      authorId: currentUser.id,
      timestamp: new Date().toISOString(),
      replies: [],
      reactions: {},
      userReaction: null,
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;

        if (parentCommentId) {
          // Add reply to existing comment
          return {
            ...post,
            comments: post.comments.map((comment) => {
              if (comment.id !== parentCommentId) return comment;
              return {
                ...comment,
                replies: [...(comment.replies || []), newComment],
              };
            }),
          };
        }

        // Add new top-level comment
        return {
          ...post,
          comments: [...(post.comments || []), newComment],
          commentCount: (post.commentCount || 0) + 1,
        };
      })
    );
  };

  const handleCommentReaction = useCallback(
    (postId, commentId, reactionType) => {
      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id !== postId) return post;

          const updateCommentReactions = (comment) => {
            if (comment.id !== commentId) return comment;

            const currentReaction = comment.userReaction;
            const userId = currentUser.id;
            const newReactions = { ...comment.reactions };

            if (currentReaction) {
              newReactions[currentReaction] = {
                count: Math.max(
                  (newReactions[currentReaction]?.count || 1) - 1,
                  0
                ),
                users: (newReactions[currentReaction]?.users || []).filter(
                  (id) => id !== userId
                ),
              };
            }

            if (currentReaction !== reactionType) {
              newReactions[reactionType] = {
                count: (newReactions[reactionType]?.count || 0) + 1,
                users: [...(newReactions[reactionType]?.users || []), userId],
              };
            }

            return {
              ...comment,
              reactions: newReactions,
              userReaction:
                currentReaction === reactionType ? null : reactionType,
            };
          };

          const updatedComments = post.comments?.map((comment) => {
            if (comment.id === commentId) {
              return updateCommentReactions(comment);
            }

            if (comment.replies?.length) {
              return {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === commentId ? updateCommentReactions(reply) : reply
                ),
              };
            }

            return comment;
          });

          return {
            ...post,
            comments: updatedComments || [],
          };
        })
      );
    },
    [currentUser.id, setPosts]
  );

  const handleCreatePost = (postData) => {
    const newPost = {
      id: Date.now(),
      title: postData.title,
      author: currentUser.username,
      subreddit: postData.subreddit,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      comments: [],
      type: postData.type,
      text: postData.text || '',
      image: postData.image || null,
      link: postData.link || null,
      poll: postData.pollOptions
        ? {
            options: postData.pollOptions,
            votes: postData.pollOptions.reduce(
              (acc, option) => ({ ...acc, [option]: 0 }),
              {}
            ),
          }
        : null,
      userVote: '',
      timePosted: 'just now',
      commentCount: 0,
    };

    setPosts((prev) => [newPost, ...prev]);
    setPostReactions((prev) => [
      ...prev,
      { id: newPost.id, reactions: {}, userReaction: null },
    ]);
    setShowCreatePostModal(false);
  };

  // <=!=Helper functions==!=>
  const sortPosts = (postsToSort, option) => {
    const sorters = {
      new: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      top: (a, b) => b.upvotes - a.upvotes,
      controversial: (a, b) =>
        (b.comments?.length || 0) +
        (b.controversialScore || 0) -
        (a.comments?.length || 0) -
        (a.controversialScore || 0),
      rising: (a, b) => (b.upvoteRate || 0) - (a.upvoteRate || 0),
      hot: (a, b) =>
        b.upvotes +
        (b.comments?.length || 0) * 2 -
        a.upvotes -
        (a.comments?.length || 0) * 2,
    };
    return [...postsToSort].sort(sorters[option] || sorters.hot);
  };

  const toggleSidebar = () => setIsExpanded((prev) => !prev);

  // <=!=Data==!=>
  const islamicReactions = [
    { type: 'like', emoji: '👍', color: '#1877F2', label: 'Like' },
    { type: 'love', emoji: '❤️', color: '#FF0000', label: 'Love' },
    { type: 'happy', emoji: '😆', color: '#FFFF00', label: 'Happy' },
    { type: 'sad', emoji: '😢', color: '#4682B4', label: 'Sad' },
    { type: 'angry', emoji: '😡', color: '#FF4500', label: 'Angry' },
  ];

  const popularTopics = [
    { name: 'All' },
    { name: 'Quran' },
    { name: 'Hadith' },
    { name: 'Tafsir' },
    { name: 'Qiraat & Tajweed' },
    { name: 'Fiqh & Masail' },
    { name: 'Aqeedah' },
    { name: 'Atheism & Red-Ilhad' },
    { name: 'Islamic History' },
    { name: 'Top-Questions' },
    { name: 'New Muslims' },
    { name: 'Sisters Corner' },
    { name: 'Youth Talk' },
    { name: 'Duas & Adhkar' },
    { name: 'Ramadan Special' },
    { name: 'Islamic Books' },
    { name: 'Announcements' },
  ];

  const activeIndex = popularTopics.findIndex(
    (topic) => topic.name === activeSubreddit
  );

  const handleChange = (e, newValue) => {
    setActiveSubreddit(popularTopics[newValue].name);
  };

  // <=!========= Main Render =========!>
  return (
    <div className="min-h-screen bg-[#0C1416] text-white">
      <div className="flex pt-16">
        {/*<!-- Sidebar -->*/}
        <ForumSidebar
          popularTopics={popularTopics}
          setShowCreateCommunity={setShowCreateCommunity}
          isExpanded={isExpanded}
          toggleSidebar={toggleSidebar}
          activeSubreddit={activeSubreddit}
          setActiveSubreddit={setActiveSubreddit}
          currentUser={currentUser}
          setShowCreatePostModal={setShowCreatePostModal}
        />
        {/*<!-- Main Content -->*/}
        <main
          ref={mainContentRef}
          className="container w-full mx-auto my-10 lg:ml-17 lg:px-2 lg:max-w-5xl "
        >
          <div className="container mx-auto lg:px-3">
            <div className="mb-6">
              {/*<!-- Forum Header -->*/}
              <ForumHeader
                sortOption={sortOption}
                setSortOption={setSortOption}
                activeSubreddit={activeSubreddit}
                setShowCreatePostModal={setShowCreatePostModal}
              />

              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              <PopularTopicsTabs
                activeIndex={activeIndex}
                popularTopics={popularTopics}
                handleChange={handleChange}
              />
            </div>

            {/*<!-- Posts -->*/}
            <div className="space-y-4">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUser={currentUser}
                    postReactions={postReactions}
                    islamicReactions={islamicReactions}
                    handleReaction={handleReaction}
                    handlePollVote={handlePollVote}
                    selectedOptions={selectedOptions}
                    setSelectedPostForComments={setSelectedPostForComments}
                  />
                ))
              ) : (
                <div className="bg-[#0f1a1f] border border-[#1d2d35] rounded-xl p-8 text-center">
                  <h3 className="mb-2 text-xl font-medium text-gray-300">
                    No posts found
                  </h3>
                  <p className="mb-4 text-gray-500">
                    {searchQuery.trim()
                      ? 'Try a different search term'
                      : 'Be the first to post in this community'}
                  </p>
                  <button
                    onClick={() => setShowCreatePostModal(true)}
                    className="bg-[#2DA3AA] hover:bg-[#1d6d72] text-white px-6 py-2 rounded-full font-medium text-sm transition-all duration-200"
                  >
                    Create Post
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
        {/*<!-- Right Sidebar - User Profile Section -->*/}
        <UserProfile />
      </div>

      {/*<!-- Modals -->*/}
      {selectedPostForComments && (
        <CommentModal
          post={selectedPostForComments}
          currentUser={currentUser}
          onClose={() => setSelectedPostForComments(null)}
          postReactions={postReactions}
          handleReaction={handleReaction} // 👈 add this
          islamicReactions={islamicReactions} // 👈 add this
          handleAddComment={(commentText, parentId) =>
            handleAddComment(selectedPostForComments.id, commentText, parentId)
          }
          handleCommentReaction={handleCommentReaction}
        />
      )}

      {showCreatePostModal && (
        <CreatePostModal
          setShowCreatePostModal={setShowCreatePostModal}
          handleCreatePost={handleCreatePost}
          activeSubreddit={activeSubreddit}
          popularTopics={popularTopics}
        />
      )}

      {/*<!-- Mobile Navigation -->*/}
      <MobileNavigation />
    </div>
  );
};

export default Forum;
