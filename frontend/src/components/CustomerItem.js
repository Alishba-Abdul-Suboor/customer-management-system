import { Badge, Button } from 'react-bootstrap';

const badgeVariant = {
  Basic: 'secondary',
  Standard: 'info',
  Premium: 'primary'
};

function CustomerItem({ customer, onEdit, onDelete }) {
  return (
    <tr>
      <td>{customer.name}</td>
      <td>{customer.email}</td>
      <td>{customer.phone}</td>
      <td><Badge bg={badgeVariant[customer.subscriptionType]}>{customer.subscriptionType}</Badge></td>
      <td>
        <Button size="sm" variant="outline-primary" className="me-2" onClick={() => onEdit(customer)}>Edit</Button>
        <Button size="sm" variant="outline-danger" onClick={() => onDelete(customer._id)}>Delete</Button>
      </td>
    </tr>
  );
}

export default CustomerItem;