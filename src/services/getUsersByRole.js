import axios from 'axios';

export default async function getUsersByRole(role) {
  try {
    return getUsers(role);
  } catch (e) {
    return false;
  }
}

function getUsers(role) {
  let token = localStorage.getItem('token');
  if (!token) token = sessionStorage.getItem('token');
  return axios
      .get('https://api-gateway-solfonte.cloud.okteto.net/users',
          {params: {user_type: role},
            headers: {Authorization: `Bearer ${token}`}});
}
