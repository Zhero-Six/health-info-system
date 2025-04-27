import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Component to list, search, and manage clients.
 */
const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [enrollProgramIds, setEnrollProgramIds] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/clients?q=${search}`);
        setClients(res.data);
      } catch {
        console.error('Error fetching clients');
      }
    };
    const fetchPrograms = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/programs`);
        setPrograms(res.data);
      } catch {
        console.error('Error fetching programs');
      }
    };
    fetchClients();
    fetchPrograms();
  }, [search]);

  const handleEnroll = async (clientId) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/clients/${clientId}/enroll`,
        { programIds: enrollProgramIds },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Client enrolled');
      viewProfile(clientId); // Refresh profile
    } catch {
      alert('Error enrolling client');
    }
  };

  const viewProfile = async (id) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/clients/${id}`);
      setSelectedClient(res.data);
    } catch {
      alert('Error fetching profile');
    }
  };

  return (
    <div>
      <h3>Clients</h3>
      <input
        type="text"
        placeholder="Search clients..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {clients.map(client => (
          <li key={client.id}>
            {client.name} <button onClick={() => viewProfile(client.id)}>View</button>
          </li>
        ))}
      </ul>
      {selectedClient && (
        <div>
          <h4>Profile: {selectedClient.name}</h4>
          <p>DOB: {selectedClient.dob}</p>
          <p>Contact: {selectedClient.contact}</p>
          <p>Programs: {selectedClient.Programs?.map(p => p.name).join(', ') || 'None'}</p>
          <select
            multiple
            value={enrollProgramIds}
            onChange={(e) => setEnrollProgramIds([...e.target.selectedOptions].map(o => o.value))}
          >
            {programs.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <button onClick={() => handleEnroll(selectedClient.id)}>Enroll</button>
        </div>
      )}
    </div>
  );
};

export default ClientList;