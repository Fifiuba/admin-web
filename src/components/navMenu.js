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
  const [anchorElAdmin, setAnchorElAdmin] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenAdminMenu = (event) => {
    setAnchorElAdmin(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseAdminMenu = () => {
    setAnchorElAdmin(null);
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
      </Box>

      <Box sx={{display: 'flex', flexGrow: 1, alignItems: 'center'}}>

        <Tooltip title="Configuración">
          <IconButton onClick={handleOpenAdminMenu}
            sx={{position: 'fixed', right: 0}}
          >
            <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{mt: '45px'}}
          id="menu-appbar"
          anchorEl={anchorElAdmin}
          anchorOrigin={{vertical: 'top', horizontal: 'right'}}
          keepMounted
          transformOrigin={{vertical: 'top', horizontal: 'right'}}
          open={Boolean(anchorElAdmin)}
          onClose={handleCloseAdminMenu}
        >
          <MenuItem onClick={handleCloseAdminMenu}>
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