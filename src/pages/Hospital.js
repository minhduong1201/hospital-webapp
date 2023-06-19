import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { updateHospital } from "../redux/hospitalRedux";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../requestMethod";
import { Link } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
function HospitalPage({ user }) {
  const { hospitalId } = user;
  const dispatch = useDispatch();
  const hospital = useSelector((state) => state.hospital);
  useEffect(() => {
    if (!hospitalId) return;
    const getHospital = async () => {
      await userRequest
        .get(`/hospital/${hospitalId}`)
        .then((res) => dispatch(updateHospital(res.data)));
    };
    getHospital();
  }, [hospitalId]);

  const handleChatClick = () => {
    // Xử lý mở cửa sổ chat
    // ...
  };

  return (
    <div style={{ padding: "0 10px" }}>
      <h2>Thông tin bệnh viện</h2>
      {hospital ? (
        <>
          <p>
            <strong>Mã bệnh viện:</strong> {hospital._id}
          </p>
          <p>
            <strong>Tên bệnh viện:</strong> {hospital.name}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {hospital.address}
          </p>
          <p>
            <strong>Chi tiết:</strong>
          </p>
          <p>{hospital.infor}</p>
          {/* Hiển thị các thông tin bệnh viện khác */}
          {/* ... */}
        </>
      ) : (
        <>
          <p>Mã người dùng: {user._id}</p>
          <p>
            Nhập mã này tại trang web quản lý bệnh viện của bạn để được thêm vào
            hệ thống
          </p>
        </>
      )}
      <Link to="/chat">
        <Button
          variant="contained"
          color="primary"
          style={{ float: "right", marginRight: 10 }}
          endIcon={<ArrowRightIcon />}
        >
          Chat với bệnh viện
        </Button>
      </Link>
    </div>
  );
}

export default HospitalPage;
