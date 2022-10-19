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
      .get('http://localhost:8000/users',
          {params: {user_type: role}});
}
