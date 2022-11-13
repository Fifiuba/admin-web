import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './views/signIn.js';
import SignUp from './views/signUp.js';
import Home from './views/home.js';
import Profile from './views/profile.js';
import NavBar from './components/navbar.js';
import {ProtectedRoute} from './components/protectedRoute.js';
import signin from './services/signIn.js';
import UsersAdministration from './views/usersAdministration.js';
import DriversAdministration from './views/driversAdministration.js';
import Metrics from './views/metrics.js';


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

  const handleLogout = (admin) => {
    if (!admin['stayLogged']) localStorage.removeItem('token');
    setAdmin(null);
  };

  return (

    <BrowserRouter>
      <NavBar admin={admin} handleLogout={handleLogout}/>
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
          <Route path="usuarios" element={<UsersAdministration/>} />
          <Route path="choferes" element={<DriversAdministration/>} />
          <Route path="metricas" element={<Metrics/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
