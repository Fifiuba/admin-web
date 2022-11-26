import axios from 'axios';

export default async function blockUser(id, blocked) {
  try {
    return aux(id, blocked);
  } catch (e) {
    return false;
  }
}

function aux(id, blocked) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('NO TOKEN');
    return;
  }
  return axios
      .patch('https://api-gateway-solfonte.cloud.okteto.net/users/block/' +
        id,
      {block: blocked},
      {headers: {Authorization: `Bearer ${token}`}});
}
