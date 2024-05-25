import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/OwnerList.css";
import Modal from "../Modals/Modal";
import { useForm } from "react-hook-form";

const OwnerList = () => {
  const [owners, setOwners] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const { register, handleSubmit, setValue, reset } = useForm();

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

  const handleSave = async (data) => {
    const updatedOwner = { ...selectedOwner, ...data };
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
    Object.keys(owner).forEach((key) => setValue(key, owner[key]));
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (owner) => {
    setSelectedOwner(owner);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className={`space-y-4 ${isEditModalOpen || isDeleteModalOpen}`}>
      <h3 className="text-xl font-semibold">Owner List</h3>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Mobile Number</th>
            <th className="py-2 px-4 border-b">Showroom ID</th>
            <th className="py-2 px-4 border-b">Car List ID</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => (
            <tr key={owner.id}>
              <td className="py-2 px-4 border-b">{owner.id}</td>
              <td className="py-2 px-4 border-b">{owner.name}</td>
              <td className="py-2 px-4 border-b">{owner.address}</td>
              <td className="py-2 px-4 border-b">{owner.mobile_number}</td>
              <td className="py-2 px-4 border-b">{owner.showroom_id}</td>
              <td className="py-2 px-4 border-b">{owner.car_list_id}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEditClick(owner)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteClick(owner)}
                >
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
        title="Edit Owner"
      >
        {selectedOwner && (
          <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
            <label className="block">
              Name:
              <input
                type="text"
                {...register("name")}
                className="block w-full mt-1 border-gray-300 rounded"
              />
            </label>
            <label className="block">
              Address:
              <input
                type="text"
                {...register("address")}
                className="block w-full mt-1 border-gray-300 rounded"
              />
            </label>
            <label className="block">
              Mobile Number:
              <input
                type="text"
                {...register("mobile_number")}
                className="block w-full mt-1 border-gray-300 rounded"
              />
            </label>
            <label className="block">
              Showroom ID:
              <input
                type="text"
                {...register("showroom_id")}
                className="block w-full mt-1 border-gray-300 rounded"
              />
            </label>
            <label className="block">
              Car List ID:
              <input
                type="text"
                {...register("car_list_id")}
                className="block w-full mt-1 border-gray-300 rounded"
              />
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
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
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => handleDelete(selectedOwner.id)}
        >
          Delete
        </button>
        <button
          className="bg-white-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => setIsDeleteModalOpen(false)}
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default OwnerList;
