import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import NavLogo from './navLogo';
import NavMenu from './navMenu';

const NavBar = ({admin, handleLogout}) => {
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLogo/>
          {admin &&
            <NavMenu admin={admin} handleLogout={() => handleLogout(admin)}/>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
