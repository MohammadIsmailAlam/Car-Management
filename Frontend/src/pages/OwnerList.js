import React, { useState, useEffect } from 'react';
import '../Style/OwnerList.css'; // Import the CSS file for styling

const OwnerList = () => {
  const [ownerList, setOwnerList] = useState([]); // State to hold the fetched owner list

  useEffect(() => {
    fetch('http://localhost:8081/ownerList')
      .then(res => res.json())
      .then(data => setOwnerList(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="owner-list">
      <h3>Owner List</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Mobile Number</th>
            <th>Showroom ID</th>
            <th>Car List ID</th>
          </tr>
        </thead>
        <tbody>
          {ownerList.map((owner) => (
            <tr key={owner.id}>
              <td>{owner.id}</td>
              <td>{owner.name}</td>
              <td>{owner.address}</td>
              <td>{owner.mobile_number}</td>
              <td>{owner.showroom_id}</td>
              <td>{owner.car_list_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnerList;
