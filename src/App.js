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
import AdminsAdministration from './views/adminsAdministration.js';
import JourneysAdministration from './views/journeysAdministration.js';
import Transactions from './views/transactions.js';
import Services from './views/services.js';

import {ThemeProvider, createTheme} from '@mui/material/styles';

const theme = createTheme({
  typography: {
    'fontFamily': 'Roboto',
  },
});

export const AdminContext = React.createContext();

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
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    setAdmin(null);
  };

  return (

    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AdminContext.Provider value={[admin, setAdmin]}>
          <NavBar handleLogout={handleLogout}/>
          <Routes>
            <Route
              index
              element={<SignIn handleLogin={handleLogin}
                signUpError={signUpError}/>}/>
            <Route path="ingresar"
              element={<SignIn
                handleLogin={handleLogin}
                signUpError={signUpError}/>}
            />
            <Route element={<ProtectedRoute/>}>
              <Route path="registrar" element={<SignUp/>} />
              <Route path="inicio" element={<Home/>} />
              <Route path="perfil" element={<Profile/>} />
              <Route path="usuarios" element={<UsersAdministration/>} />
              <Route path="choferes" element={<DriversAdministration/>} />
              <Route path="admins" element={<AdminsAdministration/>} />
              <Route path="viajes" element={<JourneysAdministration/>} />
              <Route path="metricas" element={<Metrics/>} />
              <Route path="transacciones" element={<Transactions/>} />
              <Route path="servicios" element={<Services/>} />
            </Route>
          </Routes>
        </AdminContext.Provider>
      </ThemeProvider>
    </BrowserRouter>
  );
}


export default App;
