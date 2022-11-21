import React from 'react';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import Box from '@mui/material/Box';

export default function NavLogo() {
  return (
    <Box component="div" sx={{display: 'flex'}}>
      <QueryStatsOutlinedIcon
        sx={{fontSize: '2rem', color: '#1e85c1', mr: 1}} />
    </Box>
  );
}
