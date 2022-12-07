import {Box} from '@mui/system';
import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import getUsersByRole from '../services/getUsersByRole';
import CircularProgress from '@mui/material/CircularProgress';
import {Container} from '@mui/material';
import UserProfile from '../components/userProfile';
import DeleteIcon from '@mui/icons-material/Delete';
import deleteUser from '../services/deleteUser';
import blockUser from '../services/blockUser';
import {DataGrid} from '@mui/x-data-grid';
import {Typography} from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import datagridStyles from '../utils/datagridStyles';
import ConfirmationDialog from '../components/confirmationDialog';

export default function UsersAdministration() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [deleting, setDeleting] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  useEffect(() => {
    getUsersByRole('passenger').then((res) => {
      if (res.status == 200 || res.status == 202) {
        setLoading(false);
        setUsers(res.data);
      }
    });
  }, [deleting]);

  if (loading) {
    return <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '10em'}}
    >
      <CircularProgress />
    </Container>;
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
  };

  const handleDeleteUser = (id) => {
    deleteUser(id, 'passenger').then((res) => {
      if (res.status == 200) {
        setLoading(true);
        setDeleting(!deleting);
      }
    });
  };

  const handleBlockUser = (id, blocked) => {
    blockUser(id, blocked).then((res) => {
      if (res.status == 200) {
        setLoading(true);
        setDeleting(!deleting);
      }
    });
  };

  const columns = [
    {field: 'id', headerName: 'ID', flex: 1},
    {field: 'name', headerName: 'Nombre', flex: 1},
    {field: 'email', headerName: 'Correo electrónico', flex: 1},
    {field: 'phone_number', headerName: 'Teléfono'},
    {field: 'age', headerName: 'Edad'},
    {
      field: 'actions',
      headerName: '',
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        return (
          <Box sx={{display: 'flex'}}>
            <UserProfile
              user={params.row}
              role='passenger'
              title='Pasajero'
            />
            <ConfirmationDialog
              button={
                <Button sx={{borderColor: 'red', color: 'red'}}>
                  <DeleteIcon/>
                </Button>
              }
              id={params.row.id}
              action='Eliminar usuario'
              param='passenger'
              message={
                '¿Esta seguro que desea eliminar al usuario ' +
                params.row.name + '?'
              }
              title='Eliminar usuario'
              onConfirm={handleDeleteUser}
            />
            <ConfirmationDialog
              button={
                <Button sx={{borderColor: '#fff', color: 'red'}}>
                  {params.row.isBlock ?
                    <LockOpenIcon/> : <BlockIcon/>
                  }
                </Button>
              }
              id={params.row.id}
              action={
                params.row.isBlock ? 'Desbloquear': ' Bloquear'
              }
              param={params.row.isBlock ? false : true}
              message={
                '¿Esta seguro que desea bloquear/desbloquear al usuario ' +
                params.row.name + '?'
              }
              title={
                params.row.isBlock ? 'Desbloquear usuario': ' Bloquear usuario'
              }
              onConfirm={handleBlockUser}
            />
          </Box>
        );
      },
    },
  ];

  return (
    <Container sx={{pt: '2rem'}}>
      <div style={{height: 400, width: '100%'}}>
        <Typography
          sx={{color: '#E1E2E1', pb: '.5em'}}
          variant="h4"
          component="div"
        >
        Pasajeros
        </Typography>
        <DataGrid
          rows={users}
          columns={columns}
          pageSize={rowsPerPage}
          rowsPerPageOptions={[5, 10, 15, 50, 100]}
          onPageSizeChange={handleChangeRowsPerPage}
          sx={datagridStyles}
        />
      </div>
    </Container>
  );
}
