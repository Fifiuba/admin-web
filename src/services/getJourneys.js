import axios from 'axios';

export default async function getJourneys() {
  try {
    return aux();
  } catch (e) {
    return false;
  }
}

function aux() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('NO TOKEN');
    return;
  }
  return axios
      .get('https://journey-service-solfonte.cloud.okteto.net/journey',
          {headers: {Authorization: `Bearer ${token}`}});
}
