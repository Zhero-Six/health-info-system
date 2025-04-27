import React, { useState } from 'react';
import ClientForm from '../components/ClientForm';
import ClientList from '../components/ClientList';
import ProgramForm from '../components/ProgramForm';

/**
 * Home page displaying forms and client list.
 */
const Home = () => {
  const [token] = useState(localStorage.getItem('token'));

  if (!token) return <div><a href="/login">Please log in</a></div>;

  return (
    <div>
      <h1>Health Information System</h1>
      <button onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>
        Logout
      </button>
      <ProgramForm />
      <ClientForm />
      <ClientList />
    </div>
  );
};

export default Home;