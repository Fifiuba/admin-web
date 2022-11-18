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
import CircularProgress from '@mui/material/CircularProgress';
import {Container} from '@mui/material';
import getJourneys from '../services/getJourneys';
import getAddress from '../services/getAddressFromCoords';

const fields = [
  {id: '_id', name: 'ID'},
  {id: 'status', name: 'Estado'},
  {id: 'idPassenger', name: 'Pasajero ID'},
  {id: 'from', name: 'Origen'},
  {id: 'to', name: 'Destino'},
  {id: 'price', name: 'Precio'},
  {id: 'startOn', name: 'Inicio'},
  {id: 'finishOn', name: 'Fin'},
];

let rows = [];

export default function JourneysAdministration() {
  const [journeys, setJourneys] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [by, setBy] = React.useState('_id');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(() => {
    getJourneys().then((res) => {
      // if (res.status == 200 || res.status == 202) {
      rows = res.data;
      getAddress(rows).then((results) => {
        setJourneys(results);
        setLoading(false);
      });
      // }
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
      aux = aux.filter((journey) => {
        if (typeof journey[by] != 'number') {
          return journey[by].toLowerCase().includes(value.toLowerCase());
        } else {
          return (journey[by] == value);
        }
      });
      setJourneys(aux);
    } else setJourneys(rows);
  };

  const handleSearchBy = (value) => {
    setJourneys(rows);
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
                  {fields.map((column) => (
                    <StyledTableCell
                      key={column.id}
                    >
                      {column.name}
                    </StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {journeys
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}>
                          {fields.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id}>
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
