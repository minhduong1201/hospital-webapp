import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import ProfilePage from './pages/Profile';
import HospitalPage from './pages/Hospital';
import Navigation from './components/Navigation';
import Register from './pages/Register';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser, updateUser } from './redux/userRedux';
import Chat from './pages/Chat';

function App() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigation title="Trang chủ">
                <HomePage user={user} />
              </Navigation>
            ) : (
              <LoginPage/>
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigation title={"Đăng ký"}>
                <HomePage user={user} />
              </Navigation>
            ) : (
              <Register />
            )
          }
        />
        <Route
          path="/profile"
          element={
            user ? (
              <Navigation title="Thông tin cá nhân">
                <ProfilePage/>
              </Navigation>
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/hospital"
          element={
            user ? (
              <Navigation title="Thông tin bệnh viện">
                <HospitalPage user={user} />
              </Navigation>
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/chat"
          element={
            user ? (
              <Navigation title="Chat">
                <Chat user={user}/>
              </Navigation>
            ) : (
              <LoginPage />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
