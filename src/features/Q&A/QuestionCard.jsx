import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaRegThumbsUp } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique IDs
import { Comment } from '../Q&A/comments';

export const QuestionCard = ({ question, setQuestions, isAdmin }) => {
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [showComments, setShowComments] = useState(true);
  const [newAnswer, setNewAnswer] = useState('');
  // const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleLike = () => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === question.id ? { ...q, likes: q.likes + 1 } : q))
    );
  };
  const handleAddAnswer = (e) => {
    e.preventDefault();
    const content = newAnswer.trim();
    if (!content) return;

    const answer = {
      id: uuidv4(),
      text: content,
      createdAt: new Date().toISOString(),
      comments: [],
    };

    setQuestions((prev) =>
      prev.map((q) => (q.id === question.id ? { ...q, answer } : q))
    );
    setNewAnswer('');
  };

  const handleAddComment = (e, parentId = null) => {
    e.preventDefault();
    const content = newComment.trim();
    if (!content) return;

    const comment = {
      id: uuidv4(),
      text: content,
      likes: 0,
      liked: false,
      parentId,
      replies: [],
      timestamp: new Date().toISOString(),
    };

    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== question.id) return q;

        const targetComments = q.answer ? q.answer.comments : q.comments;

        const addReplyToComment = (comments) =>
          comments.map((c) => {
            if (c.id === parentId) {
              return { ...c, replies: [...(c.replies || []), comment] };
            }
            if (c.replies?.length > 0) {
              return { ...c, replies: addReplyToComment(c.replies) };
            }
            return c;
          });

        const updatedComments = parentId
          ? addReplyToComment(targetComments)
          : [comment, ...targetComments];

        if (q.answer) {
          return {
            ...q,
            answer: {
              ...q.answer,
              comments: updatedComments,
            },
          };
        }
        return {
          ...q,
          comments: updatedComments,
        };
      })
    );

    setNewComment('');
    setReplyingTo(null);
  };

  // edit comment
  const handleEditComment = (commentId, newText) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== question.id) return q;

        const updateComments = (comments) =>
          comments.map((c) => {
            if (c.id === commentId) {
              return { ...c, text: newText };
            }
            if (c.replies?.length > 0) {
              return { ...c, replies: updateComments(c.replies) };
            }
            return c;
          });

        // Handle both question comments and answer comments
        if (q.answer) {
          return {
            ...q,
            answer: {
              ...q.answer,
              comments: updateComments(q.answer.comments),
            },
          };
        }

        return {
          ...q,
          comments: updateComments(q.comments),
        };
      })
    );
    setEditingComment(null);
  };

  // Deletes comment
  const handleDeleteComment = (commentId) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== question.id) return q;

        const filterComments = (comments) =>
          comments
            .filter((c) => c.id !== commentId)
            .map((c) => {
              if (c.replies?.length > 0) {
                return { ...c, replies: filterComments(c.replies) };
              }
              return c;
            });

        // Handle both question comments and answer comments
        if (q.answer) {
          return {
            ...q,
            answer: {
              ...q.answer,
              comments: filterComments(q.answer.comments),
            },
          };
        }

        return {
          ...q,
          comments: filterComments(q.comments),
        };
      })
    );
  };

  //  like comments
  const handleLikeComment = (commentId) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== question.id) return q;

        const updateComments = (comments) =>
          comments.map((c) => {
            if (c.id === commentId) {
              const newLiked = !c.liked;
              return {
                ...c,
                liked: newLiked,
                likes: newLiked ? c.likes + 1 : c.likes - 1,
              };
            }
            if (c.replies?.length > 0) {
              return { ...c, replies: updateComments(c.replies) };
            }
            return c;
          });

        // Handle both question comments and answer comments
        if (q.answer) {
          return {
            ...q,
            answer: {
              ...q.answer,
              comments: updateComments(q.answer.comments),
            },
          };
        }

        return {
          ...q,
          comments: updateComments(q.comments),
        };
      })
    );
  };
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white/5 rounded-xl px-2 shadow-xl py-2 backdrop-blur-sm"
    >
      {/* Question Content */}
      <div className="flex items-start pb-2">
        <div className="flex-1 border border-gray-700 px-2 py-1 rounded-md">
          <div className="flex items-center gap-2">
            <p className="text-gray-100 text-md">User Name</p>
            <p className="text-[#98A1AE] text-xs">
              {formatDistanceToNow(new Date(question.createdAt))} ago
            </p>
          </div>
          <h3 className="text-sm text-justify max-w-[50rem] sm:max-w-full text-white/50 mt-1 break-words whitespace-normal">
            {question.title}
          </h3>
        </div>
      </div>

      {/* Answer Section */}
      {question.answer ? (
        <div className="ml-4 mt-4 pl-4 border-l-2 border-[#2BA4AB]">
          <div className="flex items-start gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-[#2BA4AB]">
                  Admin
                </span>
                <span className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(question.answer.createdAt))} ago
                </span>
              </div>
              <p className="text-white/70 text-sm text-justify mb-1">
                <span className="text-[green] ">Answer: </span>
                {question.answer.text}
              </p>
            </div>
          </div>
        </div>
      ) : isAdmin ? (
        <div className="mt-4">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
            <textarea
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              placeholder="Write your answer as Admin..."
              className="w-full bg-black/20 text-white rounded-lg p-2 outline-none text-sm"
              rows="3"
            />
            <div className="flex mb-2 justify-end gap-2">
              <button
                onClick={handleAddAnswer}
                className="bg-[#2BA4AB] text-white px-4 py-1.5 rounded-full text-sm"
              >
                Post Answer
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <div className="border-t border-gray-700">
        <div className="flex items-center justify-between px-2 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className="flex items-center gap-1.5 text-white/70 hover:text-white/90"
            >
              <FaRegThumbsUp className="w-4 h-4" />
              <span>{question.likes}</span>
            </button>
            {question.answer?.comments?.length > 0 && (
              <button
                onClick={() => setShowComments(!showComments)}
                className="text-white/70 hover:text-white/90 flex items-center gap-1"
              >
                {showComments ? <FaChevronUp /> : <FaChevronDown />}
                <span>{question.answer.comments.length} comments</span>
              </button>
            )}
          </div>
          {question.answer && (
            <button
              onClick={() => setReplyingTo('root')}
              className="text-white/70 hover:text-white/90 text-sm"
            >
              Add Comment
            </button>
          )}
        </div>

        {showComments && question.answer && (
          <div className="">
            {replyingTo === 'root' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="pb-2"
              >
                <div className="flex gap-2 items-start">
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex gap-2 bg-black/20 rounded-full p-2">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none resize-none text-sm"
                        placeholder={`Comment as ${'User name'}`}
                        rows="1"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleAddComment(e);
                          }
                        }}
                      />
                      {/* <button
                        type="button"
                        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                        className="self-center text-[#2BA4AB] hover:text-[#23898e]"
                      >
                        <FaSmile className="w-5 h-5" />
                      </button> */}
                    </div>
                    {/* {showEmojiPicker && (
                      <div className="mt-0">
                        <EmojiPicker
                          onEmojiClick={(emoji) =>
                            setNewComment((prev) => prev + emoji.emoji)
                          }
                        />
                      </div>
                    )} */}
                    <div className="flex gap-2 justify-end">
                      <button
                        type="submit"
                        onClick={(e) => handleAddComment(e)}
                        className="bg-[#2BA4AB] text-white px-4 py-1.5 rounded-full text-sm"
                      >
                        Post
                      </button>
                      <button
                        type="button"
                        onClick={() => setReplyingTo(null)}
                        className="bg-gray-500 text-white px-4 py-1.5 rounded-full text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="space-y-4">
              {question.answer.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onReply={setReplyingTo}
                  onEdit={handleEditComment}
                  onDelete={handleDeleteComment}
                  onLike={handleLikeComment}
                  editingComment={editingComment}
                  setEditingComment={setEditingComment}
                  newComment={newComment}
                  setNewComment={setNewComment}
                  replyingTo={replyingTo}
                  handleAddComment={handleAddComment}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
