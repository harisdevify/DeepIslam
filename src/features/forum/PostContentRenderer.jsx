const PostContentRenderer = ({ post, handlePollVote, selectedOptions }) => {
  switch (post.type) {
    case 'link': {
      if (!post.link) {
        return <p className="mt-2 text-red-500">❌ No link provided.</p>;
      }

      let isValid = true;
      let hostname = '';

      try {
        const url = new URL(post.link);
        hostname = url.hostname;
        isValid = post.link.startsWith('http');
      } catch (error) {
        isValid = false;
        console.log(error);
      }

      return (
        <div className="mt-4">
          {isValid ? (
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 bg-[#1a2b33] rounded-lg border border-[#1d2d35] hover:border-[#3a4a52] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="bg-[#0f1a1f] p-2 rounded-lg">
                  <FiLink className="text-[#89c4f4] text-xl" />
                </div>
                <div>
                  <p className="font-medium text-white truncate">{hostname}</p>
                  <p className="text-[#6c7a80] text-sm mt-1">{post.link}</p>
                </div>
              </div>
            </a>
          ) : (
            <p className="mt-2 text-red-500">
              ❌ Invalid link: {post.link}. Please provide a valid URL starting
              with http/https.
            </p>
          )}
        </div>
      );
    }

    case 'poll':
      if (!post.poll || !post.poll.options || !post.poll.votes) {
        return <p className="mt-2 text-red-500">❌ Poll data is missing.</p>;
      }
      return (
        post.poll && (
          <div className="w-full mt-4 space-y-3">
            {post.poll.options.map((option, index) => {
              const totalVotes = Object.values(post.poll.votes).reduce(
                (a, b) => a + b,
                0
              );
              const percentage =
                totalVotes > 0
                  ? (post.poll.votes[option] / totalVotes) * 100
                  : 0;
              const isSelected = selectedOptions[post.id] === option;

              return (
                <div key={index} className="relative group">
                  <button
                    onClick={() => handlePollVote(post.id, option)}
                    className={`w-full p-4 text-left bg-[#0f212a] rounded-lg border-2 ${
                      isSelected
                        ? 'border-[#2a9a7a]'
                        : 'border-[#1a3a4a] hover:border-[#2a6a7a]'
                    } transition-all duration-300 relative overflow-hidden`}
                    disabled={!!selectedOptions[post.id] && !isSelected}
                  >
                    <div
                      className="absolute inset-0 bg-[#1a5a6c] opacity-20"
                      style={{ width: `${percentage}%` }}
                    />
                    <div className="relative z-10 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-[#89c4f4] text-lg">🌙</span>
                        <span className="font-medium text-[#c7d8e0]">
                          {option}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm font-semibold bg-[#1a3a4a] px-3 py-1 rounded-full">
                          {percentage.toFixed(1)}%
                        </span>
                        {isSelected && (
                          <span className="text-lg text-emerald-400">✓</span>
                        )}
                      </div>
                    </div>
                  </button>
                  <div className="flex items-center mt-2 ml-2 space-x-2">
                    <span className="text-xs text-[#6c7a80] font-medium">
                      {post.poll.votes[option]} votes
                    </span>
                    {totalVotes > 0 && (
                      <>
                        <span className="text-[#3a5a6c]">•</span>
                        <span className="text-xs text-[#6c7a80]">
                          {isSelected ? 'Your selection' : 'Tap to vote'}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
            <div className="text-xs text-[#6c7a80] mt-2">
              Total votes:{' '}
              {Object.values(post.poll.votes).reduce((a, b) => a + b, 0)}
              {selectedOptions[post.id] && ' • You have voted'}
            </div>
          </div>
        )
      );
    default:
      return null;
  }
};

export default PostContentRenderer;
