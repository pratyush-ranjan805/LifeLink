import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import Donors from './components/Donors';
import Emergency from './components/Emergency';
import BloodBank from './components/BloodBank';
import MapNetwork from './components/MapNetwork';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import { AuthContext } from './context/AuthContext';

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  if (!user) {
    return (
      <>
        <div className="bg-layer">
          <div className="bg-grid"></div>
          <div className="bg-orb o1"></div>
          <div className="bg-orb o2"></div>
          <div className="bg-orb o3"></div>
        </div>
        <Auth />
      </>
    );
  }

  return (
    <>
      <div className="bg-layer">
        <div className="bg-grid"></div>
        <div className="bg-orb o1"></div>
        <div className="bg-orb o2"></div>
        <div className="bg-orb o3"></div>
      </div>
      <Navbar />
      <div className="shell" id="appShell">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/bloodbank" element={<BloodBank />} />
          <Route path="/map" element={<MapNetwork />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
