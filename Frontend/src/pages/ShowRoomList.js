import React, { useState, useEffect } from 'react';
import '../Style/OwnerList.css'; // Import the CSS file for styling

const ShowRoomList = () => {
  const [showRoomList, setShowRoomList] = useState([]); // State to hold the fetched owner list

  useEffect(() => {
    fetch('http://localhost:8081/showRoomList')
      .then(res => res.json())
      .then(data => setShowRoomList(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="owner-list">
      <h3>Showroom List</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Showroom Name</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {showRoomList.map((showRoom) => (
            <tr key={showRoom.id}>
              <td>{showRoom.id}</td>
              <td>{showRoom.name}</td>
              <td>{showRoom.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowRoomList;
