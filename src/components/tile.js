import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';
import {Box} from '@mui/system';
import {Button, CardActions} from '@mui/material';

export default function Tile({topTitle, title, icon, path}) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(path)}
      variant="outlined"
      sx={{
        width: '300px',
        flexDirection: 'column',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          // justifyContent: 'center',
          // alignItems: 'center'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
          }}
        >
          <Typography
            sx={{fontSize: 14, textAlign: 'left', display: 'inline'}}
            color="text.secondary"
            gutterBottom
          >
            {topTitle}
          </Typography>
          <Typography
            sx={{fontSize: 18, textAlign: 'left', fontWeight: 700,
              display: 'inline'}}
            color="text.secondary"
          >
            {title}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            padding: '.5em',
            position: 'relative',
            top: '-10px',
            right: '-17%',
          }}
        >
          {icon}
        </Box>
      </CardContent>
      <CardActions sx={{position: 'relative', bottom: '0'}}>
        <Button size="small">
          <Typography sx={{fontWeight: 600}}>
            ABRIR
          </Typography>
        </Button>
      </CardActions>
    </Card>
  );
}
