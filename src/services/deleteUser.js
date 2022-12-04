import axios from 'axios';

export default async function deleteUser(id, role) {
  try {
    return deleteUserById(id, role);
  } catch (e) {
    return false;
  }
}

function deleteUserById(id, role) {
  let token = localStorage.getItem('token');
  if (!token) token = sessionStorage.getItem('token');
  return axios
      .delete('https://backend-agustinaa235.cloud.okteto.net/users/' + id,
          {data: {user_type: role},
            headers: {Authorization: `Bearer ${token}`}});
}
