import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CarList from './CarList';
import ShowRoomList from './ShowRoomList';
import OwnerList from './OwnerList';
import CustomerList from './CustomerList';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
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

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <button 
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="space-y-4">
        <CarList carList={carList} />
        <ShowRoomList showroomList={showroomList} />
        <OwnerList ownerList={ownerList} />
        <CustomerList customerList={customerList} />
      </div>
    </div>
  );
};

export default AdminDashboard;
