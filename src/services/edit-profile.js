import axios from 'axios';

export default async function editProfile(admin) {
  const body = {
    name: admin.name,
    last_name: admin.lastname,
    email: admin.email,
    password: admin.password,
  };

  axios.put('localhost:8000/endpoint', body)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
}
