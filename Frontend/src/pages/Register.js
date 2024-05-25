import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredName, setRegisteredName] = useState(''); // New state for storing the registered name
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, address, email, mobileNumber, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    } else {
      try {
        const response = await axios.post('http://localhost:8081/createUser', {
          name,
          address,
          email,
          password,
          mobile_number: mobileNumber
        });

        if (response.status === 201) {
          login({ email });
          setIsRegistered(true);
          setRegisteredName(name); // Store the registered name
          alert('Registration successful!');
        }
      } catch (error) {
        setErrorMessage(error.response.data.error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isRegistered ? (
        <div className="text-center bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Registration Successful!</h2>
          <p>Welcome, {registeredName}!</p> {/* Use the stored registered name */}
          <button 
            onClick={() => navigate('/')} 
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Login Here
          </button>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Register</h2>
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700">Name:</label>
              <input
                type="text"
                id="name"
                {...register('name', { required: true })}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-700">Address:</label>
              <input
                type="text"
                id="address"
                {...register('address', { required: true })}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              {errors.address && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700">Email:</label>
              <input
                type="email"
                id="email"
                {...register('email', { required: true })}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div>
              <label htmlFor="mobileNumber" className="block text-gray-700">Mobile Number:</label>
              <input
                type="text"
                id="mobileNumber"
                {...register('mobileNumber', { required: true })}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              {errors.mobileNumber && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">Password:</label>
              <input
                type="password"
                id="password"
                {...register('password', { required: true })}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              {errors.password && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                {...register('confirmPassword', { required: true })}
                className="w-full p-2 border border-gray-300 rounded mt-1"
              />
              {errors.confirmPassword && <span className="text-red-500 text-sm">This field is required</span>}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">Register</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
