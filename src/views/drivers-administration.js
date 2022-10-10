import {Box} from '@mui/system';
import ArrowBackIosNewOutlinedIcon
  from '@mui/icons-material/ArrowBackIosNewOutlined';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {styled} from '@mui/material/styles';
import SearchBar from '../components/search-bar';

const fields = [
  {id: 'id', name: 'ID'},
  {id: 'name', name: 'Nombre'},
  {id: 'email', name: 'Correo electrónico'},
  {id: 'phone', name: 'Teléfono'},
  {id: 'age', name: 'Edad'},
  {id: 'car', name: 'Auto'},
  {id: 'model', name: 'Modelo'},
];

const columns = [
  {id: 'id', label: 'ID', minWidth: 50},
  {id: 'name', label: 'Nombre', minWidth: 50},
  {
    id: 'email',
    label: 'Correo electrónico',
    minWidth: 100,
  },
  {id: 'phone', label: 'Teléfono', minWidth: 50},
  {id: 'age', label: 'Edad', minWidth: 50},
  {id: 'car', label: 'Auto', minWidth: 50},
  {id: 'model', label: 'Modelo', minWidth: 50},
];

function createData(id, name, email, phone, age, car, model) {
  return {id, name, email, phone, age, car, model};
}

const rows = [
  createData('0', 'Franco', 'fdgomez@fi.uba.ar',
      '3446313831', '24', 'Toyota', 'Ethios'),
  createData('1', 'Alejo', 'alejo@fi.uba.ar',
      '3446121314', '22', 'Toyota', 'Ethios'),
  createData('2', 'Agustina', 'agus@fi.uba.ar',
      '3446313831', '23', 'Toyota', 'Ethios'),
  createData('3', 'Sol', 'sol@fi.uba.ar',
      '3446313831', '25', 'Toyota', 'Ethios'),
  createData('4', 'Pablo', 'pablo@fi.uba.ar',
      '3446313831', '21', 'Toyota', 'Ethios'),
  createData('5', 'Pablo', 'pablo2@fi.uba.ar',
      '3446313831', '27', 'Toyota', 'Ethios'),
  createData('6', 'Pablo', 'pablo3@fi.uba.ar',
      '3446313831', '40', 'Toyota', 'Ethios'),
  createData('7', 'Franco', 'franco@fi.uba.ar',
      '3446313831', '24', 'Toyota', 'Ethios'),
  createData('8', 'Alejo', 'alejo2@fi.uba.ar',
      '3446313831', '22', 'Toyota', 'Ethios'),
  createData('9', 'Agustina', 'agus2@fi.uba.ar',
      '3446313831', '23', 'Toyota', 'Ethios'),
  createData('10', 'Sol', 'sol2@fi.uba.ar',
      '3446313831', '25', 'Toyota', 'Ethios'),
  createData('11', 'Pablo', 'aaaaa@fi.uba.ar',
      '3446313831', '21', 'Toyota', 'Ethios'),
  createData('12', 'Pablo', 'bbbbb@fi.uba.ar',
      '3446313831', '27', 'Toyota', 'Ethios'),
  createData('13', 'Pablo', 'cccc@fi.uba.ar',
      '3446313831', '40', 'Toyota', 'Ethios'),
];

export default function DriversAdministration() {
  const [drivers, setDrivers] = React.useState(rows);
  const [by, setBy] = React.useState('name');

  const handleSearch = (value) => {
    if (value !== '') {
      let aux = rows;
      aux = aux.filter((driver) => {
        return driver[by].toLowerCase().includes(value.toLowerCase());
      });
      setDrivers(aux);
    } else setDrivers(rows);
  };

  const handleSearchBy = (value) => {
    setDrivers(rows);
    setBy(value);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#1976d2',
      color: theme.palette.common.white,
      fontWeight: 900,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const navigate = useNavigate();

  return (
    <Box sx={{padding: '1em'}}>
      <Box sx={{display: 'flex', justifyContent: 'left', padding: '1em'}}>
        <ArrowBackIosNewOutlinedIcon
          onClick={() => navigate('/inicio')}
          color='primary'
        />
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'center', padding: '1em'}}>
        <SearchBar
          onSearch={handleSearch}
          fields={fields}
          onSearchBy={handleSearchBy}
          by={by}
        />
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'center'}}>
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
          <TableContainer sx={{maxHeight: 440}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <StyledTableCell
                      key={column.id}
                      align={column.align}
                      style={{minWidth: column.minWidth}}
                    >
                      {column.label}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {drivers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}>
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number' ?
                                column.format(value) :
                                value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  );
}
