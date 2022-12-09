import React, {useEffect} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {Container} from '@mui/system';
import {Typography} from '@mui/material';
import datagridStyle from '../utils/datagridStyles';
import CircularProgress from '@mui/material/CircularProgress';
import getTransactions from '../services/getTransactions';

const columns = [
  {field: 'id', headerName: 'ID', flex: 1},
  {field: 'tx', headerName: 'Transacción', flex: 1},
  {field: 'from', headerName: 'Origen', flex: 1},
  {field: 'to', headerName: 'Destino', flex: 1},
  {field: 'amount', headerName: 'Valor', flex: 1},
];


export default function Transactions() {
  const [txs, setTxs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    getTransactions().then((res) => {
      if (res.status == 200 || res.status == 202) {
        const transactions = res.data;
        setLoading(false);
        transactions.map((tx) => {
          tx['id'] = tx['_id'];
        });
        setTxs(res.data);
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
          rows={txs}
          columns={columns}
          pageSize={rowsPerPage}
          rowsPerPageOptions={[5, 10, 15, 50, 100]}
          onPageSizeChange={handleChangeRowsPerPage}
          sx={datagridStyle}
        />
      </div>
    </Container>
  );
}
