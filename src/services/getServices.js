import axios from 'axios';

export default async function getServices() {
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
      .get('https://api-gateway-solfonte.cloud.okteto.net/services',
          {headers: {Authorization: `Bearer ${token}`}});
}
