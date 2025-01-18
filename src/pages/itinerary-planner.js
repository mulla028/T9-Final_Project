import { Container, Row, Col, Button, Form, ListGroup } from 'react-bootstrap';
import { FaCar, FaBiking, FaWalking, FaBus } from 'react-icons/fa';

const ItineraryPlanner = () => {
    const stops = ['Bali, Indonesia', 'Kyoto, Japan', 'Tuscany, Italy'];

    return (
        <Container className="itinerary-planner" style={{ marginTop: '60px' }}>
            {/* Hero Section */}
            <div className="hero">
                <h1>Plan Your Eco-Friendly Adventure</h1>
                <p>Curate personalized itineraries with sustainable travel options.</p>
            </div>

            <Row className="mt-5">
                {/* Interactive Map Section */}
                <Col md={8}>
                    <div className="map-view">
                        <img
                            src="https://www.flashpackingjapan.com/wp-content/uploads/2022/10/kyoto-map-with-attractions-japan-1-.jpeg"
                            alt="Map of Bali"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <Button className="map-control">Current Location</Button>
                    </div>
                </Col>

                {/* Sidebar: Itinerary Stops and Options */}
                <Col md={4}>
                    <h4>Itinerary Stops</h4>
                    <ListGroup className="mb-3">
                        {stops.map((stop, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                <img
                                    src={`/images/stop${index + 1}.jpg`}
                                    alt={stop}
                                    style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                />
                                <div>
                                    <strong>{stop}</strong>
                                    <p className="small text-muted">1h 30min</p>
                                </div>
                                <Button variant="outline-danger" size="sm">Remove</Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    {/* Add Stop Input */}
                    <Form className="mb-3">
                        <Form.Control type="text" placeholder="Add a new stop" className="mb-2" />
                        <Button variant="outline-success" className="w-100">Add Stop</Button>
                    </Form>

                    {/* Travel Mode Options */}
                    <h4>Travel Mode</h4>
                    <div className="d-flex justify-content-between mb-4">
                        <Button variant="outline-secondary" className="mode-button">
                            <FaCar /> Drive
                        </Button>
                        <Button variant="outline-secondary" className="mode-button">
                            <FaBiking /> Bike
                        </Button>
                        <Button variant="outline-secondary" className="mode-button">
                            <FaWalking /> Walk
                        </Button>
                        <Button variant="outline-secondary" className="mode-button">
                            <FaBus /> Public Transport
                        </Button>
                    </div>

                    {/* Save Itinerary */}
                    <Button variant="primary" className="w-100">Save Itinerary</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ItineraryPlanner;
