import {Container} from '@mui/system';
import * as React from 'react';

const Dashboard = () => {
  return (
    <Container sx={{textAlign: 'center'}}>
      <iframe src="https://app.datadoghq.com/graph/embed?token=8eb2b6051da2be01bb2fa35275757a20172cffefb0ee6cdb53877f6afc7b6c29&height=500&width=1000&legend=true" width="1000" height="500" frameBorder="0"></iframe>
    </Container>
  );
};

export default Dashboard;
