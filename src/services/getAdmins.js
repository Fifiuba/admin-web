import axios from 'axios';

export default async function getAdmins() {
  try {
    let token = localStorage.getItem('token');
    if (!token) token = sessionStorage.getItem('token');
    return axios
        .get('https://api-gateway-solfonte.cloud.okteto.net/admins/',
            {headers: {Authorization: `Bearer ${token}`}});
  } catch (e) {
    return false;
  }
}
