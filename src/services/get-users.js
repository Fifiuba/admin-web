import axios from 'axios';

export default async function getusers() {
  await
  axios.get('http://localhost:8000/users/getUsers')
      .then(function(response) {
        console.log(response.data);
        response.data.forEach((user, i) => {
          console.log(user);
          document.write(JSON.stringify(user, null, 2));
        });
        return response.data;
      })
      .catch(function(error) {
        console.log(error);
        return false;
      });
}

