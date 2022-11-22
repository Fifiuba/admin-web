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

let rows = [];

export default function DriversAdministration() {
  const [drivers, setDrivers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [deleting, setDeleting] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    getUsersByRole('driver').then((res) => {
      if (res.status == 200 || res.status == 202) {
        rows = res.data;
        setLoading(false);
        setDrivers(rows);
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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDeleteUser = (id) => {
    deleteUser(id, 'driver').then((res) => {
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
    {field: 'phone', headerName: 'Teléfono'},
    {field: 'age', headerName: 'Edad'},
    {
      field: 'actions',
      headerName: '',
      flex: 1,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        // you will find row info in params
        return (
          <Box sx={{display: 'flex'}}>
            <DriverProfile
              driver={params}
              role='driver'
              title='Conductor'
            />
            <Button sx={{borderColor:'red', color:'red'}}>
              <DeleteIcon
                onClick={() => handleDeleteUser(params.id, 'driver')}
              />
            </Button>
            <Button sx={{borderColor:'#fff', color:'red'}}>
              {params.isBlock ? <LockOpenIcon/> : <BlockIcon/>}
            </Button>
          </Box>
        );
      }
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
          rows={rows}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
          sx={{
            'borderColor': '#1e85c1',
            'height': '700px',
            '& .MuiDataGrid-columnHeaders':
                    {color: '#000',
                      backgroundColor: '#1e85c1',
                      opacity: '0.8'},
            '& .MuiDataGrid-row':
                    {color: '#000',
                      backgroundColor: '#fff',
                      fontWeight: 750,
                    },
            '& .MuiDataGrid-columnHeaderTitle':
                    {fontWeight: 950},
            '& .MuiDataGrid-cell':
                    {borderColor: '#1e85c1'},
            '& .MuiDataGrid-columnHeaderTitleContainer':
                    {borderColor: '#fff'},
            '& .MuiDataGrid-row:hover': {
            backgroundColor: '#e1e2e3'
            // color: "red"
            },
            '& .MuiDataGrid-row:focus': {
              backgroundColor: '#e1e2e3'
              // color: "red"
            },
            '& .MuiDataGrid-row:selected': {
              backgroundColor: '#e1e2e3'
              // color: "red"
            },
          }}
        />
      </div>
    </Container>
  );
}
