import { useState } from 'react';
import axios from 'axios';
import logo from '../assets/my-people-logo.svg';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      onLoginSuccess();
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container style={{ maxWidth: '400px', marginTop: '80px' }}>
       
      <Card className="p-4 shadow-sm">
        <div className="text-center mb-3">
        <img src={logo} alt="My People logo" style={{ height: '100px' }} />
        </div>
        <Card.Title className="mb-3 text-center">Login</Card.Title>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Control
            className="mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Form.Control
            className="mb-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="primary" className="w-100">Login</Button>
        </Form>
      </Card>
      
    </Container>
  );
}

export default Login;