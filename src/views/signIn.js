import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import ValidationField from '../components/validationField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {blue} from '@mui/material/colors';
import validate from '../utils/validation';
import {Navigate} from 'react-router-dom';
import {Alert, FormControlLabel, FormGroup} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';

const theme = createTheme();

export default function SignIn({handleLogin, admin, signUpError}) {
  if (admin) return <Navigate to="/inicio"/>;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('Entrada Inválida!');
  const [showError, setShowError] = useState(false);
  const [stayLogged, setStayLogged] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate('admin', 'Correo electrónico', email) &&
        validate('admin', 'Contraseña', password)) {
      handleLogin({
        'email': email,
        'password': password,
      }, stayLogged);
    } else {
      setShowError(true);
      setError('Error');
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
            FIFIUBA
          </Typography>
          <Avatar sx={{m: 1, bgcolor: blue[100]}}>
            <LockOutlinedIcon color="primary"/>
          </Avatar>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 1,
              width: '100%',
            }}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                handleSubmit(event);
              }
            }}
          >
            <ValidationField
              enabled={true}
              value={email}
              label="Correo electrónico"
              type="email"
              errMsg = {error}
              onChange={setEmail}
              valid={
                !showError || validate('admin', 'Correo electrónico', email)}/>
            <ValidationField
              enabled={true}
              value={password}
              label="Contraseña"
              type="password"
              onChange={setPassword}
              errMsg = {error}
              valid={
                !showError || validate('admin', 'Contraseña', password)}/>
            <FormGroup>
              <FormControlLabel
                sx={{ml: 0.05}}
                control={
                  <Checkbox
                    checked={stayLogged}
                    onChange={(e) => setStayLogged(e.target.checked)}
                  />
                }
                label="No cerrar sesión"
              />
            </FormGroup>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mb: 2,
                ml: 1,
              }}
            >
            Iniciar sesión
            </Button>
            {signUpError &&
            <Alert severity="error">
              Los datos ingresados son incorrectos
            </Alert>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
