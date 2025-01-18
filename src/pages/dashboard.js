import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const PersonalizedDashboard = () => {
    const accommodations = [
        { image: '/images/accommodation1.jpg', name: 'Eco Haven Resort', location: 'Bali, Indonesia', rating: '4.8/5', ecoTagline: 'Carbon-neutral Stay' },
        { image: '/images/accommodation2.jpg', name: 'Green Retreat Hotel', location: 'Kyoto, Japan', rating: '4.7/5', ecoTagline: '100% Renewable Energy' }
    ];

    const experiences = [
        { image: '/images/experience1.jpg', name: 'Pottery Workshop', location: 'Tuscany, Italy', rating: '4.6/5', ecoTagline: 'Handmade & Organic' },
        { image: '/images/experience2.jpg', name: 'Farm-to-Table Dining', location: 'Kyoto, Japan', rating: '4.9/5', ecoTagline: 'Locally Sourced Ingredients' }
    ];

    const destinations = [
        { image: '/images/destination1.jpg', name: 'Costa Rica', rating: '5.0/5', ecoTagline: 'Biodiversity Hotspot' },
        { image: '/images/destination2.jpg', name: 'Patagonia, Argentina', rating: '4.9/5', ecoTagline: 'Untouched Wilderness' }
    ];

    return (
        <Container className="personalized-dashboard" style={{ marginTop: '60px' }}>
            <h2 className="text-center mb-4">Personalized Recommendations for You</h2>

            {/* Top Accommodations */}
            <h3 className="mb-4">Top Accommodations</h3>
            <Row className="mb-5">
                {accommodations.map((acc, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={acc.image} />
                            <Card.Body>
                                <Card.Title>{acc.name}</Card.Title>
                                <Card.Text>
                                    Location: {acc.location} <br />
                                    Rating: {acc.rating} <br />
                                    <strong>{acc.ecoTagline}</strong>
                                </Card.Text>
                                <Button variant="success" href="#/accommodation-details">View Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Top Experiences */}
            <h3 className="mb-4">Top Experiences</h3>
            <Row className="mb-5">
                {experiences.map((exp, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={exp.image} />
                            <Card.Body>
                                <Card.Title>{exp.name}</Card.Title>
                                <Card.Text>
                                    Location: {exp.location} <br />
                                    Rating: {exp.rating} <br />
                                    <strong>{exp.ecoTagline}</strong>
                                </Card.Text>
                                <Button variant="success" href="#/experience-details">View Details</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Suggested Destinations */}
            <h3 className="mb-4">Suggested Destinations</h3>
            <Row>
                {destinations.map((dest, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={dest.image} />
                            <Card.Body>
                                <Card.Title>{dest.name}</Card.Title>
                                <Card.Text>
                                    Rating: {dest.rating} <br />
                                    <strong>{dest.ecoTagline}</strong>
                                </Card.Text>
                                <Button variant="success" href="#/destination-details">Explore</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PersonalizedDashboard;
