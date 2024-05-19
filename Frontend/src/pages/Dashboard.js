import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Style/dashboard.css';
import CarList from './CarList';
import ShowRoomList from './ShowRoomList';

const Dashboard = () => {
  const [carList, setCarList] = useState([]);
  const [showroomList, setShowroomList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/carList')
      .then(response => {
        setCarList(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the car list!', error);
      });

    axios.get('http://localhost:8081/showroomList')
      .then(response => {
        setShowroomList(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the showroom list!', error);
      });
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="car-list">
        <CarList/>
      </div>
      <div className="showroom-list">
        <ShowRoomList/>
      </div>
    </div>
  );
};

export default Dashboard;
