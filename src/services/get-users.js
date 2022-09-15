import axios from 'axios';

export default async function getusers() {
  await
  axios.get('http://localhost:8000/users/getUsers')
    .then(function(response) {
      console.log(response);
      return response;
    })
    .catch(function(error) {
      console.log(error);
      return false;
    });
}

