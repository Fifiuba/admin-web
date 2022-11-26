import * as React from 'react';
import Box from '@mui/material/Box';
import {Card, CardActions, CardContent} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function MetricPanel({metrics, checked, handler}) {
  return (
    <Box sx={{display: 'flex'}}>
      {
        metrics.map((metric, idx) => {
          return (
            <Card className='metric-card' variant='outlined'
              key={idx}
              onClick={() => handler(idx)}
              sx={{
                backgroundColor: (checked[idx] ? '#34b233':'#ed4337'),
                margin: '1em',
                height: '150px',
                width: '150px',
              }}
            >
              <CardContent sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                height: '90px',
                color: '#e1e2e3',
              }}>
                {metric}
              </CardContent>
              <CardActions>{
                    checked[idx] ?
                      <RemoveRedEyeIcon
                        sx={{
                          fontSize: '16px',
                          position: 'relative',
                          bottom: '0',
                          color: '#e1e2e3',
                          height: '20px',
                        }}/>:
                      <VisibilityOffIcon
                        sx={{
                          fontSize: '16px',
                          position: 'relative',
                          bottom: '0',
                          color: '#e1e2e3',
                        }}
                      />
              }
              </CardActions>
            </Card>
          );
        })
      }
    </Box>
  );
}
