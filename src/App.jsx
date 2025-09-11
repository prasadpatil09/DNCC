import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Login from './login.jsx';
import Signup from './signup.jsx';
import Home from './Home.jsx';
import Forgot from './forgot.jsx';
import Reset from './reset.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import Addsec from './addsec.jsx';
import Updateacc from './updateacc.jsx';
import ProtectedRoute from './protectedroute.jsx';
import Adminreq from './adminreq.jsx';
import Playerview from './playerview.jsx';
import Playerupdate from './playerupdate.jsx';
import Privateplayer from './privateplayer.jsx';
import History from './history.jsx';
import Matchadd from './matchadd.jsx';
import SeasonDetails from './matchesdetails.jsx';
// Create a wrapper component to use hooks inside BrowserRouter
const AppWrapper = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Axios response interceptor to catch token expiry
    const interceptor = Axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          alert('Session expired. Please login again.');
          localStorage.clear(); // Clear token & user info
          navigate('/'); // Redirect to login
        }
        return Promise.reject(error);
      }
    );

    return () => {
      Axios.interceptors.response.eject(interceptor); // cleanup
    };
  }, [navigate]);

  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/home/account-add"
        element={
          <PrivateRoute>
            <ProtectedRoute>
              <Addsec />
            </ProtectedRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/home/account-update/:id"
        element={
          <PrivateRoute>
            <ProtectedRoute>
              <Updateacc />
            </ProtectedRoute>
          </PrivateRoute>
        }
      />
      <Route
        path="/player/admingrantreq"
        element={
          <PrivateRoute>
            <ProtectedRoute>
              <Adminreq />
            </ProtectedRoute>
          </PrivateRoute>
        }
      />
      <Route path="/player/view/:id" element={<Playerview />} />
      <Route
        path="/playerupdate/:id"
        element={
          <Privateplayer>
            <Playerupdate />
          </Privateplayer>
        }
      />
      <Route path="/forgotpassword" element={<Forgot />} />
      <Route path="/reset/:token" element={<Reset />} />
      <Route path='/history' element={<History/>}></Route>
       <Route path='/addseasons' element={<ProtectedRoute><Matchadd/></ProtectedRoute>}></Route>
       <Route path='/seasons/:id' element={<SeasonDetails/>}></Route>
    </Routes>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
};

export default App;
