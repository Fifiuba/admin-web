import Constraints from './constraints';

export default function validate(entity, label, value) {
  let valid = false;
  Object.keys(Constraints).forEach(function(key) {
    if (key === entity) {
      const it = Constraints[key];
      Object.keys(it).forEach(function(subKey) {
        if (subKey === label) {
          valid = (
            value.length >= it[subKey].min &&
                        value.length <= it[subKey].max
          );
          if (it[subKey].checkEmail) {
            valid = (valid && isValidEmail(value));
          }
        }
      });
    }
  });
  console.log(entity, label, value, valid);
  return valid;
}

const isValidEmail = (email) =>
  /*eslint-disable*/
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email,
  );