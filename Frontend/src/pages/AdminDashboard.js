import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../Style/dashboard.css';
import CarList from './CarList';
import ShowRoomList from './ShowRoomList';
import OwnerList from './OwnerList';
import CustomerList from './CustomerList';
import { useAuth } from '../Auth/AuthContext ';

const AdminDashboard = () => {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const [carList, setCarList] = useState([]);
  const [showroomList, setShowroomList] = useState([]);
  const [ownerList, setOwnerList] = useState([]);
  const [customerList, setCustomerList] = useState([]);

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

    axios.get('http://localhost:8081/ownerList')
      .then(response => {
        setOwnerList(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the owner list!', error);
      });

    axios.get('http://localhost:8081/customerList')
      .then(response => {
        setCustomerList(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the customer list!', error);
      });
  }, []);

  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button onClick={logout}>Logout</button>
      <div className="car-list">
        <CarList carList={carList} />
      </div>
      <div className="showroom-list">
        <ShowRoomList showroomList={showroomList} />
      </div>
      <div className="owner-list">
        <OwnerList ownerList={ownerList} />
      </div>
      <div className="customer-list">
        <CustomerList customerList={customerList} />
      </div>
    </div>
  );
};

export default AdminDashboard;
