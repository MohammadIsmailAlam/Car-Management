import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import "../Style/OwnerList.css"; // Import the CSS file for styling
import Modal from './../Modals/Modal';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

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

  const handleSave = async (updatedCustomer) => {
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
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (customer) => {
    setSelectedCustomer(customer);
    setIsDeleteModalOpen(true);
  };

  return (
    <div
      className={`owner-list ${
        isEditModalOpen || isDeleteModalOpen ? "blurred" : ""
      }`}
    >
      <h3>Customer List</h3>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Mobile Number</th>
            <th>Purchase Car ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.address}</td>
              <td>{customer.mobile_number}</td>
              <td>{customer.purchase_car_id}</td>
              <td>
                <button onClick={() => handleEditClick(customer)}>Edit</button>
                <button onClick={() => handleDeleteClick(customer)}>
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
          <form>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={selectedCustomer.name}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    name: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={selectedCustomer.email}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    email: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={selectedCustomer.address}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
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
                value={selectedCustomer.mobile_number}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    mobile_number: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Purchase Car ID:
              <input
                type="text"
                name="purchase_car_id"
                value={selectedCustomer.purchase_car_id}
                onChange={(e) =>
                  setSelectedCustomer({
                    ...selectedCustomer,
                    purchase_car_id: e.target.value,
                  })
                }
              />
            </label>
            <button type="button" onClick={() => handleSave(selectedCustomer)}>
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
        <button onClick={() => handleDelete(selectedCustomer.id)}>
          Delete
        </button>
        <button onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
      </Modal>
    </div>
  );
};

export default CustomerList;
