import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/OwnerList.css";
import Modal from "../Modals/Modal";

const OwnerList = () => {
  const [owners, setOwners] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/ownerList")
      .then((res) => setOwners(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/deleteOwner/${id}`);
      setOwners(owners.filter((owner) => owner.id !== id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting owner:", error);
    }
  };

  const handleSave = async (updatedOwner) => {
    try {
      await axios.put(
        `http://localhost:8081/updateOwner/${updatedOwner.id}`,
        updatedOwner
      );
      setOwners(
        owners.map((owner) =>
          owner.id === updatedOwner.id ? updatedOwner : owner
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating owner:", error);
    }
  };

  const handleEditClick = (owner) => {
    setSelectedOwner(owner);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (owner) => {
    setSelectedOwner(owner);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      className={`owner-list ${
        isEditModalOpen || isDeleteModalOpen ? "blurred" : ""
      }`}
    >
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => (
            <tr key={owner.id}>
              <td>{owner.id}</td>
              <td>{owner.name}</td>
              <td>{owner.address}</td>
              <td>{owner.mobile_number}</td>
              <td>{owner.showroom_id}</td>
              <td>{owner.car_list_id}</td>
              <td>
                <button onClick={() => handleEditClick(owner)}>Edit</button>
                <button onClick={() => handleDeleteClick(owner)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Owner"
      >
        {selectedOwner && (
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={selectedOwner.name}
                onChange={(e) =>
                  setSelectedOwner({ ...selectedOwner, name: e.target.value })
                }
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={selectedOwner.address}
                onChange={(e) =>
                  setSelectedOwner({
                    ...selectedOwner,
                    address: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Mobile Number:
              <input
                type="text"
                name="mobile_number"
                value={selectedOwner.mobile_number}
                onChange={(e) =>
                  setSelectedOwner({
                    ...selectedOwner,
                    mobile_number: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Showroom ID:
              <input
                type="text"
                name="showroom_id"
                value={selectedOwner.showroom_id}
                onChange={(e) =>
                  setSelectedOwner({
                    ...selectedOwner,
                    showroom_id: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Car List ID:
              <input
                type="text"
                name="car_list_id"
                value={selectedOwner.car_list_id}
                onChange={(e) =>
                  setSelectedOwner({
                    ...selectedOwner,
                    car_list_id: e.target.value,
                  })
                }
              />
            </label>
            <button type="button" onClick={() => handleSave(selectedOwner)}>
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
        <p>Are you sure you want to delete the owner {selectedOwner?.name}?</p>
        <button onClick={() => handleDelete(selectedOwner.id)}>Delete</button>
        <button onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
};

export default OwnerList;
