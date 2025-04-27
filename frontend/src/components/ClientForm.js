import React, { useState } from 'react';
import axios from 'axios';

/**
 * Form to register a new client.
 */
const ClientForm = () => {
  const [formData, setFormData] = useState({ name: '', dob: '', contact: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/clients`,
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Client registered');
      setFormData({ name: '', dob: '', contact: '' });
    } catch {
      alert('Error registering client');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Register Client</h3>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="date"
        value={formData.dob}
        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
      />
      <input
        type="text"
        placeholder="Contact"
        value={formData.contact}
        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default ClientForm;