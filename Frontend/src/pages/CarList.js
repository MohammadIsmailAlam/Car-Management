import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import Modal from "./../Modals/Modal";

const CarList = () => {
  const [carList, setCarList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    axios
      .get("http://localhost:8081/carList")
      .then((res) => setCarList(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/deleteCar/${id}`);
      setCarList(carList.filter((car) => car.id !== id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleSave = async (data) => {
    const updatedCar = { ...selectedCar, ...data };
    try {
      await axios.put(
        `http://localhost:8081/updateCar/${updatedCar.id}`,
        updatedCar
      );
      setCarList(
        carList.map((car) => (car.id === updatedCar.id ? updatedCar : car))
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  const handleEditClick = (car) => {
    setSelectedCar(car);
    Object.keys(car).forEach((key) => setValue(key, car[key]));
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (car) => {
    setSelectedCar(car);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Car List</h3>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Car Name</th>
            <th className="py-2 px-4 border-b">Car Type</th>
            <th className="py-2 px-4 border-b">Company</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Model</th>
            <th className="py-2 px-4 border-b">Reg No</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {carList.map((car) => (
            <tr key={car.id}>
              <td className="py-2 px-4 border-b">{car.id}</td>
              <td className="py-2 px-4 border-b">{car.car_name}</td>
              <td className="py-2 px-4 border-b">{car.car_type}</td>
              <td className="py-2 px-4 border-b">{car.car_company_name}</td>
              <td className="py-2 px-4 border-b">{car.car_price}</td>
              <td className="py-2 px-4 border-b">{car.model}</td>
              <td className="py-2 px-4 border-b">{car.reg_no}</td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEditClick(car)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteClick(car)}
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
        title="Edit Car"
      >
        {selectedCar && (
          <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
            <label className="block">
              Car Name:
              <input
                type="text"
                {...register("car_name")}
                className="block w-full mt-1 border-gray-300 rounded"
              />
            </label>
            <label className="block">
              Car Type:
              <input
                type="text"
                {...register("car_type")}
                className="block w-full mt-1 border-gray-300 rounded"
              />
            </label>
            <label className="block">
              Company:
              <input
                type="text"
                {...register("car_company_name")}
                className="block w-full mt-1 border-gray-300 rounded"
              />
            </label>
            <label className="block">
              Price:
              <input
                type="number"
                {...register("car_price")}
                className="block w-full mt-1 border-gray-300 rounded"
              />
            </label>
            <label className="block">
              Model:
              <input
                type="text"
                {...register("model")}
                className="block w-full mt-1 border-gray-300 rounded"
              />
            </label>
            <label className="block">
              Reg No:
              <input
                type="text"
                {...register("reg_no")}
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
        title="Delete Car"
      >
        {selectedCar && (
          <div>
            <p>Are you sure you want to delete {selectedCar.car_name}?</p>
            <button
              onClick={() => handleDelete(selectedCar.id)}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Delete
            </button>

            <button
              className="bg-white-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CarList;
