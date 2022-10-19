import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useNavigate} from 'react-router-dom';

export default function Tile({title, icon, path}) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(path)}
      variant="outlined"
      sx={{
        height: '150px',
        width: '150px',
        flexDirection: 'column',
        borderRadius: '10px',
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'}}
      >
        {icon}
        <Typography
          gutterBottom
          variant="p"
          component="p"
          align='center'
          sx={{fontFamily: 'Arial', fontWeight: '900', color: '#1976d2'}}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
