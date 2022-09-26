const Constraints = {

  'admin': {
    'Nombre': {
      'max': 20,
      'min': 3,
    },
    'Apellido': {
      'max': 20,
      'min': 3,
    },
    'Contraseña': {
      'max': 20,
      'min': 3,
    },
    'Correo electrónico': {
      'max': 20,
      'min': 3,
      'checkEmail': true,
    },
  },
};

export default Constraints;
