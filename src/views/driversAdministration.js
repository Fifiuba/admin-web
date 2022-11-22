import {Box} from '@mui/system';
import React, {useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {styled} from '@mui/material/styles';
import SearchBar from '../components/searchBar';
import getUsersByRole from '../services/getUsersByRole';
import deleteUser from '../services/deleteUser';
import CircularProgress from '@mui/material/CircularProgress';
import {Container} from '@mui/material';
import DriverProfile from '../components/driverProfile';
import DeleteIcon from '@mui/icons-material/Delete';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import BlockIcon from '@mui/icons-material/Block';

const fields = [
  {id: 'id', name: 'ID'},
  {id: 'name', name: 'Nombre'},
  {id: 'email', name: 'Correo electrónico'},
  {id: 'phone', name: 'Teléfono'},
  {id: 'age', name: 'Edad'},
];

const columns = [
  {id: 'id', label: 'ID', minWidth: 50},
  {id: 'name', label: 'Nombre', minWidth: 50},
  {
    id: 'email',
    label: 'Correo electrónico',
    minWidth: 100,
  },
  {id: 'phone_number', label: 'Teléfono', minWidth: 50},
  {id: 'age', label: 'Edad', minWidth: 50},
  {id: 'info', label: 'Ver', align: 'center'},
  {id: 'delete', label: 'Eliminar', align: 'center'},
  {id: 'block', label: 'Bloqueo', align: 'center'},
];

let rows = [];

export default function DriversAdministration() {
  const [drivers, setDrivers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [deleting, setDeleting] = React.useState(false);
  const [by, setBy] = React.useState('name');
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

  const handleSearch = (value) => {
    if (value !== '') {
      let aux = rows;
      aux = aux.filter((driver) => {
        if (typeof driver[by] != 'number') {
          return driver[by].toLowerCase().includes(value.toLowerCase());
        } else {
          return (driver[by] == value);
        }
      });
      setDrivers(aux);
    } else setDrivers(rows);
  };

  const handleSearchBy = (value) => {
    setDrivers(rows);
    setBy(value);
  };

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

  return (
    <Box sx={{padding: '1em'}}>
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
                            if (column.id != 'info' && column.id != 'delete') {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number' ?
                                  column.format(value) :
                                  value}
                                </TableCell>
                              );
                            } else if (column.id == 'delete') {
                              return (
                                <TableCell key={column.id} align="center">
                                  <DeleteIcon
                                    onClick={() =>
                                      handleDeleteUser(row.id, 'driver')}/>
                                </TableCell>);
                            } else if (column.id == 'info') {
                              return (
                                <TableCell key={column.id} align="center">
                                  <DriverProfile
                                    driver={row}
                                    role="driver"
                                    title="Conductor"/>
                                </TableCell>);
                            } else {
                              console.log(row, row.isBlock, row.isBlock == true);
                              if (row.isBlock == 'true') {
                                return (<LockOpenIcon sx={{color:'red'}}/>);
                              } else {
                                return (<BlockIcon/>);
                              }
                            }
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
