import axios from 'axios';

export default async function getUserByIdRole(id, role) {
  console.log(id, role);
  try {
    return getUsers(id, role);
  } catch (e) {
    return false;
  }
}

function getUsers(id, role) {
  return axios
      .get('https://backend-agustinaa235.cloud.okteto.net/users/' + id,
          {params: {user_type: role}});
}
