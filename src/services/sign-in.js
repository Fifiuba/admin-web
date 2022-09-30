import axios from 'axios';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {initializeApp} from 'firebase/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

export default function signin(admin,setAdmin) {
  signInWithEmailAndPassword(auth, admin.email, admin.password)
      .then((userCredential) => {
        const user = userCredential.user;
        user.getIdToken()
            .then((tokenId) => {
              const body = {
                token: tokenId,
              };
              console.log(tokenId);
              axios.post('http://localhost:8000/admins/login', body)
                .then((res) => {
                  localStorage.setItem("token", res.data['token']);
                  const admin = {
                    "name":"Alejo",
                    "last_name": "Villores",
                  }
                  setAdmin(admin)
                })
                .catch((err) => {
                  console.error(err);
                  return null
                });
            });
        //return user;

      })
      .catch(() => {
        return null
      });
}
