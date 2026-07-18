import { useEffect, useState } from "react";
import {getCustomers, deleteCustomer} from "../services/customerService";
import CustomerForm from './CustomerForm';
import CustomerItem from './CustomerItem';
import DashboardStats from './DashboardStats';
import { Table, Card, Form, Row, Col,Button } from 'react-bootstrap';

function CustomerList(){
    const [customers, setCustomers] = useState([]);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [planFilter, setPlanFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchCustomers = async () =>{
        const res = await getCustomers();
        setCustomers(res.data);
    };

    useEffect(()=>{fetchCustomers(); },[]);

    const handleDelete = async (id)=>{
        await deleteCustomer(id);
        fetchCustomers();
    };
    const handleEdit = (customer) => setEditingCustomer(customer);
    const handleCancelEdit = () => setEditingCustomer(null);

    // Filter the list based on search text AND selected plan
    const filteredCustomers = customers.filter((c) => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                               c.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPlan = planFilter === 'All' || c.subscriptionType === planFilter;
        return matchesSearch && matchesPlan;
    });

    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);
    
    useEffect(() => {setCurrentPage(1); }, [searchTerm, planFilter]);

    return(
        <div>
            <h2 className="mb-3">Customer Management</h2>
            <DashboardStats customers={customers} />
            <CustomerForm onAdded={fetchCustomers}
                editingCustomer={editingCustomer}
                onCancelEdit={handleCancelEdit}/>

            <Row className="mb-3 g-2">
              <Col md={8}>
                <Form.Control
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <Form.Select value={planFilter} onChange={(e) => setPlanFilter(e.target.value)}>
                  <option value="All">All Plans</option>
                  <option value="Basic">Basic</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                </Form.Select>
              </Col>
            </Row>

            <Card className="shadow-sm">
              <Table hover responsive className="mb-0">
                <thead className="table-primary">
                    <tr><th>Name</th><th>Email</th><th>Phone</th><th>Plan</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {paginatedCustomers.map((c) => (
                    <CustomerItem
                      key={c._id}
                      customer={c}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))}
                </tbody>
              </Table>
              {filteredCustomers.length === 0 && (
                <div className="text-center text-muted p-3">No customers match your search.</div>
              )}
            </Card>
    {totalPages > 1 && (
    <div className="d-flex justify-content-center gap-2 mt-3">
    <Button
      size="sm"
      variant="outline-primary"
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(currentPage - 1)}
    >
      Previous
    </Button>
    <span className="align-self-center">Page {currentPage} of {totalPages}</span>
    <Button
      size="sm"
      variant="outline-primary"
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(currentPage + 1)}
    >
      Next
    </Button>

  </div>
)}
        </div>
    );
}
export default CustomerList;