import { useState, useEffect } from "react";
import { createCustomer, updateCustomer } from "../services/customerService";
import { Form, Row, Col, Button, Card } from 'react-bootstrap';


function CustomerForm ({onAdded, editingCustomer, onCancelEdit}){
    const [form, setForm] = useState ({name: '', email: '', phone: '', subscriptionType: 'Basic' });
    useEffect(() => {
    if (editingCustomer) {
      setForm(editingCustomer);
    } else {
      setForm({ name: '', email: '', phone: '', subscriptionType: 'Basic' });
    }
    }, [editingCustomer]);


    const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value});
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if (editingCustomer) {
          await updateCustomer(editingCustomer._id, form);
          onCancelEdit(); // exit edit mode after saving
         } else {
             await createCustomer(form);
         }

        setForm({name: '', email: '', phone: '', subscriptionType: 'Basic'});
        onAdded();
    };

    return (
        <Card className="mb-4 p-3 shadow-sm">
          <Card.Body>
            <Card.Title>{editingCustomer ? 'Edit Customer' : 'Add New Customer'}</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Row className="g-2 align-items-end">
                <Col md={3}>
                  <Form.Control name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
                </Col>
                <Col md={3}>
                  <Form.Control name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
                </Col>
                <Col md={2}>
                  <Form.Control name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
                </Col>
                <Col md={2}>
                  <Form.Select name="subscriptionType" value={form.subscriptionType} onChange={handleChange}>
                    <option>Basic</option>
                    <option>Standard</option>
                    <option>Premium</option>
                  </Form.Select>
                </Col>
                <Col md={2} className="d-flex gap-2">
                  <Button type="submit" variant="primary">
                    {editingCustomer ? 'Update' : 'Add'}
                  </Button>
                  {editingCustomer && (
                    <Button type="button" variant="secondary" onClick={onCancelEdit}>Cancel</Button>
                  )}
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
    );
}
export default CustomerForm;