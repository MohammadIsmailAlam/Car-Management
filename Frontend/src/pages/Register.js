import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import "../Style/login.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [errorMessage, setErrorMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      setErrorMessage("Passwords do not match");
    } else {
      try {
        const response = await axios.post("http://localhost:8081/createUser", {
          name: data.name,
          address: data.address,
          email: data.email,
          password: data.password,
          mobile_number: data.mobileNumber,
        });

        if (response.status === 201) {
          setIsRegistered(true);
          alert("Registration successful!");
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.error || "Registration failed");
      }
    }
  };

  return (
    <div className="login">
      {isRegistered ? (
        <div className="login">
          <h2>Registration Successful!</h2>
          <p>Welcome!</p>
          <button onClick={() => navigate("/")}>Login Here</button>
        </div>
      ) : (
        <div className="login-form">
          <h2>Register</h2>
          {errorMessage && <div className="error">{errorMessage}</div>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <span className="error">{errors.name.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                {...register("address", { required: "Address is required" })}
              />
              {errors.address && (
                <span className="error">{errors.address.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="error">{errors.email.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <input
                type="text"
                id="mobileNumber"
                {...register("mobileNumber", {
                  required: "Mobile number is required",
                })}
              />
              {errors.mobileNumber && (
                <span className="error">{errors.mobileNumber.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="error">{errors.password.message}</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="error">{errors.confirmPassword.message}</span>
              )}
            </div>
            <button type="submit">Register</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;