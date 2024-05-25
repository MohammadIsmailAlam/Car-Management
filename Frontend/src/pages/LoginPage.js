import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';

const Login = () => {
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const adminCredentials = {
    email: 'admin@example.com',
    password: 'admin123'
  };

  const onSubmit = async (data) => {
    const { email, password, isAdmin } = data;

    if (isAdmin) {
      if (email === adminCredentials.email && password === adminCredentials.password) {
        login({ email, isAdmin: true });
        navigate('/admin');
      } else {
        alert('Invalid admin credentials!');
      }
    } else {
      try {
        const response = await axios.post('http://localhost:8081/login', {
          email,
          password
        });

        if (response.status === 200) {
          login({ email, isAdmin: false });
          navigate('/dashboard');
        }
      } catch (error) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
          </div>
          <div>
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              {...register('password', { required: true })}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {errors.password && <span className="text-red-500 text-sm">This field is required</span>}
          </div>
          <div>
            <label className="block text-gray-700">Admin Login:</label>
            <input
              type="checkbox"
              {...register('isAdmin')}
              className="mt-1"
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">Login</button>
        </form>
        <p className="mt-4 text-center">
          Don't have an account? <Link to="/reg" className="text-blue-500">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
