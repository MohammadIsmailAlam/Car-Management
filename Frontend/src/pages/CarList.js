import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Style/OwnerList.css"; // Import the CSS file for styling
import Modal from './../Modals/Modal';

const CarList = () => {
  const [carList, setCarList] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

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

  const handleSave = async (updatedCar) => {
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
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (car) => {
    setSelectedCar(car);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      className={`owner-list ${
        isEditModalOpen || isDeleteModalOpen ? "blurred" : ""
      }`}
    >
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
            <th>Actions</th>
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
              <td>
                <button onClick={() => handleEditClick(car)}>Edit</button>
                <button onClick={() => handleDeleteClick(car)}>Delete</button>
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
          <form>
            <label>
              Car Name:
              <input
                type="text"
                name="car_name"
                value={selectedCar.car_name}
                onChange={(e) =>
                  setSelectedCar({ ...selectedCar, car_name: e.target.value })
                }
              />
            </label>
            <label>
              Car Type:
              <input
                type="text"
                name="car_type"
                value={selectedCar.car_type}
                onChange={(e) =>
                  setSelectedCar({ ...selectedCar, car_type: e.target.value })
                }
              />
            </label>
            <label>
              Company:
              <input
                type="text"
                name="car_company_name"
                value={selectedCar.car_company_name}
                onChange={(e) =>
                  setSelectedCar({
                    ...selectedCar,
                    car_company_name: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Price:
              <input
                type="text"
                name="car_price"
                value={selectedCar.car_price}
                onChange={(e) =>
                  setSelectedCar({ ...selectedCar, car_price: e.target.value })
                }
              />
            </label>
            <label>
              Model:
              <input
                type="text"
                name="model"
                value={selectedCar.model}
                onChange={(e) =>
                  setSelectedCar({ ...selectedCar, model: e.target.value })
                }
              />
            </label>
            <label>
              Reg No:
              <input
                type="text"
                name="reg_no"
                value={selectedCar.reg_no}
                onChange={(e) =>
                  setSelectedCar({ ...selectedCar, reg_no: e.target.value })
                }
              />
            </label>
            <button type="button" onClick={() => handleSave(selectedCar)}>
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
        <p>Are you sure you want to delete the car {selectedCar?.car_name}?</p>
        <button onClick={() => handleDelete(selectedCar.id)}>Delete</button>
        <button onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
};

export default CarList;
