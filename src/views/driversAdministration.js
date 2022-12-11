import React, {useEffect} from 'react';
import getUsersByRole from '../services/getUsersByRole';
import deleteUser from '../services/deleteUser';
import CircularProgress from '@mui/material/CircularProgress';
import {Container} from '@mui/material';
import DriverProfile from '../components/driverProfile';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import {DataGrid} from '@mui/x-data-grid';
import {Typography} from '@mui/material';
import datagridStyles from '../utils/datagridStyles';
import blockUser from '../services/blockUser';
import ConfirmationDialog from '../components/confirmationDialog';

export default function DriversAdministration() {
  const [drivers, setDrivers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [deleting, setDeleting] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  useEffect(() => {
    getUsersByRole('driver').then((res) => {
      if (res.status == 200 || res.status == 202) {
        setLoading(false);
        setDrivers(res.data);
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
    deleteUser(id, 'driver').then((res) => {
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
    {field: 'id', headerName: 'ID', flex: 0.2},
    {field: 'name', headerName: 'Nombre', flex: 0.3},
    {field: 'email', headerName: 'Correo electrónico',
      headerAlign: 'center',
      flex: 1,
      align: 'center'},
    {field: 'phone_number', headerName: 'Teléfono'},
    {field: 'age', headerName: 'Edad'},
    {
      field: 'actions',
      headerName: '',
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      align: 'center',
      renderCell: (params) => {
        return (
          <Box sx={{display: 'flex'}}>
            <DriverProfile
              driver={params.row}
              role='driver'
              title='Conductor'
            />
            <ConfirmationDialog
              button={
                <Button sx={{borderColor: 'red', color: 'red'}}>
                  <DeleteIcon/>
                </Button>
              }
              id={params.row.id}
              action='Eliminar conductor'
              param='driver'
              message={
                '¿Esta seguro que desea eliminar al conductor ' +
                params.row.name + '?'
              }
              title='Eliminar conductor'
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
                '¿Esta seguro que desea bloquear/desbloquear al conductor ' +
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
        Conductores
        </Typography>
        <DataGrid
          rows={drivers}
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
