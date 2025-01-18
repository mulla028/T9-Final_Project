import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaLeaf, FaBus, FaTrain, FaShip } from 'react-icons/fa';

const TravelModeInsights = () => {
    return (
        <Container className="travel-mode-insights mt-5">
            <h3 className="text-center mb-4">Travel Mode Insights</h3>
            <Row>
                {/* Eco-Tips Card */}
                <Col md={3} className="mb-4">
                    <Card>
                        <Card.Body className="text-center">
                            <FaLeaf size={50} color="#28a745" />
                            <Card.Title>Eco-Tips</Card.Title>
                            <Card.Text>Walking or biking has the lowest carbon impact.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Public Transport Card */}
                <Col md={3} className="mb-4">
                    <Card>
                        <Card.Body className="text-center">
                            <FaBus size={50} color="#ffc107" />
                            <Card.Title>Public Transport</Card.Title>
                            <Card.Text>Using public transport can reduce emissions by 50%.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Rail Travel Card */}
                <Col md={3} className="mb-4">
                    <Card>
                        <Card.Body className="text-center">
                            <FaTrain size={50} color="#007bff" />
                            <Card.Title>Rail Travel</Card.Title>
                            <Card.Text>Train travel is more eco-friendly for long distances.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Eco Cruises Card */}
                <Col md={3} className="mb-4">
                    <Card>
                        <Card.Body className="text-center">
                            <FaShip size={50} color="#17a2b8" />
                            <Card.Title>Eco Cruises</Card.Title>
                            <Card.Text>Choose eco-certified cruises to minimize marine impact.</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default TravelModeInsights;
