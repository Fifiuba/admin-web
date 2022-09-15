import axios from 'axios';

export default function getusers() {
    return [{"name":"Franco","password":"123","phone":"123","age":"24"},
        {"name":"Tomas","password":"123","phone":"123","age":"24"}];
  axios.get('http://localhost:8000/users/getusers')
      .then(function(response) {
        console.log('Respuesta\n',response);
        return [{"name":"Franco","password":"123","phone":"123","age":"24"},
        {"name":"Tomas","password":"123","phone":"123","age":"24"}];
      })
      .catch(function(error) {
        console.log(error);
        return false;
      });
}