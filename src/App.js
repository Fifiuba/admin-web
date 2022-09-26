import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './views/sign-in.js';
import SignUp from './views/sign-up.js';
import Home from './views/home.js';
import Profile from './views/profile.js';
import Navbar from './components/navbar.js';
import {ProtectedRoute} from './components/protected-route.js';

function App() {
  const [admin, setAdmin] = useState(null);

  const handleLogin = () => {
    // hacer request y setear datos del admin
    setAdmin({name: 'Franco',
      last_name: 'Gomez',
      email: 'francodgmz@gmail.com',
      password: '1234'});
  };

  const handleLogout = () => {
    setAdmin(null);
  };

  return (

    <BrowserRouter>
      <Navbar admin={admin} handleLogout={handleLogout}/>
      <Routes>
        <Route
          index
          element={<SignIn handleLogin={handleLogin} admin={admin}/>}/>
        <Route path="ingresar"
          element={<SignIn handleLogin={handleLogin}
            admin={admin}/>}
        />
        <Route path="registrar" element={<SignUp/>} />
        <Route element={<ProtectedRoute admin={admin}/>}>
          <Route path="inicio" element={<Home admin={admin}/>} />
          <Route path="perfil" element={<Profile admin={admin}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
