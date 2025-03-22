import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    BirthDate: '', // Date of Birth
    confirmPassword: '',
    role: 'student', // User role (default: student)
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Update form fields on change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Data to be sent to the server
      const data = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        birth_date: formData.BirthDate, // Ensure this matches the server's expected field name
        password_confirmation: formData.confirmPassword,
        role: formData.role,
      };

      console.log('Sending data:', data); // Debugging

      // Send POST request to the server
      const response = await axios.post('http://127.0.0.1:8000/api/register', data, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      console.log('✅ Server response:', response.data); // Debugging

      // If the response contains a success message
      if (response.data.message === 'User registered successfully. Check your email for the verification code.') {
        alert('Registration successful! Please check your email for the verification code.');
        localStorage.setItem('email', formData.email); // Save email in localStorage
        navigate('/Verify'); // Navigate to the verification page
      } else {
        alert('Registration failed: ' + response.data.message);
      }
    } catch (error) {
      console.error('❌ Registration failed:', error.response?.data); // Debugging

      // Display error messages from the server
      if (error.response?.data?.errors) {
        const errorMessages = Object.values(error.response.data.errors)
          .flat()
          .join('\n');
        alert(errorMessages);
      } else {
        alert('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register">
      <div className="Welcome">
        <div className="circle yellow-circle"></div>
        <div className="circle blue-circle"></div>
        <h2 className="Title">Welcome to ASPU Hub</h2>
        <p className="explain">
          Welcome to ASPU Hub, the perfect platform to manage your accounts and access our services with ease.
        </p>
      </div>

      <div className="Accounts">
        <h1 className="Title">Create a New Account</h1>
        <h3>Create Your Account</h3>
        <form onSubmit={handleSubmit}>
          {/* Email field */}
          <input
            className="same"
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* First Name field */}
          <input
            className="Test"
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          {/* Last Name field */}
          <input
            className="Test"
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          {/* Date of Birth field */}
          <input
            className="same"
            type="date"
            placeholder="Date of Birth"
            name="BirthDate"
            value={formData.BirthDate}
            onChange={handleChange}
            required
          />

          {/* Role selection field */}
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="student">Student</option>
            <option value="superadmin">Super Admin</option>
            <option value="admin">Admin</option>
          </select>

          {/* Password field */}
          <input
            className="same"
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {/* Confirm Password field */}
          <input
            className="same"
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {/* Register button */}
          <button className="RegisterBtn" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Terms and Conditions agreement */}
        <div className="agree">
          <input className="check" type="checkbox" required />
          <label htmlFor="agree">I agree to the terms and conditions</label>
        </div>

        {/* Login link */}
        <footer>
          Already have an account? <Link to="/login">Login</Link>
        </footer>
      </div>
    </div>
  );
};

export default Register;