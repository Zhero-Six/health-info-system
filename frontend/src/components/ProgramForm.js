import React, { useState } from 'react';
import axios from 'axios';

/**
 * Form to create a new health program.
 */
const ProgramForm = () => {
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/programs`,
        formData,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Program created');
      setFormData({ name: '', description: '' });
    } catch {
      alert('Error creating program');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Program</h3>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <button type="submit">Create</button>
    </form>
  );
};

export default ProgramForm;