import { formatDistanceToNow } from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { FaEllipsisH, FaRegThumbsUp, FaThumbsUp } from 'react-icons/fa';
export const Comment = ({
  comment,
  onReply,
  onEdit,
  onDelete,
  onLike,
  editingComment,
  setEditingComment,
  newComment,
  setNewComment,
  replyingTo,
  handleAddComment,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const isReplying = replyingTo === comment.id;
  const isEditing = editingComment === comment.id;
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newComment]);

  return (
    <div className="group relative">
      <div className="flex gap-3">
        <div className="flex-1">
          <div className="bg-black/15 rounded-xl px-3 pb-3 pt-1 relative">
            {/* Comment header and content */}
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-white">
                  {comment.author} {/* Display the author's name */}
                </span>
                <span className="text-xs text-gray-400">
                  {formatDistanceToNow(new Date(comment.timestamp))} ago{' '}
                  {/* Display time since posted */}
                </span>
              </div>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="text-gray-400 hover:text-white p-1"
              >
                <FaEllipsisH className="w-4 h-4" />
              </button>
              {showMenu && (
                <div
                  onClick={() => setShowMenu(!showMenu)}
                  className="absolute right-0 top-8 bg-black/80 rounded-lg p-2 flex flex-col gap-2 z-10"
                >
                  <button
                    onClick={() => {
                      setEditingComment(comment.id);
                      setShowMenu(false);
                    }}
                    className="text-xs px-3 py-1 hover:bg-white/10 rounded text-left"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      onDelete(comment.id);
                      setShowMenu(false);
                    }}
                    className="text-xs text-red-400 px-3 py-1 hover:bg-white/10 rounded text-left"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                <textarea
                  ref={textareaRef}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full bg-black/30 text-white rounded-lg p-2 outline-none text-sm"
                  rows="1"
                  autoFocus
                />
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setEditingComment(null)}
                    className="text-xs bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      onEdit(comment.id, newComment);
                    }}
                    className="text-xs bg-[#2BA4AB] text-white px-3 py-1 rounded"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <>
                <p className="text-white/50 text-sm text-justify">
                  {comment.text} {/* Display the comment text */}
                </p>
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => onLike(comment.id)}
                    className={`flex items-center gap-1 text-xs ${
                      comment.liked ? 'text-[#2BA4AB]' : 'text-gray-400'
                    }`}
                  >
                    {comment.liked ? (
                      <FaThumbsUp className="w-3.5 h-3.5" />
                    ) : (
                      <FaRegThumbsUp className="w-3.5 h-3.5" />
                    )}
                    {comment.likes > 0 && <span>{comment.likes}</span>}
                  </button>
                  <button
                    onClick={() => onReply(isReplying ? null : comment.id)}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Reply
                  </button>
                </div>
              </>
            )}
          </div>

          {isReplying && (
            <div className="pl-4 mt-2">
              <div className="flex gap-2">
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex gap-2 bg-black/20 rounded-full p-2">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none resize-none text-sm"
                      placeholder={`Write as ${comment.author}`}
                      rows="1"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleAddComment(e, comment.id);
                        }
                      }}
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={(e) => handleAddComment(e, comment.id)}
                      className="bg-[#2BA4AB] text-white px-4 py-1.5 rounded-full text-sm"
                    >
                      Post
                    </button>
                    <button
                      type="button"
                      onClick={() => onReply(null)}
                      className="bg-gray-500 text-white px-4 py-1.5 rounded-full text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {comment.replies?.length > 0 && (
            <div className="pl-2 space-y-5 border-l-1 rounded-b-xl border-white/10">
              <button
                onClick={() => setShowReplies(!showReplies)}
                className="text-xs mb-2 text-[#2BA4AB]"
              >
                {showReplies
                  ? 'Hide replies'
                  : `View ${comment.replies.length} replies`}
              </button>
              {showReplies &&
                comment.replies.map((reply) => (
                  <Comment
                    key={reply.id}
                    comment={reply}
                    onReply={onReply}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onLike={onLike}
                    editingComment={editingComment}
                    setEditingComment={setEditingComment}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    replyingTo={replyingTo}
                    handleAddComment={handleAddComment}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
