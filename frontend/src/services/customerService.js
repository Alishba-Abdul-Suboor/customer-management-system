import axios from 'axios';

const API_URL = 'http://localhost:5000/api/customers';

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getCustomers = () => axios.get(API_URL, authHeader());
export const createCustomer = (data) => axios.post(API_URL, data, authHeader());
export const updateCustomer = (id, data) => axios.put(`${API_URL}/${id}`, data, authHeader());
export const deleteCustomer = (id) => axios.delete(`${API_URL}/${id}`, authHeader());