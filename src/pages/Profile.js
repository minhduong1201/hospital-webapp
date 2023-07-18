import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../requestMethod";
import { updateUser } from "../redux/userRedux";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function ProfilePage() {
  const user = useSelector((state) => state.user);
  const accessToken=user?.accessToken; 
  const { _id, name, address, age, phone, health, img } = user;
  const dispatch = useDispatch();
  useEffect(() => {
    if (!_id) return;
    const fetchUser = async () => {
      try {
        const res = await userRequest(accessToken).get(`/customers/user/${_id}`);
        if (res.data && res.data[0]) {
          dispatch(updateUser(res.data[0]));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUser();
  }, [_id]);

  return (
    <Card sx={{ maxWidth: 500, margin: "0 auto", mt: 2 }}>
      <CardContent>
        <Typography variant="body1">ID: {_id}</Typography>
        <Typography variant="body1">Tên: {name}</Typography>
        <Typography variant="body1">Địa chỉ: {address}</Typography>
        <Typography variant="body1">Tuổi: {age}</Typography>
        <Typography variant="body1">Số điện thoại: {phone}</Typography>
        <Typography variant="body1">
          Tình trạng sức khỏe: {health || "đang đánh giá"}
        </Typography>
        {/* Other personal information fields */}
        {/* ... */}
        {img && (
          <CardMedia
            component="img"
            src={img}
            alt="Profile Image"
            sx={{ width: "100%", mt: 2 }}
          />
        )}
      </CardContent>
    </Card>
  );
}

export default ProfilePage;
