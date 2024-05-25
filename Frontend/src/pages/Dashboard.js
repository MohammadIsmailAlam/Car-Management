import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Style/dashboard.css";
import CarList from "./CarList";
import ShowRoomList from "./ShowRoomList";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [carList, setCarList] = useState([]);
  const [showroomList, setShowroomList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/carList")
      .then((response) => {
        setCarList(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the car list!", error);
      });

    axios
      .get("http://localhost:8081/showroomList")
      .then((response) => {
        setShowroomList(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the showroom list!", error);
      });
  }, []);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="p-4 dashboard">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
        onClick={handleLogout}
      >
        Logout
      </button>
      <div className="car-list space-y-4">
        <CarList carList={carList} />
      </div>
      <div className="showroom-list">
        <ShowRoomList showroomList={showroomList} />
      </div>
    </div>
  );
};

export default Dashboard;
