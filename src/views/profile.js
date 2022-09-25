import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Navigate} from 'react-router-dom';
import ValidationField from '../components/validation-field';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {blue} from '@mui/material/colors';
import validate from '../utils/validation';

const theme = createTheme();

export default function Profile({user}) {
  if (!user) return <Navigate to="/ingresar"/>;

  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user.name);
  const [lastname, setLastname] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate('user', 'Nombre', name) &&
        validate('user', 'Apellido', lastname) &&
        validate('user', 'Correo electrónico', email) &&
        validate('user', 'Contraseña', password)) {
      alert('Guardar datos');
    } else {
      alert('Mostrar error');
    }
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleCancel = () => {
    setEdit(!edit);
    setName(user.name);
    setLastname(user.last_name);
    setEmail(user.email);
    setPassword(user.password);
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
            PERFIL
          </Typography>
          <Avatar sx={{m: 1, bgcolor: blue[100]}}>
            <AccountCircleIcon color="primary"/>
          </Avatar>
          <Box
            component="form"
            fullWidth
            onSubmit={handleSubmit}
            noValidate
            sx={{mt: 1, width: '100%'}}>
            <ValidationField
              enabled={edit}
              value={name}
              label="Nombre"
              onChange={setName}
              valid={validate('user', 'Nombre', name)}/>
            <ValidationField
              enabled={edit}
              value={lastname}
              label="Apellido"
              onChange={setLastname}
              valid={validate('user', 'Apellido', lastname)}/>
            <ValidationField
              enabled={edit}
              value={email}
              label="Correo electrónico"
              onChange={setEmail}
              valid={validate('user', 'Correo electrónico', email)}/>
            <ValidationField
              enabled={edit}
              value={password}
              label="Contraseña"
              onChange={setPassword}
              valid={validate('user', 'Contraseña', password)}/>
            { !edit &&
            <Button
              fullWidth
              variant="contained"
              sx={{mt: 3, mb: 2}}
              onClick={handleEdit}
            >
            Editar perfil
            </Button>
            }
            { edit &&
            <div>
              <Button
                fullWidth
                variant="contained"
                sx={{mt: 3, mb: 2}}
                onClick={handleCancel}
              >
            Cancelar
              </Button>
              <Button
                fullWidth
                variant="contained"
                sx={{mb: 2}}
                onClick={handleSubmit}
              >
            Guardar cambios
              </Button>
            </div>
            }
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
