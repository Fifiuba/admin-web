import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import {Box} from '@mui/system';

export default function Tile({title, icon, path}) {
  const navigate = useNavigate();

  return (
    <Card
      className='tile'
      onClick={() => navigate(path)}
      variant="outlined"
      sx={{
        minHeight: '200px',
        flexDirection: 'column',
        borderColor: '#1e85c1',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          // justifyContent: 'center',
          // alignItems: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{fontSize: 16, textAlign: 'left', fontWeight: 700,
              display: 'inline'}}
            color="#1e85c1"
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            padding: '.5em',
            position: 'relative',
            bottom: '-50px',
            left: '15px',
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
}
