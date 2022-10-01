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
  const [signUpError, setSignUpError] = useState(false);

  const handleLogin = async (admin, stayLogged) => {
    const loggedAdmin = await signin(admin, stayLogged);
    // signup error
    if (!loggedAdmin) {
      setSignUpError(true);
      setTimeout(() => {
        setSignUpError(false);
      }, 5000);
    } else {
      setAdmin(loggedAdmin);
    }
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
          element={<SignIn handleLogin={handleLogin}
            admin={admin}
            signUpError={signUpError}/>}/>
        <Route path="ingresar"
          element={<SignIn
            handleLogin={handleLogin}
            admin={admin}
            signUpError={signUpError}/>}
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
