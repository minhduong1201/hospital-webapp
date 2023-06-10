import React from 'react';
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { FaHeart } from 'react-icons/fa';
import { Button } from '@mui/material';
import 'react-circular-progressbar/dist/styles.css';

function HomePage({ user }) {
  const { hospitalId } = user;

  const heartRate = 100;

  const percentage = (heartRate - 50) / (160 - 50) * 100;

  return (
    <div style={{ padding: '0 10px' }}>
      <h2>Trang chủ</h2>
      <h3>Nhịp tim</h3>
      <div style={{width: '100%', textAlign: '-webkit-center'}}>
        <div style={{ width: '200px', height: '200px', }}>
          <CircularProgressbarWithChildren
            className='progress'
            value={percentage}
            strokeWidth={12}
            styles={buildStyles({
              rotation: 0,
              strokeLinecap: 'butt',
              textSize: '16px',
              pathTransitionDuration: 0.5,
              pathColor: `rgba(62, 152, 199, ${percentage / 100})`,
              textColor: '#f88',
              trailColor: '#d6d6d6',
              backgroundColor: '#3e98c7'
            })}
          >
            <div style={{ fontSize: 24, marginTop: -5 }}>
              {heartRate}
            </div>
            <div style={{ fontSize: 12, marginTop: 5 }}>
              <FaHeart />
            </div>
          </CircularProgressbarWithChildren>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
