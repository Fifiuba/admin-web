import axios from 'axios';

export default async function signupAdmin(newAdmin) {
  try {
    const res = await addAdmin(newAdmin);
    if (
      res.status == 201 ||
      res.status == 200 ||
      res.status == 204) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}

function addAdmin(newAdmin) {
  let token = localStorage.getItem('token');
  if (!token) token = sessionStorage.getItem('token');
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  return axios
      .post('https://api-gateway-solfonte.cloud.okteto.net/admins',
          {'name': newAdmin.name,
            'last_name': newAdmin.last_name,
            'email': newAdmin.email,
            'password': newAdmin.password,
          }
          , config);
}
