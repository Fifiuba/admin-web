import * as React from 'react';
import Container from '@mui/material/Container';
import Dashboard from '../components/dashboard';
import {styled} from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import {Box} from '@mui/system';
import MetricPanel from '../components/metricPanel';

const embebedTimeSeries = [
  <iframe key='1' src="https://app.datadoghq.com/graph/embed?token=25713bd7a8d151e5a7a05ca5ca06d095df88bf2da19ae2be456884c9d81ce49d&height=400&width=800&legend=true" width="800" height="400" frameBorder="0"></iframe>,
  <iframe key='2' src="https://app.datadoghq.com/graph/embed?token=e0af42361fde8a8617305585f19189a2ada2db93a32781847f3e2e51ec04fb61&height=400&width=800&legend=true" width="800" height="400" frameBorder="0"></iframe>,
  <iframe key='3' src="https://app.datadoghq.com/graph/embed?token=0c20d9488871face9291d8b703879b58697d4673b72f1563c34fec624656724a&height=400&width=800&legend=true" width="800" height="400" frameBorder="0"></iframe>,
  <iframe key='4' src="https://app.datadoghq.com/graph/embed?token=5c2058bc7c48b180b6e07514342e2e6a4f6bcdf9aa81b69d4d92dd1fb51f2566&height=400&width=800&legend=true" width="800" height="400" frameBorder="0"></iframe>,
];

const embebedQueryValue = [
  <iframe key='1' src="https://app.datadoghq.com/graph/embed?token=40d55f53141e6f6c95033828216a18bc8264adc55e9178cf82934e432424b1a7&height=200&width=400&legend=true" width="400" height="200" frameBorder="0"></iframe>,
  <iframe key='2' src="https://app.datadoghq.com/graph/embed?token=bb1202a88b847b03848b39e0af4c76bb26277c58835aab190cd9da5e084236fb&height=200&width=400&legend=true" width="400" height="200" frameBorder="0"></iframe>,
  <iframe key='3' src="https://app.datadoghq.com/graph/embed?token=062540aebb1234f3a3a7083b67892fba5657eee2f6a889249e525400c1355464&height=200&width=400&legend=true" width="400" height="200" frameBorder="0"></iframe>,
  <iframe key='4' src="https://app.datadoghq.com/graph/embed?token=9a5f5f6718e752695234a8105c4a8661c45cbd1d0a4b2402e9fea56da05e14ef&height=200&width=400&legend=true" width="400" height="200" frameBorder="0"></iframe>,
];

const embebedTopList = [
  <iframe key='1' src="https://app.datadoghq.com/graph/embed?token=61e193d866c3dead79745eaa2e67a827b414b9147fe45523f48ea5f66cd79b5c&height=200&width=400&legend=true" width="400" height="200" frameBorder="0"></iframe>,
  <iframe key='2' src="https://app.datadoghq.com/graph/embed?token=b65614e3780d6b191cf4c67ceae1af57a66464c29bc8cfcb0b0202acbeda1fe4&height=200&width=400&legend=true" width="400" height="200" frameBorder="0"></iframe>,
  <iframe key='3' src="https://app.datadoghq.com/graph/embed?token=808d6a6f777b819a91a662a2d82d3bc4f2cfbbe5842816be4e832f414efb5d6d&height=200&width=400&legend=true" width="400" height="200" frameBorder="0"></iframe>,
  <iframe key='4' src="https://app.datadoghq.com/graph/embed?token=ffcf8e457b94519888ee5e26b8364eb3e0f104d701e6df1b9c00b65b5682c188&height=200&width=400&legend=true" width="400" height="200" frameBorder="0"></iframe>,
];

const Root = styled('div')(({theme}) => ({
  'width': '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));

const metrics = [
  'Registros',
  'Ingresos',
  'Bloqueos',
  'Cambios de contraseña',
];

export default function Metrics() {
  const [displayed, setDisplayed] = React.useState(
      [true, false, false, false],
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
                  <Dashboard
                    timeSerie={embebedTimeSeries[idx]}
                    queryValue={embebedQueryValue[idx]}
                    topList={embebedTopList[idx]}/>
                </Box>
              );
            }
          })
        }
      </Root>
    </Container>
  );
}
