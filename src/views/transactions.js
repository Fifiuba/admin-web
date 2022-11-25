import * as React from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {Container} from '@mui/system';
import {Typography} from '@mui/material';
import datagridStyle from '../utils/datagridStyles';

const columns = [
  {field: 'id', headerName: 'ID', flex: 1},
  {field: 'from', headerName: 'Origen', flex: 1},
  {field: 'to', headerName: 'Destino', flex: 1},
  {
    field: 'value',
    headerName: 'Valor',
    flex: 1,
  },
];

const rows = [
  {id: '1', from: '1', to: '2', value: 35},
  {id: '2', from: '2', to: '3', value: 42},
  {id: '3', from: '2', to: '7', value: 45},
  {id: '4', from: '3', to: '1', value: 16},
  {id: '5', from: '4', to: '8', value: 22},
  {id: '6', from: '5', to: '3', value: 150},
  {id: '7', from: '6', to: '4', value: 44},
  {id: '8', from: '7', to: '2', value: 36},
  {id: '9', from: '8', to: '5', value: 65},
  {id: '1', from: '1', to: '2', value: 35},
  {id: '2', from: '2', to: '3', value: 42},
  {id: '3', from: '2', to: '7', value: 45},
  {id: '4', from: '3', to: '1', value: 16},
  {id: '5', from: '4', to: '8', value: 2},
  {id: '6', from: '5', to: '3', value: 150},
  {id: '7', from: '6', to: '4', value: 44},
  {id: '8', from: '7', to: '2', value: 36},
  {id: '9', from: '8', to: '5', value: 65},
  {id: '1', from: '1', to: '2', value: 35},
  {id: '2', from: '2', to: '3', value: 42},
  {id: '3', from: '2', to: '7', value: 45},
  {id: '4', from: '3', to: '1', value: 16},
  {id: '5', from: '4', to: '8', value: 12},
  {id: '6', from: '5', to: '3', value: 150},
  {id: '7', from: '6', to: '4', value: 44},
  {id: '8', from: '7', to: '2', value: 36},
  {id: '9', from: '8', to: '5', value: 65},
];

export default function Transactions() {
  return (
    <Container sx={{pt: '2rem'}}>
      <div style={{height: 400, width: '100%'}}>
        <Typography
          sx={{color: '#E1E2E1', pb: '.5em'}}
          variant="h4"
          component="div"
        >
        Listado de transacciones
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
          sx={datagridStyle}
        />
      </div>
    </Container>
  );
}
