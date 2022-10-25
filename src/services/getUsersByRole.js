import axios from 'axios';

export default async function getUsersByRole(role) {
  try {
    return getUsers(role);
  } catch (e) {
    return false;
  }
}

function getUsers(role) {
  return axios
      .get('https://backend-agustinaa235.cloud.okteto.net/users',
          {params: {user_type: role}});
}
