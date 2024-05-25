import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import "../Style/OwnerList.css"; // Import the CSS file for styling
import { useForm } from "react-hook-form"; // Import useForm from react-hook-form
import Modal from "./../Modals/Modal";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    axios
      .get("http://localhost:8081/customerList")
      .then((res) => {
        setCustomers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/deleteCustomer/${id}`);
      setCustomers(customers.filter((customer) => customer.id !== id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleSave = async (data) => {
    const updatedCustomer = { ...selectedCustomer, ...data };
    try {
      await axios.put(
        `http://localhost:8081/updateCustomer/${updatedCustomer.id}`,
        updatedCustomer
      );
      setCustomers(
        customers.map((customer) =>
          customer.id === updatedCustomer.id ? updatedCustomer : customer
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const handleEditClick = (customer) => {
    setSelectedCustomer(customer);
    Object.keys(customer).forEach((key) => setValue(key, customer[key]));
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Customer List</h3>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Mobile Number</th>
            <th className="py-2 px-4 border-b">Purchase Car ID</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="py-2 px-4 border-b">{customer.id}</td>
              <td className="py-2 px-4 border-b">{customer.name}</td>
              <td className="py-2 px-4 border-b">{customer.email}</td>
              <td className="py-2 px-4 border-b">{customer.address}</td>
              <td className="py-2 px-4 border-b">{customer.mobile_number}</td>
              <td className="py-2 px-4 border-b">{customer.purchase_car_id}</td>
              <td>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEditClick(customer)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteClick(customer)}
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
        title="Edit Customer"
      >
        {selectedCustomer && (
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
              Email:
              <input
                type="email"
                {...register("email")}
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
              Purchase Car ID:
              <input
                type="text"
                {...register("purchase_car_id")}
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
          Are you sure you want to delete the customer {selectedCustomer?.name}?
        </p>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => handleDelete(selectedCustomer.id)}
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

export default CustomerList;
