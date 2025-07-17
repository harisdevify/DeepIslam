import { Button, FormControl, MenuItem, Select } from '@mui/material';
import React from 'react';

function ForumHeader({
  sortOption,
  setSortOption,
  activeSubreddit,
  setShowCreatePostModal,
}) {
  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:items-start md:justify-between md:gap-0">
      <FormControl
        sx={{
          width: '6.5rem',
          borderRadius: '5px', // fully rounded like Tailwind's rounded-full
          bgcolor: '#1F2A30',
          border: '1px solid #2A373E',
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none',
          },

          '& .MuiSelect-select': {
            padding: '5px 10px',
            color: '#ffffff',
            fontSize: '0.875rem',
          },
          '&.Mui-focused .MuiOutlinedInput-root': {
            boxShadow: '0 0 0 2px #289297',
          },
        }}
        size="small"
      >
        <Select
          labelId="sort-label"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Sort Options' }}
          sx={{
            '& .MuiSelect-icon': {
              color: '#ffffff',
            },
          }}
          MenuProps={{
            PaperProps: {
              sx: {
                bgcolor: '#16212C', // Keep menu white for readability
                mt: '3px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                '& .MuiMenuItem-root': {
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(38, 133, 137, 0.1)', // Light teal hover
                  },
                  '&.Mui-selected': {
                    bgcolor: 'rgba(38, 133, 137, 0.2)', // Slightly darker teal for selected
                    '&:hover': {
                      bgcolor: 'rgba(38, 133, 137, 0.3)', // Darker on hover
                    },
                  },
                },
              },
            },
          }}
        >
          <MenuItem value="hot">Hot</MenuItem>
          <MenuItem value="new">New</MenuItem>
          <MenuItem value="top">Top</MenuItem>
          <MenuItem value="rising">Rising</MenuItem>
        </Select>
      </FormControl>
      {/*<!-- Title and Description -->*/}
      <div className="flex flex-col items-center justify-center w-full text-center">
        <h2 className="text-2xl font-bold text-center">
          {activeSubreddit === 'All'
            ? 'Popular Posts'
            : `forum/${activeSubreddit}`}
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          The best posts from our community
        </p>
      </div>
      {/*<!-- Create Button -->*/}
      <Button
        onClick={() => setShowCreatePostModal(true)}
        sx={{
          display: { xs: 'none', lg: 'flex' },
          bgcolor: '#2DA3AA',
          color: 'white',
          px: 3,
          py: 1,
          borderRadius: 1,
          fontSize: '0.875rem',
          fontWeight: 500,
          whiteSpace: 'nowrap', // Prevents text wrapping
          '&:hover': {
            bgcolor: '#1d6d72',
          },
          transition: 'all 0.2s',
          textTransform: 'none',
        }}
      >
        Create post
      </Button>
    </div>
  );
}

export default ForumHeader;
