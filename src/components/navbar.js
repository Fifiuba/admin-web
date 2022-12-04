import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import NavLogo from './navLogo';
import NavMenu from './navMenu';
import {AdminContext} from '../App';

const NavBar = ({handleLogout}) => {
  const admin = React.useContext(AdminContext);
  return (
    <AppBar position="static" sx={{backgroundColor: '#E1E2E1'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavLogo/>
          {admin[0] &&
            <NavMenu
              handleLogout={() => handleLogout(admin[0])}
            />
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
