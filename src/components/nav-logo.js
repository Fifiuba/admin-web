import React from 'react';
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function NavLogo() {
  return (
    <Box component="div" sx={{display: 'flex'}}>
      <QueryStatsOutlinedIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        sx={{
          mr: 2,
          display: {xs: 'none', md: 'flex'},
          fontFamily: 'monospace',
          fontWeight: 500,
          letterSpacing: '0',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
                FIFI UBA
      </Typography>
    </Box>
  );
}
