import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Typography,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";

import { publicRequest } from "../requestMethod";
import { register } from "../redux/apiCalls";
import { alertError } from "../utils/tools";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
    phone: "",
    address: "",
    age: "",
    img: "",
  });

  const dispatch = useDispatch();
  const handleChange = (event) => {
    let { name, value } = event.target;
    if (name == "img") {
      value = event.target.files?.[0];
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const isFormNotValid = () => {
    const { name, username, password, phone, address, age, img } = formData;
    let error = null;
    if (phone.length < 10) error="Số điện thoại không hợp lệ ( nhỏ hơn 10 chữ số)";
    if (password.length < 5) error="Mật khẩu phải nhiều hơn 5 ký tự";
    if (username == "") error="Trường tên đăng nhập không thể để trống!";
    if (name == "") error="Trường tên không thể để trống!";
  
    if(error) alertError(dispatch, error);
    return error;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormNotValid()) return;
    const form = new FormData();
    const { name, username, password, phone, address, age, img } = formData;
    form.append("name", name);
    form.append("username", username);
    form.append("password", password);
    form.append("phone", phone);
    form.append("address", address);
    form.append("age", age);
    form.append("img", img);
    event.preventDefault();
    register(dispatch, form);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "16px",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h6">Đăng ký</Typography>
      <FormControl>
        <InputLabel htmlFor="name-input">Họ và tên</InputLabel>
        <Input
          id="name-input"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="username-input">Tên đăng nhập</InputLabel>
        <Input
          id="username-input"
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password-input">Mật khẩu</InputLabel>
        <Input
          id="password-input"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="phone-input">Số điện thoại</InputLabel>
        <Input
          id="phone-input"
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="address-input">Địa chỉ</InputLabel>
        <Input
          id="address-input"
          name="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="age-input">Tuổi</InputLabel>
        <Input
          id="age-input"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <div style={{ width: "50%", margin: '0 auto' }}>
          <span>Ảnh đại diện</span>
          <input
            id="img-input"
            name="img"
            type="file"
            onChange={handleChange}
          />
        </div>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Đăng ký
      </Button>
    </Box>
  );
};

export default RegistrationForm;
