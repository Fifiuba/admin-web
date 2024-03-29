import axios from 'axios';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Alejo
const firebaseConfig = {
  apiKey: 'AIzaSyBEOqr4s4qxv4BsyHGfiPiGb4altMt4NZg',
  authDomain: 'fifiuber-2e085.firebaseapp.com',
  databaseURL: 'https://fifiuber-2e085-default-rtdb.firebaseio.com',
  projectId: 'fifiuber-2e085',
  storageBucket: 'fifiuber-2e085.appspot.com',
  messagingSenderId: '294232278939',
  appId: '1:294232278939:web:40cafdc88ffe9dad09033e',
  measurementId: 'G-BEMMGF50NH',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default async function signin(admin, stayLogged) {
  try {
    const token = await authFirebase(admin);
    const res = await authAdmin(token);
    if (res.status != 200) return false;
    if (stayLogged) localStorage.setItem('token', res.data['token']);
    else sessionStorage.setItem('token', res.data['token']);
    return {
      name: res.data.name,
      last_name: res.data.last_name,
      email: admin.email,
      stayLogged: stayLogged,
    };
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
  return axios.post('https://api-gateway-solfonte.cloud.okteto.net/admins/login', {'token': token});
}
