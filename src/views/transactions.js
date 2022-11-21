import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container } from '@mui/system';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'from', headerName: 'Origen', width: 130 },
  { field: 'to', headerName: 'Destino', width: 130 },
  {
    field: 'value',
    headerName: 'Valor',
    type: 'number',
    width: 90,
  },
];

const rows = [
  { id: '1', from: '1', to: '2', value: 35 },
  { id: '2', from: '2', to: '3', value: 42 },
  { id: '3', from: '2', to: '7', value: 45 },
  { id: '4', from: '3', to: '1', value: 16 },
  { id: '5', from: '4', to: '8', value: 22 },
  { id: '6', from: '5', to: '3', value: 150 },
  { id: '7', from: '6', to: '4', value: 44 },
  { id: '8', from: '7', to: '2', value: 36 },
  { id: '9', from: '8', to: '5', value: 65 },
  { id: '1', from: '1', to: '2', value: 35 },
  { id: '2', from: '2', to: '3', value: 42 },
  { id: '3', from: '2', to: '7', value: 45 },
  { id: '4', from: '3', to: '1', value: 16 },
  { id: '5', from: '4', to: '8', value: 2 },
  { id: '6', from: '5', to: '3', value: 150 },
  { id: '7', from: '6', to: '4', value: 44 },
  { id: '8', from: '7', to: '2', value: 36 },
  { id: '9', from: '8', to: '5', value: 65 },
  { id: '1', from: '1', to: '2', value: 35 },
  { id: '2', from: '2', to: '3', value: 42 },
  { id: '3', from: '2', to: '7', value: 45 },
  { id: '4', from: '3', to: '1', value: 16 },
  { id: '5', from: '4', to: '8', value: 12 },
  { id: '6', from: '5', to: '3', value: 150 },
  { id: '7', from: '6', to: '4', value: 44 },
  { id: '8', from: '7', to: '2', value: 36 },
  { id: '9', from: '8', to: '5', value: 65 },
];

export default function Transactions() {
  return (
    <Container sx={{pt: '2rem'}}>
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[5,10,25,50,100]}
            sx={{
                height:'750px',
                '& .MuiDataGrid-columnHeaders':
                    {color: '#fff',
                    fontWeight: 950,},
                    '& .MuiDataGrid-row':
                    {color: '#000',
                    backgroundColor: '#E1E2E1',
                    opacity: '0.5',
                    borderColor: '#E1E2E1',
                    },
                    '& .MuiDataGrid-columnHeaderTitle':
                    {fontWeight: 950,}
            }}
        />
        </div>
    </Container>
  );
}