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
  const [errorField, setErrorField] = useState(''); // Track which field has the error

  // Handle form input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
    // Clear error if the user starts typing in the field
    if (errorField === id && value) {
      setErrorField('');
    }
  };

  // Handle form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    if (!formData.username) {
      setErrorField('username');
      return;
    }
    if (!formData.email) {
      setErrorField('email');
      return;
    }
    if (!formData.phone) {
      setErrorField('phone');
      return;
    }
    if (!formData.dob) {
      setErrorField('dob');
      return;
    }

    // Validate email (must contain '@')
    if (!formData.email.includes('@')) {
      setErrorField('email');
      return;
    }

    // Validate phone number (must be 10 digits)
    if (!/^\d{10}$/.test(formData.phone)) {
      setErrorField('phone');
      return;
    }

    // Validate date of birth (cannot be in the future)
    const today = new Date();
    const dob = new Date(formData.dob);
    if (dob > today) {
      setErrorField('dob');
      return;
    }

    // If all validations pass, close the modal and reset the form
    setIsModalOpen(false);
    setFormData({
      username: '',
      email: '',
      phone: '',
      dob: ''
    });
    setErrorField('');
  };

  // Handle modal close when clicking outside
  const handleOutsideClick = (e) => {
    if (e.target.className === 'modal') {
      setIsModalOpen(false);
      setFormData({
        username: '',
        email: '',
        phone: '',
        dob: ''
      });
      setErrorField('');
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
              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errorField === 'username' && (
                  <div className="tooltip">
                    <span className="exclamation">!</span> Please fill out this field.
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Email Address:</label>
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errorField === 'email' && (
                  <div className="tooltip">
                    <span className="exclamation">!</span> Invalid email
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errorField === 'phone' && (
                  <div className="tooltip">
                    <span className="exclamation">!</span> Invalid phone number. Please enter a 10-digit phone number.
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errorField === 'dob' && (
                  <div className="tooltip">
                    <span className="exclamation">!</span> Invalid date of birth. Date of birth cannot be in the future.
                  </div>
                )}
              </div>

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