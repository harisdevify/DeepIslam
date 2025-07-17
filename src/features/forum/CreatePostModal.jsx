import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import React, { useState } from 'react';

const CreatePostModal = ({
  setShowCreatePostModal,
  handleCreatePost,
  activeSubreddit,
  popularTopics,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedSubreddit, setSelectedSubreddit] = useState(
    activeSubreddit !== 'All' ? activeSubreddit : 'Quran'
  );
  const [postType, setPostType] = useState('text');
  const [imagePreview, setImagePreview] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [link, setLink] = useState('');
  const [isValidLink, setIsValidLink] = useState(true);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setIsVideo(file.type.startsWith('video/'));
    setPostType(file.type.startsWith('video/') ? 'video' : 'image');
  };

  const addPollOption = () => setPollOptions((prev) => [...prev, '']);
  const handlePollOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      return;
    }

    if (postType === 'link' && !isValidLink) {
      return;
    }

    if (
      postType === 'poll' &&
      pollOptions.filter((opt) => opt.trim()).length < 2
    ) {
      return;
    }

    const postData = {
      title,
      subreddit: selectedSubreddit,
      type: postType,
      text: content,
      image: imagePreview,
      link: postType === 'link' ? link : null,
      pollOptions:
        postType === 'poll' ? pollOptions.filter((opt) => opt.trim()) : null,
    };
    handleCreatePost(postData);
    setTitle('');
    setContent('');
    setImagePreview(null);
    setIsVideo(false);
    setLink('');
    setPollOptions(['', '']);
  };

  const validateLink = (url) => {
    try {
      new URL(url);
      return url.startsWith('http');
    } catch {
      return false;
    }
  };

  const handleLinkChange = (e) => {
    const newLink = e.target.value;
    setLink(newLink);
    setIsValidLink(validateLink(newLink));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-[#1F2A30] relative rounded-lg shadow-xl w-full max-w-3xl p-2 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b ">
          <h2 className="w-full pb-3 text-2xl font-bold text-center text-white">
            Create a post
          </h2>
        </div>

        <IconButton
          onClick={() => setShowCreatePostModal(false)}
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

        <div className="mb-4">
          <label className="block mt-2 mb-1 text-sm font-medium text-gray-300">
            Choose a forum
          </label>
          <select
            value={selectedSubreddit}
            onChange={(e) => setSelectedSubreddit(e.target.value)}
            className="w-full p-3 bg-[#0B1416] text-white rounded-lg border border-[#2A373E] focus:ring-2 focus:ring-[#289297] focus:border-transparent"
          >
            {popularTopics
              .filter((s) => s.name !== 'All')
              .map((sub) => (
                <option key={sub.name} value={sub.name}>
                  forum/{sub.name}
                </option>
              ))}
          </select>
        </div>

        <div className="flex mb-4 border-b border-gray-700">
          {['text', 'image', 'link', 'poll'].map((type) => (
            <button
              key={type}
              onClick={() => setPostType(type)}
              className={`px-4 py-3 capitalize font-medium text-sm ${
                postType === type
                  ? 'border-b-2 border-[#289297] text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 bg-[#0B1416] text-white rounded-lg border border-[#2A373E] focus:ring-2 focus:ring-[#289297] focus:border-transparent"
          />
        </div>

        {postType === 'text' && (
          <div className="mb-4">
            <textarea
              placeholder="Text (optional)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 h-32 bg-[#0B1416] text-white rounded-lg border border-[#2A373E] focus:ring-2 focus:ring-[#289297] focus:border-transparent"
            />
          </div>
        )}

        {postType === 'image' || postType === 'video' ? (
          <div className="p-6 mb-4 text-center border-2 border-gray-700 border-dashed rounded-lg">
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleImageUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex flex-col items-center justify-center cursor-pointer"
            >
              {imagePreview ? (
                isVideo ? (
                  <video
                    controls
                    src={imagePreview}
                    className="max-h-96 mx-auto rounded-lg border border-[#2A373E]"
                  />
                ) : (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-96 mx-auto rounded-lg border border-[#2A373E]"
                  />
                )
              ) : (
                <>
                  <div className="text-4xl mb-3 text-[#289297]">↑</div>
                  <p className="mb-1 font-medium text-gray-300">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports images and videos
                  </p>
                </>
              )}
            </label>
          </div>
        ) : null}

        {postType === 'link' && (
          <div className="mb-4">
            <input
              type="text"
              value={link}
              onChange={handleLinkChange}
              placeholder="Enter a valid URL (e.g., https://example.com)"
              className={`w-full p-3 rounded-lg border ${
                isValidLink || !link ? 'border-[#2A373E]' : 'border-red-500'
              } bg-[#1a2b33] text-white focus:ring-2 focus:ring-[#289297] focus:border-transparent`}
            />
            {!isValidLink && link && (
              <p className="mt-2 text-sm text-red-500">
                ❌ Please enter a valid URL starting with http:// or https://
              </p>
            )}
          </div>
        )}

        {postType === 'poll' && (
          <div className="mb-4">
            <div className="mb-3 space-y-3">
              {pollOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) =>
                      handlePollOptionChange(index, e.target.value)
                    }
                    className="w-full p-3 bg-[#0B1416] text-white rounded-lg border border-[#2A373E] focus:ring-2 focus:ring-[#289297] focus:border-transparent"
                  />
                  {pollOptions.length > 2 && (
                    <button
                      onClick={() =>
                        setPollOptions(
                          pollOptions.filter((_, i) => i !== index)
                        )
                      }
                      className="p-2 text-red-500 hover:text-red-400"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addPollOption}
              className="text-[#289297] text-sm flex items-center gap-1 hover:text-[#1d6d72]"
            >
              <span className="text-lg">+</span> Add Option
            </button>
            {pollOptions.filter((opt) => opt.trim()).length < 2 && (
              <p className="mt-2 text-sm text-yellow-500">
                ⚠️ Please add at least 2 options for your poll
              </p>
            )}
          </div>
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={handleSubmit}
            disabled={
              !title.trim() ||
              (postType === 'link' && !isValidLink) ||
              (postType === 'poll' &&
                pollOptions.filter((opt) => opt.trim()).length < 2)
            }
            className={`px-6 py-3 rounded-lg font-medium ${
              title.trim() &&
              (postType !== 'link' || isValidLink) &&
              (postType !== 'poll' ||
                pollOptions.filter((opt) => opt.trim()).length >= 2)
                ? 'bg-[#289297] hover:bg-[#1d6d72] text-white'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            } transition-colors duration-200`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
