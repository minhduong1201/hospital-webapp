import { publicRequest, userRequest } from "../requestMethod";
import { updateHospital } from "./hospitalRedux";
import {
  updateUser
} from "./userRedux";

export const register = async (dispatch, user) => {
  try {
    await publicRequest.post(`/auth/register/customer`, user);

    alert("Đăng ký thành công!");
  } catch (err) {
    alert("Tên đăng nhập và mật khẩu này đã tồn tại!");
  }
};

export const login = async (dispatch, user) => {
  try {
    const res = await publicRequest.post(`/auth/login/customer`, user);
    console.log(res.data);
    dispatch(updateUser(res.data));
    alert("Đăng nhập thành công!");
  } catch (err) {
    alert("Vui lòng nhập đúng tên đăng nhập và mật khẩu!");
  }
};

export const updateUserInfor = async (employee, dispatch, id) => {
  try {
    const res = await userRequest.put(`/customers/${id}`, employee);
  } catch (err) {
    console.log(err);
  }
};
