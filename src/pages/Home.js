import React, { useEffect, useState } from "react";
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { FaHeart } from "react-icons/fa";
import { Button } from "@mui/material";
import "react-circular-progressbar/dist/styles.css";
import { userRequest } from "../requestMethod";

function HomePage({ user, accessToken }) {
  const [heartRate, setHeartRate] = useState({});
  useEffect(() => {
    if (!user._id) return;
    const interval = setInterval(() => {
      getHeartRate();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getHeartRate = async () => {
    await userRequest(accessToken).get(`/heart_rate/${user._id}`).then(res => setHeartRate(res.data)).catch(err => err);
  };

  const percentage = ((heartRate - 50) / (160 - 50)) * 100;

  return (
    <div style={{ padding: "0 10px" }}>
      <h2>Trang chủ</h2>
      <h3>
        Nhịp tim:{" "}
        {heartRate.value == null || heartRate.value == undefined
          ? "Chưa có dữ liệu"
          : heartRate.value < 60
          ? "chậm"
          : heartRate.value > 100
          ? "nhanh"
          : "tốt"}
      </h3>
      <div style={{ width: "100%", textAlign: "-webkit-center" }}>
        <div style={{ width: "200px", height: "200px" }}>
          <CircularProgressbarWithChildren
            className="progress"
            value={percentage}
            strokeWidth={12}
            styles={buildStyles({
              rotation: 0,
              strokeLinecap: "butt",
              textSize: "16px",
              pathTransitionDuration: 0.5,
              pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
              textColor: "#f88",
              trailColor: "#d6d6d6",
              backgroundColor: "#3e98c7",
            })}
          >
            <div style={{ fontSize: 24, marginTop: -5 }}>
              {heartRate.value || "Chưa có dữ liệu"}
            </div>
            <div style={{ fontSize: 12, marginTop: 5 }}>
              <FaHeart />
            </div>
          </CircularProgressbarWithChildren>
          <div style={{ marginTop: 15 }}>
            Dữ liệu được cập nhật vào:{" "}
            {heartRate.createdAt && new Date(heartRate.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
