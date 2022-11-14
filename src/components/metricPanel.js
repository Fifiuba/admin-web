import * as React from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';

export default function MetricPanel({metrics, checked, handler}) {
  return (
    <Box sx={{display: 'flex'}}>
      <FormControl sx={{m: 1}} component="fieldset" variant="standard">
        <FormLabel component="legend">Métricas</FormLabel>
        <FormGroup>
          {
            metrics.map((metric, idx) => {
              return (
                <FormControlLabel
                  key={idx}
                  control={
                    <Checkbox
                      checked={checked[idx]}
                      onChange={() => handler(idx)}
                      name={metric} />
                  }
                  label={metric}
                />
              );
            })
          }
        </FormGroup>
        <FormHelperText>...</FormHelperText>
      </FormControl>
    </Box>
  );
}
