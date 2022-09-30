import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './views/sign-in.js';
import SignUp from './views/sign-up.js';
import Home from './views/home.js';
import Profile from './views/profile.js';
import Navbar from './components/navbar.js';
import {ProtectedRoute} from './components/protected-route.js';
import signin from './services/sign-in.js';


function App() {
  const [admin, setAdmin] = useState(null);

  const handleLogin = async (admin) => {
    // hacer request y setear datos del admin
    signin(admin,setAdmin);
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
        <Route path="registrar" element={<SignUp admin={admin}/>} />
        <Route element={<ProtectedRoute admin={admin}/>}>
          <Route path="inicio" element={<Home admin={admin}/>} />
          <Route path="perfil" element={<Profile admin={admin}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
