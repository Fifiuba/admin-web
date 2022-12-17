import React from 'react';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import {Button} from '@mui/material';

export default function NavMenu({handleLogout}) {
  return (
    <Box component="div" sx={{display: 'flex'}}>
      <Button
        sx={{
          position: 'absolute',
          right: '0',
          top: '20%',
          color: 'red',
        }}
      >
        <LogoutIcon
          onClick={handleLogout}/>
      </Button>
    </Box>
  );
}
