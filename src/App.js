import React, {useState} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SignIn from './views/sign-in.js';
import SignUp from './views/sign-up.js';
import Home from './views/home.js';
import Profile from './views/profile.js';
import Navbar from './components/navbar.js';
import {ProtectedRoute} from './components/protected-route.js';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    console.log('login');
    setUser({name: 'Franco'});
    console.log('user: ', user);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (

    <BrowserRouter>
      <Navbar user={user} handleLogout={handleLogout}/>
      <Routes>
        <Route index element={<SignIn handleLogin={handleLogin} user={user}/>}/>
        <Route path="ingresar"
          element={<SignIn handleLogin={handleLogin}
            user={user}/>}
        />
        <Route path="registrar" element={<SignUp/>} />
        <Route element={<ProtectedRoute user={user}/>}>
          <Route path="inicio" element={<Home user={user}/>} />
          <Route path="perfil" element={<Profile/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


export default App;
