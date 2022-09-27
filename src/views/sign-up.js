import React, {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Navigate} from 'react-router-dom';
import ValidationField from '../components/validation-field';
import validate from '../utils/validation';

const theme = createTheme();

export default function SignUp({admin}) {
  if (!admin) return <Navigate to="/ingresar"/>;

  const [showError, setShowError] = useState(false);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate('admin', 'Nombre', name) &&
        validate('admin', 'Apellido', lastname) &&
        validate('admin', 'Correo electrónico', email) &&
        validate('admin', 'Contraseña', password)) {
      alert('Guardar datos');
    } else {
      setShowError(true);
      alert('Mostrar error');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            REGISTRO
          </Typography>
          <Box
            component="form"
            fullWidth
            noValidate
            sx={{mt: 1, width: '100%'}}>
            <ValidationField
              enabled={true}
              value={name}
              label="Nombre"
              onChange={setName}
              valid={!showError || validate('admin', 'Nombre', name)}/>
            <ValidationField
              enabled={true}
              value={lastname}
              label="Apellido"
              onChange={setLastname}
              valid={
                !showError || validate('admin', 'Apellido', lastname)}/>
            <ValidationField
              enabled={true}
              value={email}
              label="Correo electrónico"
              onChange={setEmail}
              valid={
                !showError || validate('admin', 'Correo electrónico', email)}/>
            <ValidationField
              enabled={true}
              value={password}
              label="Contraseña"
              onChange={setPassword}
              valid={!showError || validate('admin', 'Contraseña', password)}/>
            <Button
              fullWidth
              variant="contained"
              sx={{mb: 2}}
              onClick={handleSubmit}
            >
            Registrar
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
