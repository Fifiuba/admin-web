import axios from 'axios';

export default async function getJourneys() {
  try {
    return aux();
  } catch (e) {
    return false;
  }
}

function aux() {
  let token = localStorage.getItem('token');
  if (!token) token = sessionStorage.getItem('token');
  return axios
      .get('https://journey-service-solfonte.cloud.okteto.net/journey',
          {headers: {Authorization: `Bearer ${token}`}});
}
