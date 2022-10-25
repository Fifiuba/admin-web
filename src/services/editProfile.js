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
  const token = localStorage.getItem('token');
  if (!token) {
    alert('NO TOKEN');
    return;
  }
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  return axios
      .patch('https://backend-alejovillores.cloud.okteto.net/admins/me/',
          {'name': admin.name,
            'last_name': admin.last_name}
          , config);
}
