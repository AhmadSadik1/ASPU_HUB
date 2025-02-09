import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './Register.css'
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Set loading state to true
    setLoading(true);
    setError('');

    try {
      // Send POST request to the backend API using axios
      const response = await axios.post('https://your-backend-api.com/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      // Handle successful response
      console.log('Registration successful:', response.data);
      alert('Registration successful!'); // Notify the user
      // Optionally, redirect the user to the login page or another page
    } catch (error) {
      // Handle errors
      console.error('Registration failed:', error);
      setError(error.response?.data?.message || 'Registration failed. Please try again.'); // Display error message
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="Welcome">
        <div className="circle yellow-circle"></div>
        <div className="circle blue-circle"></div>
        <h2 className="Title">Welcome to ASPU hub</h2>
        <p className="explain">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, aliquam ab dolores quod atque excepturi ut
          aperiam commodi veritatis tempore architecto ipsum, repellendus ullam. Sit sint rerum quibusdam. Labore,
          aspernatur? asdoasjudklashdjkashjkdhsajhdjakshdkjashdasjkhdjskahdjkashdjkashd
        </p>
      </div>
      <div className="Accounts">
        <h1 className="Title">Register</h1>
        <h3>Create Your account</h3>
        <form onSubmit={handleSubmit}>
          {/* EMAIL */}
          <input
            className="same"
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {/* FIRST NAME */}
          <input
            className="Test"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          {/* LAST NAME */}
          <input
            className="Test"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          {/* NUMBER OF HOURS */}
          <input className="same" type="number" placeholder="Number of Hours" required />
          {/* PASSWORD */}
          <input
            className="same"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {/* CONFIRM PASSWORD */}
          <input
            className="same"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button className="RegisterBtn" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="agree">
          <input className="check" type="checkbox" required />
          <label htmlFor="agree">I agree with the app</label>
        </div>

        <footer>
          Already Have an Account? <Link to="/login">Log In</Link>
        </footer>
      </div>
    </div>
  );
};

export default Register;