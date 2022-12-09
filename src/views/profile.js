import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import ValidationField from '../components/validationField';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {blue} from '@mui/material/colors';
import validate from '../utils/validation';
import editProfile from '../services/editProfile';
import {Alert} from '@mui/material';
import {AdminContext} from '../App';
const theme = createTheme();

export default function Profile() {
  const admin = React.useContext(AdminContext);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(admin[0].name);
  const [lastname, setLastname] = useState(admin[0].last_name);
  const [email, setEmail] = useState(admin[0].email);
  const [editError, setEditError] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validate('admin', 'Nombre', name) &&
        validate('admin', 'Apellido', lastname) &&
        validate('admin', 'Correo electrónico', email)) {
      const success = await editProfile({
        'name': name,
        'last_name': lastname,
        'email': admin[0].email,
      });
      if (!success) {
        setEditError(true);
        setTimeout(() => {
          setEditError(false);
        }, 3000);
      } else {
        admin[1]({
          name: name,
          last_name: lastname,
          email: admin[0].email,
          stayLogged: admin[0].stayLogged,
        });
        setEditSuccess(true);
        setEdit(false);
        setTimeout(() => {
          setEditSuccess(false);
        }, 3000);
      }
    } else {
      setEditSuccess(true);
      setEdit(false);
      setTimeout(() => {
        setEditSuccess(false);
      }, 3000);
    }
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleCancel = () => {
    setEdit(!edit);
    setName(admin[0].name);
    setLastname(admin[0].last_name);
    setEmail(admin[0].email);
    setPassword(admin[0].password);
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
              valid={validate('admin', 'Nombre', name)}/>
            <ValidationField
              enabled={edit}
              value={lastname}
              label="Apellido"
              onChange={setLastname}
              valid={validate('admin', 'Apellido', lastname)}/>
            <ValidationField
              enabled={false}
              value={email}
              label="Correo electrónico"
              onChange={setEmail}
              valid={validate('admin', 'Correo electrónico', email)}/>
            {editError &&
              <Alert severity="error">
                Ocurrio un error. Intente nuevamente
              </Alert>
            }
            {editSuccess &&
              <Alert severity="success">
                Se realizaron los cambios correctamente
              </Alert>
            }
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
