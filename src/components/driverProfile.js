import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import getUserByIdRole from '../services/getUser';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {Divider, ListItem, ListItemText, Container} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/* TAB PANEL */

const tabs = [
  'Datos generales',
  'Vehículo',
  'Contacto',
  'Calificación',
];

function TabPanel(props) {
  const {children, value, index, ...other} = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

/* TAB CONTENT */

export default function DriverProfile({driver, role, title}) {
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [info, setInfo] = React.useState({});

  useEffect(() => {
    if (open) {
      getUserByIdRole(driver.id, role).then((res) => {
        if (res.status == 200 || res.status == 202) {
          setLoading(false);
          setInfo(res.data);
        }
      });
    }
  }, [open]);

  const vip = () => {
    if (info && info.vip) {
      return <Box>VIP <VerifiedIcon/></Box>;
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const checkIfIsEmpty = (value) => {
    return (value ? value : 'Este dato no ha sido cargado en la aplicación');
  };

  return (
    <Box sx={{width: '100%'}}>
      <Button variant="outlined" onClick={handleClickOpen}>
        <InfoOutlinedIcon/>
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{position: 'relative'}}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ml: 2, flex: 1}} variant="h6" component="div">
              {title}
            </Typography>
            {vip()}
          </Toolbar>
        </AppBar>
        {loading &&
            <Container
              sx={{
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '10em'}}
            >
              <CircularProgress />
            </Container>
        }
        {!loading &&
        <Container sx={{padding: '2em'}}>
          <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label={tabs[0]} {...a11yProps(0)} />
              <Tab label={tabs[1]} {...a11yProps(1)} />
              <Tab label={tabs[2]} {...a11yProps(2)} />
              <Tab label={tabs[3]} {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ListItem button>
              <ListItemText
                sx={{textAlign: 'center'}}
                primary="ID"
                secondary={driver.id} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                sx={{textAlign: 'center'}}
                primary="Nombre"
                secondary={driver.name} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                sx={{textAlign: 'center'}}
                primary="Edad"
                secondary={checkIfIsEmpty(driver.age)} />
            </ListItem>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ListItem button>
              <ListItemText
                sx={{textAlign: 'center'}}
                primary="Modelo"
                secondary={checkIfIsEmpty(info.car_model)} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                sx={{textAlign: 'center'}}
                primary="Matrícula"
                secondary={checkIfIsEmpty(info.license_plate)} />
            </ListItem>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ListItem button>
              <ListItemText
                sx={{textAlign: 'center'}}
                primary="Correo electrónico"
                secondary={checkIfIsEmpty(driver.email)} />
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemText
                sx={{textAlign: 'center'}}
                primary="Teléfono"
                secondary={checkIfIsEmpty(driver.phone_number)} />
            </ListItem>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ListItem button>
              <ListItemText
                sx={{textAlign: 'center'}}
                primary="Calificación"
                secondary={info.score} />
            </ListItem>
          </TabPanel>
        </Container>
        }
      </Dialog>
    </Box>
  );
}
