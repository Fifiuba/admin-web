import React, {useState} from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Navigate} from 'react-router-dom';
import ValidationField from '../components/validationField';
import validate from '../utils/validation';
import signupAdmin from '../services/signUp';
import {Alert} from '@mui/material';

const theme = createTheme();

export default function SignUp({admin}) {
  if (!admin) return <Navigate to="/ingresar"/>;

  const [showError, setShowError] = useState(false);
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitError, setSubmitError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate('admin', 'Nombre', name) &&
        validate('admin', 'Apellido', lastname) &&
        validate('admin', 'Correo electrónico', email) &&
        validate('admin', 'Contraseña', password)) {
      const success = await signupAdmin({
        'name': name,
        'last_name': lastname,
        'email': email,
        'password': password,
      });
      if (!success) {
        setSubmitError(true);
        setTimeout(() => {
          setSubmitError(false);
        }, 3000);
      } else {
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 3000);
      }
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
            justifyContent: 'center',
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
              type="password"
              label="Contraseña"
              onChange={setPassword}
              valid={!showError || validate('admin', 'Contraseña', password)}/>
            {submitError &&
              <Alert severity="error">
                Ocurrio un error. Intente nuevamente
              </Alert>
            }
            {submitSuccess &&
              <Alert severity="success">
                Se creo el administrador correctamente
              </Alert>
            }
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
