import { Container, Row, Col } from 'react-bootstrap';
import { FaMapMarkerAlt, FaCalendarAlt, FaStore, FaLeaf } from 'react-icons/fa';

const HowDriftWayWorks = () => {
    return (
        <div className="how-it-works" style={{ padding: '60px 0' }}>
            <Container>
                <h2 className="text-center mb-4">How DriftWay Works</h2>
                <Row>
                    <Col md={3} className="text-center">
                        <FaMapMarkerAlt size={50} color="#17a2b8" />
                        <h4>Choose Your Destination</h4>
                        <p>Find places that welcome slow travelers and offer unique experiences.</p>
                    </Col>
                    <Col md={3} className="text-center">
                        <FaCalendarAlt size={50} color="#28a745" />
                        <h4>Plan an Eco-Conscious Itinerary</h4>
                        <p>Select long stays, slow transport, and sustainable accommodations.</p>
                    </Col>
                    <Col md={3} className="text-center">
                        <FaStore size={50} color="#ffc107" />
                        <h4>Discover Local Experiences</h4>
                        <p>Explore local businesses and culturally immersive activities.</p>
                    </Col>
                    <Col md={3} className="text-center">
                        <FaLeaf size={50} color="#dc3545" />
                        <h4>Track Your Impact</h4>
                        <p>Monitor your carbon footprint and get tips to reduce it.</p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default HowDriftWayWorks;