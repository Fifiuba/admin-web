import React, {useState, useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {Container} from '@mui/material';
import getJourneys from '../services/getJourneys';
import getAddress from '../services/getAddressFromCoords';
import {DataGrid} from '@mui/x-data-grid';
import {Typography} from '@mui/material';
import datagridStyles from '../utils/datagridStyles';
import ConfigJourney from '../components/configJourney';
import getConfigJourney from '../services/getConfigJourney';
import editConfigJourney from '../services/editConfigJourney';

export default function JourneysAdministration() {
  const [price, setPrice] = useState(0);
  const [editted, setEditted] = useState(false);
  const [radialDistance, setRadialDistance] = useState(0);
  const [journeys, setJourneys] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  useEffect(() => {
    getJourneys().then((res) => {
      if (res.status == 200 || res.status == 202) {
        getAddress(res.data).then((results) => {
          results.map((result) => {
            result['id'] = result['_id'];
          });
          setJourneys(results);
          setLoading(false);
        });
      }
    });
    getConfigJourney().then((res) => {
      if (res.status == 200 || res.status == 202) {
        setLoading(false);
        setPrice(res.data.base_price);
        setRadialDistance(res.data.radial_distance);
      }
    });
  }, [editted]);

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

  const columns = [
    {field: '_id', headerName: 'ID', flex: 1},
    {field: 'status', headerName: 'Estado', flex: 1},
    {field: 'idPassenger', headerName: 'Pasajero'},
    {field: 'from', headerName: 'Origen', flex: 1},
    {field: 'to', headerName: 'Destino', flex: 1},
    {field: 'price', headerName: 'Precio', flex: 1},
    {field: 'startOn', headerName: 'Inicio', flex: 1},
    {field: 'finishOn', headerName: 'Fin', flex: 1},
  ];

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event);
  };

  const editConfig = (price, distance) => {
    editConfigJourney(price, distance).then((res) => {
      if (res) setEditted(!editted);
    });
  };

  return (
    <Container sx={{pt: '2rem'}}>
      <div style={{height: 400, width: '100%'}}>
        <Typography
          sx={{color: '#E1E2E1', pb: '.5em'}}
          variant="h4"
          component="div"
        >
        Viajes
        </Typography>
        <ConfigJourney
          price={price}
          radialDistance={radialDistance}
          onSubmit={editConfig}/>
        <DataGrid
          rows={journeys}
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
