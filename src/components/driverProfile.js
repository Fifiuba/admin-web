import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import getUserByIdRole from '../services/getUser';
import CircularProgress from '@mui/material/CircularProgress';
import {Avatar, Box, Container, Grid} from '@mui/material';
import VerifiedIcon from '@mui/icons-material/Verified';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DriverProfile({driver, role, title}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = React.useState(true);
  const [info, setInfo] = React.useState({});

  useEffect(() => {
    if (open) {
      getUserByIdRole(driver.id, role).then((res) => {
        if (res.status == 200 || res.status == 202) {
          console.log(res.data);
          setLoading(false);
          setInfo(res.data);
        }
      });
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const vip = () => {
    if (info && info.vip) {
      return <Box>VIP <VerifiedIcon/></Box>;
    }
  };

  return (
    <div>
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
        <Container>
          <Container
            sx={{
              display: 'flex',
              justifyContent: 'center',
              padding: '1em',
            }}
          >
            <Avatar
              sx={{width: '150px', height: '150px'}}
              alt="user-image"
              src={driver.picture} />
          </Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2} direction='column'>
                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{mt: 4, mb: 2, textAlign: 'center'}}
                    variant="h6"
                    component="div">
              Datos generales
                  </Typography>
                  <Divider />
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
                      secondary={driver.age} />
                  </ListItem>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{mt: 4, mb: 2, textAlign: 'center'}}
                    variant="h6"
                    component="div">
              Contacto
                  </Typography>
                  <Divider />
                  <ListItem button>
                    <ListItemText
                      sx={{textAlign: 'center'}}
                      primary="Correo electrónico"
                      secondary={driver.email} />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText
                      sx={{textAlign: 'center'}}
                      primary="Teléfono"
                      secondary={driver.phone_number} />
                  </ListItem>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={2} direction='column'>
                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{mt: 4, mb: 2, textAlign: 'center'}}
                    variant="h6"
                    component="div">
              Vehículo
                  </Typography>
                  <Divider />
                  <ListItem button>
                    <ListItemText
                      sx={{textAlign: 'center'}}
                      primary="Modelo"
                      secondary={info.car_model} />
                  </ListItem>
                  <Divider />
                  <ListItem button>
                    <ListItemText
                      sx={{textAlign: 'center'}}
                      primary="Matrícula"
                      secondary={info.license_plate} />
                  </ListItem>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{mt: 4, mb: 2, textAlign: 'center'}}
                    variant="h6"
                    component="div">
              Calificación
                  </Typography>
                  <Divider />
                  <List>
                    <ListItem button>
                      <ListItemText
                        sx={{textAlign: 'center'}}
                        primary="Calificación"
                        secondary={info.score} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
        }
      </Dialog>
    </div>
  );
}
