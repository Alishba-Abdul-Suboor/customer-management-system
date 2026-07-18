import { Card, Row, Col } from 'react-bootstrap';

function DashboardStats({ customers }) {
  const total = customers.length;
  const basicCount = customers.filter(c => c.subscriptionType === 'Basic').length;
  const standardCount = customers.filter(c => c.subscriptionType === 'Standard').length;
  const premiumCount = customers.filter(c => c.subscriptionType === 'Premium').length;

  const stats = [
    { label: 'Total Customers', value: total, color: 'primary' },
    { label: 'Basic Plan', value: basicCount, color: 'secondary' },
    { label: 'Standard Plan', value: standardCount, color: 'info' },
    { label: 'Premium Plan', value: premiumCount, color: 'dark' },
  ];

  return (
    <Row className="mb-4 g-3">
      {stats.map((s) => (
        <Col md={3} key={s.label}>
          <Card bg={s.color} text="white" className="text-center shadow-sm">
            <Card.Body>
              <Card.Title style={{ fontSize: '28px' }}>{s.value}</Card.Title>
              <Card.Text>{s.label}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default DashboardStats;