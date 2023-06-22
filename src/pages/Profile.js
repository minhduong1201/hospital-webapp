import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../requestMethod";
import { updateUser } from "../redux/userRedux";

function ProfilePage() {
  const user = useSelector((state) => state.user);
  const { _id, name, address, age, phone, health } = user;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user._id) return;
    const fetchUser = async () => {
      await userRequest
        .get(`/customers/user/${user._id}`)
        .then((res) => {
          if (res.data && res.data[0]) dispatch(updateUser(res.data[0]))
        })
        .catch((err) => console.log(err));
    };
    fetchUser();
  }, []);
  return (
    <div style={{ padding: "0 10px" }}>
      <h2>Thông tin cá nhân</h2>
      <p>ID: {_id}</p>
      <p>Tên: {name}</p>
      <p>Địa chỉ: {address}</p>
      <p>Tuổi: {age}</p>
      <p>Số điện thoại: {phone}</p>
      <p>Tình trạng sức khỏe: {health || "đang đánh giá"}</p>
      {/* Các trường thông tin cá nhân khác */}
      {/* ... */}
    </div>
  );
}

export default ProfilePage;
