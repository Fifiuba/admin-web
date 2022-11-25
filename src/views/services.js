import React, {useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {Container} from '@mui/system';
import {Typography} from '@mui/material';
import getServices from '../services/getServices';
import CircularProgress from '@mui/material/CircularProgress';
import datagridStyle from '../utils/datagridStyles';

const columns = [
  {field: 'name', headerName: 'Servicio', flex: 1},
  {field: 'description', headerName: 'Descripción', flex: 1},
  {field: 'createdOn', headerName: 'Creado', flex: 1},
];

const rows = [];

export default function Services() {
  const [services, setServices] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getServices().then((res) => {
      if (res.status == 200 || res.status == 202) {
        let id = 0;
        for (const [key, value] of Object.entries(res.data)) {
          rows.push({
            id: id,
            name: key,
            description: value.description,
            createdOn: value.created_on,
          });
          id = id + 1;
        }
        setServices(rows);
        setLoading(false);
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

  return (
    <Container sx={{pt: '2rem'}}>
      <div style={{height: 400, width: '100%'}}>
        <Typography
          sx={{color: '#E1E2E1', pb: '.5em'}}
          variant="h4"
          component="div"
        >
        Listado de servicios
        </Typography>
        <DataGrid
          rows={services}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
          sx={datagridStyle}
        />
      </div>
    </Container>
  );
}

/*

*/
