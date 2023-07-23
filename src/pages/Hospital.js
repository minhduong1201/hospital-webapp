import React, { useDebugValue, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { updateHospital } from "../redux/hospitalRedux";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../requestMethod";
import { Link } from "react-router-dom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { updateUserHospital } from "../redux/userRedux";
import {
  Box,
  CircularProgress,
  Input,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import io from "socket.io-client";
import { Search } from "@mui/icons-material";
import { alertError, alertSuccess } from "../utils/tools";
function HospitalPage({ user, accessToken }) {
  const { hospitalId } = user;
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [socket, setSocket] = useState(null);
  const [hospitalSearch, setHospitalSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const hospital = useSelector((state) => state.hospital);

  useEffect(() => {
    if (user.hospitalId) return;
    const fetchUser = async () => {
      await userRequest(accessToken)
        .get(`/customers/user/${user._id}`)
        .then((res) => {
          if (res.data && res.data[0])
            dispatch(updateUserHospital(res.data[0]));
        })
        .catch((err) => console.log(err));
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (hospitalId) return;
    const newSocket = io(
      "https://hospital-backend-production-d055.up.railway.app",
      {
        transports: ["websocket"],
      }
    );
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!hospitalId) {
      dispatch(updateHospital(null));
      return;
    }
    const getHospital = async () => {
      await userRequest(accessToken)
        .get(`/hospital/${hospitalId}`)
        .then((res) => dispatch(updateHospital(res.data)));
    };
    getHospital();
  }, [hospitalId]);

  const handleSendId = async () => {
    console.log(hospitalSearch);
    const message = {
      hospitalId: hospitalSearch._id,
      customerId: user._id,
      sender: "user",
      message: user._id,
    };
    await userRequest(accessToken)
      .post(`/message`, message)
      .then((res) => {
        if (200 <= res.status < 300) {
          alertSuccess(dispatch, "Gửi mã thành công!");
          socket.emit("message", { message: res.data, user });
        } else {
          alertError(dispatch, "Không thể gửi tin nhắn!");
        }
      });
  };

  const handleSearchHospital = async () => {
    if (!name) return alertError(dispatch, "Vui lòng nhập tên bệnh viện!");
    setLoading(true);
    await userRequest(accessToken)
      .get(`/hospital/name/${name}`)
      .then((res) => {
        setLoading(false);
        if (res.data) setHospitalSearch(res.data);
        else setHospitalSearch(null);
        console.log(res);
      });
  };

  const renderHospitalInfor = () => {
    return (
      <Box sx={{ padding: "0 10px 0 50px" }}>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1" gutterBottom>
            Tên bệnh viện: {hospitalSearch.name}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Thông tin bệnh viện: {hospitalSearch.infor}
          </Typography>
          <Typography variant="body1">
            Địa chỉ: {hospitalSearch.address}
          </Typography>
        </Box>
        <Box textAlign={"center"}>
          <Button
            sx={{ width: "100px" }}
            onClick={() => handleSendId()}
            color="primary"
            variant="contained"
          >
            Gửi Mã
          </Button>
        </Box>
      </Box>
    );
  };
  const renderSendHospital = () => {
    return (
      <Popover
        onClose={() => {
          setVisible(false);
        }}
        open={visible}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 50, left: 350 }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box
          sx={{ width: "300px", marginRight: "10px", marginBottom: "30px" }}
          className="form"
        >
          <Typography
            color="primary"
            sx={{ textAlign: "center", fontWeight: "700", lineHeight: "50px" }}
          >
            Gửi mã đến bệnh viện
          </Typography>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}></Box>
          <div style={{ display: "flex", alignItems: "center" }}>
            <TextField
              onChange={(e) => setName(e.target.value)}
              variant="outlined"
              label="Nhập tên bệnh viện"
              style={{ margin: "10px 0 0 50px" }}
            />
            <Search
              onClick={() => handleSearchHospital()}
              fontSize="large"
              sx={{ margin: "10px 0px 0 10px" }}
            ></Search>
          </div>
          {loading && <CircularProgress sx={{ margin: "10px 0 0 120px" }} />}
          {hospitalSearch && renderHospitalInfor()}
        </Box>
      </Popover>
    );
  };

  return (
    <div style={{ padding: "0 10px" }}>
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
      {hospitalId ? (
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
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setHospitalSearch(null);
            setVisible(true);
          }}
          style={{ float: "right", marginRight: 10 }}
          endIcon={<ArrowRightIcon />}
        >
          Gửi mã này cho bệnh viện
        </Button>
      )}
      {visible && renderSendHospital()}
    </div>
  );
}

export default HospitalPage;
