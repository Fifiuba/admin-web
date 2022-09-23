import React from 'react';
import {Link as RouterLink} from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

export default function NavMenu({handleLogout}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box component="div" sx={{display: 'flex'}}>
      <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>

        <IconButton
          size="large"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>

        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: {xs: 'block', md: 'none'},
          }}
        >
          <MenuItem onClick={handleCloseNavMenu}>
            <Button component={RouterLink} to="/inicio">Inicio</Button>
            <Button component={RouterLink} to="/inicio">Opción#1</Button>
            <Button component={RouterLink} to="/inicio">Opción#2</Button>
          </MenuItem>
        </Menu>
      </Box>

      <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
        <Button component={RouterLink}
          to="/inicio"
          sx={{my: 2, color: 'white', display: 'block'}}
        >
                Inicio
        </Button>
        <Button component={RouterLink}
          to="/inicio"
          sx={{my: 2, color: 'white', display: 'block'}}
        >
                Opción#1
        </Button>
        <Button component={RouterLink}
          to="/inicio"
          sx={{my: 2, color: 'white', display: 'block'}}
        >
                Opción#2
        </Button>
      </Box>

      <Box sx={{display: 'flex', flexGrow: 1, alignItems: 'center'}}>

        <Tooltip title="Configuración">
          <IconButton onClick={handleOpenUserMenu}
            sx={{position: 'fixed', right: 0}}
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{mt: '45px'}}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
          keepMounted
          transformOrigin={{vertical: 'top', horizontal: 'right'}}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem onClick={handleCloseUserMenu}>
            <Button component={RouterLink} to="/perfil">Perfil</Button>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <Button component={RouterLink} to="/ingresar">Salir</Button>
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
