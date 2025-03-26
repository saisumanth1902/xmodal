import React, { useState } from 'react';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username) {
      alert('Please fill out this field.');
      return;
    }
    if (!formData.email) {
      alert('Please fill out this field.');
      return;
    }
    if (!formData.phone) {
      alert('Please fill out this field.');
      return;
    }
    if (!formData.dob) {
      alert('Please fill out this field.');
      return;
    }

    if (!formData.email.includes('@')) {
      alert('Invalid email. Please check your email address.');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      alert('Invalid phone number. Please enter a 10-digit phone number.');
      return;
    }

    const today = new Date();
    const dob = new Date(formData.dob);
    if (dob > today) {
      alert('Invalid date of birth. Date of birth cannot be in the future.');
      return;
    }

    setIsModalOpen(false);
    setFormData({
      username: '',
      email: '',
      phone: '',
      dob: ''
    });
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === 'modal') {
      setIsModalOpen(false);
      setFormData({
        username: '',
        email: '',
        phone: '',
        dob: ''
      });
    }
  };

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button onClick={() => setIsModalOpen(true)}>Open Form</button>

      {isModalOpen && (
        <div className="modal" onClick={handleOutsideClick}>
          <div className="modal-content">
            <h2>Fill Details</h2>
            <form onSubmit={handleSubmit}>
              <label>Username:</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
              />

              <label>Email Address:</label>
              <input
                type="text"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />

              <label>Phone Number:</label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
              />

              <label>Date of Birth:</label>
              <input
                type="date"
                id="dob"
                value={formData.dob}
                onChange={handleChange}
              />

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;