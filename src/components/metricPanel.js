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
                backgroundColor: (checked[idx] ? '#1e85c1':'#fff'),
                margin: '1em',
                height: '100px',
                width: '100px',
                borderColor: (checked[idx] ? '#fff':'#1e85c1'),
              }}
            >
              <CardContent sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                height: '80px',
                position: 'relative',
                top: '-20px',
                color: (checked[idx] ? '#fff':'#1e85c1'),
              }}>
                {metric}
              </CardContent>
              <CardActions>{
                    checked[idx] ?
                      <RemoveRedEyeIcon
                        sx={{
                          fontSize: '16px',
                          position: 'relative',
                          bottom: '50px',
                          color: '#e1e2e3',
                          height: '20px',
                        }}/>:
                      <VisibilityOffIcon
                        sx={{
                          fontSize: '16px',
                          position: 'relative',
                          bottom: '50px',
                          color: (checked[idx] ? '#e1e2e3':'#cb3234'),
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
