import axios from 'axios';

export default async function signupAdmin(newAdmin) {
  try {
    const res = await addAdmin(newAdmin);
    if (res.status == 201) return true;
    return false;
  } catch (e) {
    return false;
  }
}

function addAdmin(newAdmin) {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('NO TOKEN');
    return;
  }
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  return axios
      .post('http://localhost:8000/admins',
          {'name': newAdmin.name,
            'last_name': newAdmin.last_name,
            'email': newAdmin.email,
            'password': newAdmin.password,
          }
          , config);
}
