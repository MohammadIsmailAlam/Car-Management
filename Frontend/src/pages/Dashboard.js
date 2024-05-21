import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../Style/dashboard.css';
import CarList from './CarList';
import ShowRoomList from './ShowRoomList';
import { useAuth } from '../Auth/AuthContext ';

const Dashboard = () => {
  const { isLoggedIn, logout } = useAuth();
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

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <div className="car-list">
        <CarList carList={carList} />
      </div>
      <div className="showroom-list">
        <ShowRoomList showroomList={showroomList} />
      </div>
    </div>
  );
};

export default Dashboard;