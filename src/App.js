import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Citizens from './pages/Citizens';
import Requests from './pages/Requests';
import Login from './pages/Login';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <PrivateRoute>
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/citizens" element={<Citizens />} />
                <Route path="/requests" element={<Requests />} />
              </Routes>
            </>
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;