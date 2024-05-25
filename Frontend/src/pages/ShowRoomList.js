import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/OwnerList.css";
import Modal from "../Modals/Modal";
import { useForm } from "react-hook-form";

const ShowRoomList = () => {
  const [showRoomList, setShowRoomList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedShowRoom, setSelectedShowRoom] = useState(null);
  const { register, handleSubmit } = useForm();

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

  const handleSave = async (data) => {
    const updatedShowRoom = { ...selectedShowRoom, ...data };
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
    <div className={`space-y-4 ${isEditModalOpen || isDeleteModalOpen}`}>
      <h3 className="text-xl font-semibold">Showroom List</h3>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Showroom Name</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {showRoomList.map((showRoom) => (
            <tr key={showRoom.id}>
              <td className="py-2 px-4 border-b">{showRoom.id}</td>
              <td className="py-2 px-4 border-b">{showRoom.name}</td>
              <td className="py-2 px-4 border-b">{showRoom.address}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEditClick(showRoom)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteClick(showRoom)}
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
        title="Edit Showroom"
      >
        {selectedShowRoom && (
          <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
            <label className="block">
              Showroom Name:
              <input
                type="text"
                {...register("name")}
                defaultValue={selectedShowRoom.name}
                className="block w-full mt-1 border-gray-300 rounded"
              />
            </label>
            <label className="block">
              Address:
              <input
                type="text"
                {...register("address")}
                defaultValue={selectedShowRoom.address}
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
        <p>
          Are you sure you want to delete the showroom {selectedShowRoom?.name}?
        </p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => handleDelete(selectedShowRoom.id)}
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

export default ShowRoomList;
