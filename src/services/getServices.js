import axios from 'axios';

export default async function getServices() {
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
      .get('https://api-gateway-solfonte.cloud.okteto.net/services',
          {headers: {Authorization: `Bearer ${token}`}});
}
