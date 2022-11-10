import axios from 'axios';

export default async function deleteUser(id, role) {
  try {
    return deleteUserById(id, role);
  } catch (e) {
    return false;
  }
}

function deleteUserById(id, role) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('NO TOKEN');
    return;
  }
  return axios
      .delete('https://backend-agustinaa235.cloud.okteto.net/users/' + id,
          {params: {user_type: role},
            headers: {Authorization: `Bearer ${token}`}});
}
