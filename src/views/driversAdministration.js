import {Box} from '@mui/system';
import ArrowBackIosNewOutlinedIcon
  from '@mui/icons-material/ArrowBackIosNewOutlined';
import React, {useEffect} from 'react';
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
import SearchBar from '../components/searchBar';
import getUsersByRole from '../services/getUsersByRole';
import CircularProgress from '@mui/material/CircularProgress';
import {Container} from '@mui/material';
import DriverProfile from '../components/driverProfile';

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
];

let rows = [];

export default function DriversAdministration() {
  const [drivers, setDriver] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [by, setBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    getUsersByRole('driver').then((res) => {
      if (res.status == 200 || res.status == 202) {
        rows = res.data;
        setLoading(false);
        setDriver(rows);
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
                            if (column.id != 'info') {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number' ?
                                  column.format(value) :
                                  value}
                                </TableCell>
                              );
                            } else {
                              return (
                                <TableCell key={column.id} align="center">
                                  <DriverProfile
                                    driver={row}
                                    role="driver"
                                    title="Conductor"/>
                                </TableCell>);
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
