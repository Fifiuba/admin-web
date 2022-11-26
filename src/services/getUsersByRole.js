import axios from 'axios';

export default async function getUsersByRole(role) {
  try {
    return getUsers(role);
  } catch (e) {
    return false;
  }
}

function getUsers(role) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('NO TOKEN');
    return;
  }
  return axios
      .get('https://api-gateway-solfonte.cloud.okteto.net/users',
          {params: {user_type: role},
            headers: {Authorization: `Bearer ${token}`}});
}
