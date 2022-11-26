import React from 'react';
import logo from '../img/logo-removebg.png';
import Box from '@mui/material/Box';

export default function NavLogo() {
  return (
    <Box component="div" sx={{display: 'flex'}}>
      <img className='logo-img' src={logo}/>
    </Box>
  );
}
