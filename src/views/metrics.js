import * as React from 'react';
import Container from '@mui/material/Container';
import Dashboard from '../components/dashboard';
import {styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import {Box} from '@mui/system';
import MetricPanel from '../components/metricPanel';

const Root = styled('div')(({theme}) => ({
  'width': '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

const metrics = [
  'Nuevos usuarios',
  'Inicio de sesión',
  'Bloqueos',
  'Contraseña',
];

export default function Metrics() {
  const [displayed, setDisplayed] = React.useState(
      [true, true, true, true],
  );

  const handleCheck = (idx) => {
    const aux = [...displayed];
    aux[idx] = !aux[idx];
    setDisplayed(aux);
  };

  return (
    <Container sx={{padding: '1em'}}>
      <MetricPanel
        metrics={metrics}
        checked={displayed}
        handler={handleCheck}
      />
      <Root>
        {
          metrics.map((metric, idx) => {
            if (displayed[idx]) {
              return (
                <Box key={idx}>
                  <Divider sx={{margin: '1em'}}>
                    <Chip
                      size="medium"
                      label={metric}
                    />
                  </Divider>
                  <Dashboard/>
                </Box>
              );
            }
          })
        }
      </Root>
    </Container>
  );
}
