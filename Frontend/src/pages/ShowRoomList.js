import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/OwnerList.css";
import Modal from "../Modals/Modal";

const ShowRoomList = () => {
  const [showRoomList, setShowRoomList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedShowRoom, setSelectedShowRoom] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/showRoomList")
      .then((res) => setShowRoomList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/deleteShowroom/${id}`);
      setShowRoomList(showRoomList.filter((showRoom) => showRoom.id !== id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting showroom:", error);
    }
  };

  const handleSave = async (updatedShowRoom) => {
    try {
      await axios.put(
        `http://localhost:8081/updateShowroom/${updatedShowRoom.id}`,
        updatedShowRoom
      );
      setShowRoomList(
        showRoomList.map((showRoom) =>
          showRoom.id === updatedShowRoom.id ? updatedShowRoom : showRoom
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating showroom:", error);
    }
  };

  const handleEditClick = (showRoom) => {
    setSelectedShowRoom(showRoom);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (showRoom) => {
    setSelectedShowRoom(showRoom);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      className={`owner-list ${
        isEditModalOpen || isDeleteModalOpen ? "blurred" : ""
      }`}
    >
      <h3>Showroom List</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Showroom Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {showRoomList.map((showRoom) => (
            <tr key={showRoom.id}>
              <td>{showRoom.id}</td>
              <td>{showRoom.name}</td>
              <td>{showRoom.address}</td>
              <td>
                <button onClick={() => handleEditClick(showRoom)}>Edit</button>
                <button onClick={() => handleDeleteClick(showRoom)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Showroom"
      >
        {selectedShowRoom && (
          <form>
            <label>
              Showroom Name:
              <input
                type="text"
                name="name"
                value={selectedShowRoom.name}
                onChange={(e) =>
                  setSelectedShowRoom({
                    ...selectedShowRoom,
                    name: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={selectedShowRoom.address}
                onChange={(e) =>
                  setSelectedShowRoom({
                    ...selectedShowRoom,
                    address: e.target.value,
                  })
                }
              />
            </label>
            <button type="button" onClick={() => handleSave(selectedShowRoom)}>
              Save
            </button>
          </form>
        )}
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete"
      >
        <p>
          Are you sure you want to delete the showroom {selectedShowRoom?.name}?
        </p>
        <button onClick={() => handleDelete(selectedShowRoom.id)}>
          Delete
        </button>
        <button onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
};

export default ShowRoomList;