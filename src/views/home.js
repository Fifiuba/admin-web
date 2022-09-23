import React from 'react';
import {Link} from 'react-router-dom';

export default function Home({user}) {
  return (
    <div>
      <h1>Admin: {user.name}</h1>
      <Link to="/perfil">  Perfil  </Link>
      <Link to="/registrar">  Registrar administrador  </Link>
    </div>
  );
}
/* import React from 'react';
  import Button from '@material-ui/core/Button';
  import Menu from '@material-ui/core/Menu';
  import MenuItem from '@material-ui/core/MenuItem';

  export default function SimpleMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <Button aria-controls="simple-menu"
        aria-haspopup="true" onClick={handleClick}>
          Open Menu
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }*/
