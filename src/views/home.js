/*import React, {useState} from 'react';
import getusers from '../services/get-users'

function Home() {
    const [users, setUsers] = useState(null);
    return (
        <div>
            <h1>Admin</h1>
            <button onClick={()=> setUsers(getusers())}>Get users</button>
            <ul>{users && users.map((user, idx) => <li key={idx}>Nombre:{user.name} </li>)}</ul>
        </div>
  )*/
  /*import React from 'react';
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
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
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