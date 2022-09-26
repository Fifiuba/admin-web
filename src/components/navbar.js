import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import NavLogo from './nav-logo';
import NavMenu from './nav-menu';

const Navbar = ({admin, handleLogout}) => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLogo/>
          {admin && <NavMenu handleLogout={handleLogout}/>}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
