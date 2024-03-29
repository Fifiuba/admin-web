import axios from 'axios';

export default async function editProfile(admin) {
  try {
    const res = await editAdmin(admin);
    if (res.status == 200 || res.status == 202) return true;
    return false;
  } catch (e) {
    return false;
  }
}

function editAdmin(admin) {
  let token = localStorage.getItem('token');
  if (!token) token = sessionStorage.getItem('token');
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  return axios
      .patch('https://api-gateway-solfonte.cloud.okteto.net/admins/me/',
          {'name': admin.name,
            'last_name': admin.last_name}
          , config);
}
