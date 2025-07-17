//               <=!==ReactionButton Component ==!=>
const ReactionButton = ({ reaction, comment, currentUser, onReaction }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const hasReacted = comment.reactions?.[reaction.type]?.users?.includes(
    currentUser.id
  );

  const handleClick = () => {
    setIsAnimating(true);
    onReaction(comment.id, reaction.type);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const abbreviateNumber = (num) => {
    if (num < 1000) return num;
    if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
    return `${(num / 1000000).toFixed(1)}M`;
  };

  return (
    <Button
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '16px',
        px: 1,
        py: 0.5,
        textTransform: 'none',
        bgcolor: hasReacted ? '#1d464b' : 'transparent',
        color: hasReacted ? '#289297' : 'grey.400',
        '&:hover': { bgcolor: '#1d2e33' },
        transform: isAnimating ? 'scale(1.25)' : 'scale(1)',
        transition: 'all 0.2s',
      }}
      aria-label={`${reaction.label} (${
        comment.reactions?.[reaction.type]?.count || 0
      })`}
    >
      <Typography sx={{ fontSize: '1.125rem', mr: 0.5 }}>
        {reaction.emoji}
      </Typography>
      <Typography sx={{ fontSize: '0.75rem' }}>
        {abbreviateNumber(comment.reactions?.[reaction.type]?.count || 0)}
      </Typography>
    </Button>
  );
};

ReactionButton.propTypes = {
  reaction: PropTypes.shape({
    type: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  comment: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  onReaction: PropTypes.func.isRequired,
};
