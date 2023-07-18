import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import ProfilePage from "./pages/Profile";
import HospitalPage from "./pages/Hospital";
import Navigation from "./components/Navigation";
import Register from "./pages/Register";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, updateUser } from "./redux/userRedux";
import Chat from "./pages/Chat";
import Alert from "./components/Alert";

function App() {
  const user = useSelector((state) => state.user);
  const accessToken = user?.accessToken;
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigation title="Trang chủ">
                <HomePage accessToken={accessToken} user={user} />
              </Navigation>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigation title={"Đăng ký"}>
                <HomePage accessToken={accessToken} user={user} />
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
                <ProfilePage accessToken={accessToken}/>
              </Navigation>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/hospital"
          element={
            user ? (
              <Navigation title="Thông tin bệnh viện">
                <HospitalPage accessToken={accessToken} user={user} />
              </Navigation>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/chat"
          element={
            user ? (
              <Navigation title="Chat">
                <Chat accessToken={accessToken} user={user} />
              </Navigation>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/"></Navigate> : <LoginPage />}
        />
      </Routes>
      <Alert />
    </Router>
  );
}

export default App;
