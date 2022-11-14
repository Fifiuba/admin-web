import axios from 'axios';

export default async function getAdmins() {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('NO TOKEN');
      return;
    }
    return axios
        .get('https://backend-alejovillores.cloud.okteto.net/admins/',
            {headers: {Authorization: `Bearer ${token}`}});
  } catch (e) {
    return false;
  }
}
