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
import NearMeIcon from '@mui/icons-material/NearMe';

const iconsProps = {
  fontSize: '4rem',
  color: '#1e85c1',
};

const tiles = [
  'Gestionar usuarios',
  'Gestionar choferes',
  'Administradores',
  'Perfil',
  'Registrar administrador',
  'Visualizar viajes',
  'Métricas',
  'Transacciones',
];
const redirects = ['/usuarios', '/choferes',
  '/admins', '/perfil', '/registrar', '/viajes', '/metricas',
  '/transacciones'];
const icons = [
  <PersonOutlineSharpIcon key={1} sx={iconsProps} />,
  <DriveEtaOutlinedIcon key={2} color='disabled'sx={iconsProps} />,
  <SupervisorAccountIcon key={3} color='disabled'sx={iconsProps} />,
  <AccountCircleOutlinedIcon key={4} color='disabled'sx={iconsProps} />,
  <SupervisorAccountOutlinedIcon key={5} color='disabled'sx={iconsProps} />,
  <NearMeIcon key={6} color='disabled'sx={iconsProps} />,
  <EqualizerIcon key={7} color='disabled'sx={iconsProps} />,
];

const theme = createTheme();

export default function Home({admin}) {
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
                  icon={icons[idx]}>
                </Tile>
              </Grid>);
          })}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
