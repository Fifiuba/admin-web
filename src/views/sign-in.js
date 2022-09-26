import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import ValidationField from '../components/validation-field';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {blue} from '@mui/material/colors';
import validate from '../utils/validation';
import {Navigate} from 'react-router-dom';

const theme = createTheme();

export default function SignIn({handleLogin, admin}) {
  if (admin) return <Navigate to="/inicio"/>;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate('admin', 'Correo electrónico', email) &&
        validate('admin', 'Contraseña', password)) {
      handleLogin();
    } else {
      setShowError(true);
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
            fullWidth
            onSubmit={handleSubmit}
            noValidate
            sx={{mt: 1, width: '100%'}}>
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
              valid={
                !showError || validate('admin', 'Contraseña', password)}/>
            <Button
              fullWidth
              variant="contained"
              sx={{mb: 2}}
              onClick={handleSubmit}
            >
            Iniciar sesión
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
