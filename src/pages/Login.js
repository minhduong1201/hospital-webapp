import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import {useDispatch} from "react-redux";
import { login } from "../redux/apiCalls";
function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    login(dispatch, {username, password});
  };

  return (
    <div style={{ padding: "0 10px" }}>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleFormSubmit}>
        <TextField
          label="Tên đăng nhập"
          value={username}
          onChange={handleUsernameChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <TextField
          type="password"
          label="Mật khẩu"
          value={password}
          onChange={handlePasswordChange}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button type="submit" variant="contained" color="primary">
            Đăng nhập
          </Button>
          <Link to="/register">
            <Button variant="contained" color="secondary">
              Đăng ký
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
