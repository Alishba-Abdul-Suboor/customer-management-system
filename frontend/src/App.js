import { useState } from 'react';
import { Container } from 'react-bootstrap';
import CustomerList from './components/CustomerList';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <Container className="my-4">
      <div className="bg-primary text-white p-4 rounded mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h2>Customer Management System</h2>
          <p className="mb-0">Manage customer records, subscriptions, and account status</p>
        </div>
        <button
          className="btn btn-light btn-sm"
          onClick={() => { localStorage.removeItem('token'); setIsLoggedIn(false); }}
        >
          Logout
        </button>
      </div>
      <CustomerList />
    </Container>
  );
}

export default App;