import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [user, setUser] = useState({ fullname: '', email: '', username: '', password: '' });
  const [errors, setErrors] = useState({});

  const handlesubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    const emailPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    if (!user.fullname) validationErrors.fullname = "Name cannot be empty";
    if (!user.email) validationErrors.email = "Email cannot be empty";
    else if (!emailPattern.test(user.email)) validationErrors.email = "Invalid Email";
    if (!user.username) validationErrors.username = "Username cannot be empty";
    if (!user.password) validationErrors.password = "Password cannot be empty";
    else if (!passwordPattern.test(user.password)) validationErrors.password = "Password must include 1 caps, 1 special char and be 8+ chars";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/user/register', {
        name: user.fullname,
        email: user.email,
        username: user.username,
        password: user.password,
      });

      toast.success(response.data.message || "Registered successfully");
      setUser({ fullname: '', email: "", username: '', password: '' });
      setErrors({});
    } catch (err) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    }
  };

  return (
    <div className="container w-100">
      <h3 className="text-center p-2 text-bg-warning my-3">Registration</h3>
      <form onSubmit={handlesubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="fullname" className="form-label">Full Name</label>
          <input
            id="fullname"
            type="text"
            className={`form-control ${errors.fullname ? 'is-invalid' : user.fullname ? 'is-valid' : ''}`}
            placeholder="john doe"
            onChange={(e) => setUser({ ...user, fullname: e.target.value })}
            value={user.fullname}
          />
          {errors.fullname && <div className="invalid-feedback">{errors.fullname}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            className={`form-control ${errors.email ? 'is-invalid' : user.email ? 'is-valid' : ''}`}
            placeholder="john@gmail.com"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            value={user.email}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">User Name</label>
          <input
            id="username"
            type="text"
            className={`form-control ${errors.username ? 'is-invalid' : user.username ? 'is-valid' : ''}`}
            placeholder="johndoe123"
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            value={user.username}
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            id="password"
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : user.password ? 'is-valid' : ''}`}
            placeholder="password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            value={user.password}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100">Register</button>
        <ToastContainer />
      </form>
    </div>
  );
}

export default Register;
