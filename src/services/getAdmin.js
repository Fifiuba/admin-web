import axios from 'axios';

export default async function getAdmin(token) {
  try {
    return axios
        .get('https://backend-alejovillores.cloud.okteto.net/admins/me/',
            {headers: {Authorization: `Bearer ${token}`}});
  } catch (e) {
    return false;
  }
}
