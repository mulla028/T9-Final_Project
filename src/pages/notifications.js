import { Container, Row, Col, ListGroup, Button, Badge } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

const NotificationsPanel = () => {
    const notifications = [
        { type: 'Booking Confirmation', description: 'Your booking at Eco Haven Resort is confirmed!', timestamp: '2 hours ago', icon: <FaCheckCircle color="green" /> },
        { type: 'Itinerary Change', description: 'Your friend added a new stop: Local Market Tour.', timestamp: '3 hours ago', icon: <FaExclamationCircle color="orange" /> },
        { type: 'Promotion', description: '20% off on eco-tours in Bali. Book now!', timestamp: '1 day ago', icon: <FaInfoCircle color="blue" /> }
    ];

    return (
        <Container className="notifications-panel" style={{ marginTop: '60px' }}>
            <h2 className="text-center mb-4">Notifications</h2>
            <Row>
                <Col md={8} className="mx-auto">
                    <ListGroup>
                        {notifications.map((notification, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                {/* Icon and Description */}
                                <div>
                                    <span className="mr-3">{notification.icon}</span>
                                    <strong>{notification.type}</strong>: {notification.description}
                                    <br />
                                    <small className="text-muted">{notification.timestamp}</small>
                                </div>

                                {/* Action Buttons */}
                                <div>
                                    <Button variant="outline-primary" size="sm" className="mr-2">View Details</Button>
                                    <Button variant="outline-danger" size="sm">Dismiss</Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    );
};

export default NotificationsPanel;
