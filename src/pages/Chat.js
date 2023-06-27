import React, { useEffect, useRef, useState } from "react";
import { Box, Typography, TextField, IconButton, Divider } from "@mui/material";
import { Send as SendIcon } from "@mui/icons-material";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../requestMethod";
import { alertError } from "../utils/tools";
import { updateHospital } from "../redux/hospitalRedux";
import { updateUserHospital } from "../redux/userRedux";

const Chat = (props) => {
  const { user } = props;
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const hospital = useSelector((state) => state.hospital);
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const {hospitalId} = user;
  useEffect(() => {
    // Cuộn xuống cuối cùng khi có tin nhắn mới
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (hospitalId) return;
    const fetchUser = async () => {
      await userRequest
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
    if (!hospitalId) return;
    const getMessages = async () => {
      const res = await userRequest.get(
        `/message?hospitalId=${hospitalId}&customerId=${user._id}`
      );
      if (res.data) setMessages(res.data);
    };
    getMessages();
    const newSocket = io("http://localhost:5000", {
      transports: ["websocket"],
    });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user]);

  useEffect(() => {
    if (!socket) return;
    // Lắng nghe sự kiện 'message' từ server và thêm tin nhắn mới vào danh sách
    socket.on("receive_message", (data) => {
      const { message } = data;
      if (checkIsReceivedMessage(message))
        setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  const checkIsReceivedMessage = (message) => {
    const { hospitalId, customerId, sender } = message;
    if (
      hospitalId == user.hospitalId &&
      customerId == user._id &&
      sender == "hospital"
    )
      return true;
    return false;
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;
    if (!user.hospitalId) return;

    const newMessage = {
      hospitalId: user.hospitalId,
      customerId: user._id,
      sender: "user", // or 'hospital' for messages from the hospital
      message: inputValue,
    };

    await userRequest.post(`/message`, newMessage).then((res) => {
      if (200 <= res.status < 300) {
        socket.emit("message", { message: res.data, user });
        setMessages((prevMessages) => [...prevMessages, res.data]);
        setInputValue("");
      } else {
        alertError(dispatch, "Không thể gửi tin nhắn!");
      }
    });
  };

  return user.hospitalId ? (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100%"
    >
      <Box p={2}>
        <Box mt={2} style={{ height: 687, overflow: "auto" }}>
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              flexDirection={
                message.sender === "hospital" ? "row-reverse" : "row"
              }
              alignItems="flex-end"
              mt={1}
            >
              <Box
                bgcolor={message.sender === "hospital" ? "#f3f3f3" : "#e1f5fe"}
                color={message.sender === "hospital" ? "inherit" : "#1976d2"}
                borderRadius="10px"
                py={1}
                px={2}
              >
                <Typography variant="body1">{message.message}</Typography>
                <Typography variant="caption">
                  {new Date(message.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} /> {/* Tham chiếu tới phần tử cuối cùng */}
        </Box>
      </Box>
      <Divider />
      <Box display="flex" alignItems="center" p={1}>
        <TextField
          value={inputValue}
          onChange={handleInputChange}
          fullWidth
          variant="outlined"
          placeholder="Nhập tin nhắn..."
        />
        <IconButton onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  ) : (
    <>Chưa có bệnh viện</>
  );
};

export default Chat;
