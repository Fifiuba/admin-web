import React, {useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {Container} from '@mui/material';
import getAdmins from '../services/getAdmins';
import {DataGrid} from '@mui/x-data-grid';
import {Typography} from '@mui/material';
import datagridStyles from '../utils/datagridStyles';

let rows = [];

export default function AdminsAdministration() {
  const [admins, setAdmins] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  useEffect(() => {
    getAdmins().then((res) => {
      if (res.status == 200 || res.status == 202) {
        rows = res.data;
        setLoading(false);
        setAdmins(rows);
      }
    });
  }, []);

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

  const columns = [
    {field: 'id', headerName: 'ID', flex: 1},
    {field: 'name', headerName: 'Nombre', flex: 1},
    {field: 'email', headerName: 'Correo electrónico', flex: 1},
  ];


  return (
    <Container sx={{pt: '2rem'}}>
      <div style={{width: '100%'}}>
        <Typography
          sx={{color: '#E1E2E1', pb: '.5em'}}
          variant="h4"
          component="div"
        >
        Conductores
        </Typography>
        <DataGrid
          rows={admins}
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
