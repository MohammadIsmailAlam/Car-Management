import React, { useState, useEffect } from 'react';
import '../Style/OwnerList.css'; // Import the CSS file for styling

const CarList = () => {
  const [carList, setCarList] = useState([]); // State to hold the fetched owner list

  useEffect(() => {
    fetch('http://localhost:8081/carList')
      .then(res => res.json())
      .then(data => setCarList(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="owner-list">
      <h3>Car List</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Car Name</th>
            <th>Car Type</th>
            <th>Company</th>
            <th>Price</th>
            <th>Model</th>
            <th>Reg No</th>
          </tr>
        </thead>
        <tbody>
          {carList.map((car) => (
            <tr key={car.id}>
              <td>{car.id}</td>
              <td>{car.car_name}</td>
              <td>{car.car_type}</td>
              <td>{car.car_company_name}</td>
              <td>{car.car_price}</td>
              <td>{car.model}</td>
              <td>{car.reg_no}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarList;
