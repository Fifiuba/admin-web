import axios from 'axios';

export default async function getConfigJourney() {
  try {
    return getConfig();
  } catch (e) {
    return false;
  }
}

function getConfig() {
  let token = localStorage.getItem('token');
  if (!token) token = sessionStorage.getItem('token');
  return axios
      .get('https://journey-service-solfonte.cloud.okteto.net/journey/config',
          {headers: {Authorization: `Bearer ${token}`}});
}
