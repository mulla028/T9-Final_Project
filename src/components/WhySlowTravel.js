import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaLeaf, FaGlobe, FaHandsHelping } from 'react-icons/fa';

const WhySlowTravel = () => {
    return (
        <div
            id="why-slow-travel" // Section ID for navigation
            className="why-slow-travel"
            style={{ padding: '60px 0', backgroundColor: '#f9f9f9' }}
        >
            <Container>
                <h2 className="text-center mb-4">Why Slow Travel Matters</h2>
                <Row>
                    <Col md={4} className="text-center">
                        <FaLeaf size={50} color="#28a745" />
                        <h3>Sustainability</h3>
                        <p>Focus on eco-friendly itineraries, carbon footprint reduction, and sustainable accommodations.</p>
                    </Col>
                    <Col md={4} className="text-center">
                        <FaGlobe size={50} color="#007bff" />
                        <h3>Cultural Immersion</h3>
                        <p>Connect deeply with local cultures and engage in respectful community experiences.</p>
                    </Col>
                    <Col md={4} className="text-center">
                        <FaHandsHelping size={50} color="#ffc107" />
                        <h3>Support Local</h3>
                        <p>Promote local businesses, homestays, and community-driven experiences for a more meaningful impact.</p>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center mt-5">
                    <Button variant="primary" size="lg" href="/booking" className="my-button">
                        Start Planning Your Trip
                    </Button>
                </div>
            </Container>
        </div>
    );
};

export default WhySlowTravel;