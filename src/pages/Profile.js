import React from 'react';

function ProfilePage({ user }) {
  const { _id, name, address, age, phone, health } = user;

  return (
    <div style={{padding: '0 10px'}}>
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
