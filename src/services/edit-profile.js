import axios from 'axios';

export default async function editProfile(admin) {
  try {
    const res = await editAdmin(admin);
    console.log('respuesta:', res);
    return true;
  } catch (e) {
    return false;
  }
}

function editAdmin(admin) {
  const token = localStorage.getItem('token');
  if (!token) token = sessionStorage.getItem('token');
  if (!token) {
    alert('NO TOKEN');
    return;
  }
  return axios
      .patch('http://localhost:8000/admins/me/',
          {'name': admin.name,
            'last_name': admin.last_name,
            'email': admin.email,
            'token': token});
}
