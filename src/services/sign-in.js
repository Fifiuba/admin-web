import axios from 'axios';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Franco
const firebaseConfig = {
  apiKey: 'AIzaSyBlT-6rNj8czMlBF12fnBb3OhagdNbJ7wk',
  authDomain: 'fifiuba.firebaseapp.com',
  projectId: 'fifiuba',
  storageBucket: 'fifiuba.appspot.com',
  messagingSenderId: '230254709670',
  appId: '1:230254709670:web:f97cb5b6fe6e12b7a5dd67',
  measurementId: 'G-41VK87PH5D',
};
// Alejo
/* const firebaseConfig = {
  apiKey: 'AIzaSyBEOqr4s4qxv4BsyHGfiPiGb4altMt4NZg',
  authDomain: 'fifiuber-2e085.firebaseapp.com',
  databaseURL: 'https://fifiuber-2e085-default-rtdb.firebaseio.com',
  projectId: 'fifiuber-2e085',
  storageBucket: 'fifiuber-2e085.appspot.com',
  messagingSenderId: '294232278939',
  appId: '1:294232278939:web:40cafdc88ffe9dad09033e',
  measurementId: 'G-BEMMGF50NH',
};*/

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default async function signin(admin, stayLogged) {
  try {
    const token = await authFirebase(admin);
    const res = await authAdmin(token);
    if (stayLogged) localStorage.setItem('token', res.data['token']);
    return {name: res.data.name, last_name: res.data.last_name};
  } catch (e) {
    return;
  }
}

async function authFirebase(admin) {
  const userCredential =
    await signInWithEmailAndPassword(auth, admin.email, admin.password);
  const user = userCredential.user;
  const token = await user.getIdToken();
  return token;
}

export function authAdmin(token) {
  return axios.post('http://localhost:8000/admins/login', {'token': token});
}
