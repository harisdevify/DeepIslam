import { Box, Tab } from '@mui/material';
import Tabs, { tabsClasses } from '@mui/material/Tabs';

import React from 'react';

function PopularTopicsTabs({ handleChange, popularTopics, activeIndex }) {
  return (
    <Box
      sx={{
        mt: 2,
        px: 1,
        borderBottom: '1px solid #2A373E',
        overflowX: 'auto',
        bgcolor: 'transparent',
      }}
    >
      <Tabs
        value={activeIndex === -1 ? 0 : activeIndex}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="custom forum tabs"
        TabIndicatorProps={{
          sx: {
            backgroundColor: '#289297',
            mb: {
              xs: 1.3,
              lg: 0,
            },
          },
        }}
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },

          '& .MuiTab-root': {
            minHeight: {
              xs: '30px',
              lg: '40px',
            },
            width: 'auto',
            textTransform: 'none',
            mx: 0.3,
            px: {
              xs: 1,
              lg: 1,
            },
            py: {
              xs: 0.3,
              lg: 0,
            },
            mb: {
              xs: 0.5,
              md: 0,
            },
            borderRadius: '2px',
            fontWeight: 500,

            // ✅ Responsive font size using clamp
            fontSize: 'clamp(12px, 2.2vw, 16px)',

            whiteSpace: 'nowrap',
            color: '#ccc',
            backgroundColor: '#1F2A30',
            '&:hover': {
              backgroundColor: '#2A373E',
            },
            '&.Mui-selected': {
              backgroundColor: '#289297',
              color: '#fff',
            },
          },
        }}
      >
        {popularTopics.map((topic) => (
          <Tab
            key={topic.name}
            label={topic.name === 'All' ? topic.name : `F/${topic.name}`}
          />
        ))}
      </Tabs>
    </Box>
  );
}

export default PopularTopicsTabs;
