const Customer = require('../models/Customer');

// Get all customers
exports.getCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
};

// Get single customer
exports.getCustomer = async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).json({ message: 'Not found' });
  res.json(customer);
};

// Create customer
exports.createCustomer = async (req, res) => {
  const customer = new Customer(req.body);
  const saved = await customer.save();
  res.status(201).json(saved);
};

// Update customer
exports.updateCustomer = async (req, res) => {
  const updated = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: 'Customer deleted' });
};