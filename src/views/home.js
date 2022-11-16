import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import PersonOutlineSharpIcon from '@mui/icons-material/PersonOutlineSharp';
import SupervisorAccountOutlinedIcon
  from '@mui/icons-material/SupervisorAccountOutlined';
import AccountCircleOutlinedIcon
  from '@mui/icons-material/AccountCircleOutlined';
import DriveEtaOutlinedIcon from '@mui/icons-material/DriveEtaOutlined';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import Tile from '../components/tile';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const iconsProps = {
  fontSize: '5rem',
  fontWeight: '100',
};

const tiles = [
  'Gestionar usuarios',
  'Gestionar choferes',
  'Visualizar administradores',
  'Perfil',
  'Registrar administrador',
  'Visualizar viajes',
  'Métricas',
];
const redirects = ['/usuarios', '/choferes',
  '/admins', '/perfil', '/registrar', '/viajes', '/metricas'];
const icons = [
  <PersonOutlineSharpIcon key={1} color='primary'sx={iconsProps} />,
  <DriveEtaOutlinedIcon key={2} color='primary'sx={iconsProps} />,
  <SupervisorAccountIcon key={2} color='primary'sx={iconsProps} />,
  <AccountCircleOutlinedIcon key={3} color='primary'sx={iconsProps} />,
  <SupervisorAccountOutlinedIcon key={4} color='primary'sx={iconsProps} />,
  <EqualizerIcon key={5} color='primary'sx={iconsProps} />,
];

const theme = createTheme();

export default function Home({admin}) {
  const topTitles = [
    'Pasajeros',
    'Conductores',
    'Administradores',
    'Administradores',
    'Administradores',
    'Viajes',
    'Métricas',
  ];
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={{py: 8, justifyContent: 'center'}}>
        <Grid container spacing={1}>
          {tiles.map((tile, idx) => {
            return (
              <Grid key={idx} item>
                <Tile
                  path={redirects[idx]}
                  title={tile}
                  topTitle={topTitles[idx]}
                  icon={icons[idx]}>
                </Tile>
              </Grid>);
          })}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
