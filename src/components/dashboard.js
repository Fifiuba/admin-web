import {Box} from '@mui/material';
import {Container} from '@mui/system';
import * as React from 'react';

export default function Dashboard({timeSerie, queryValue, topList}) {
  return (
    <Box sx={{display: 'flex'}}>
      <Box>
        {timeSerie}
      </Box>
      <Box>
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <Container>{queryValue}</Container>
          <Container>{topList}</Container>
        </Box>
      </Box>
    </Box>
  );
};
