import React from 'react';
import { Container, Row, Col, Card, ProgressBar, ListGroup } from 'react-bootstrap';
import { FaLeaf, FaCar, FaBiking } from 'react-icons/fa';
import TravelModeInsights from '@/components/TravelModeInsights';

const ImpactDashboard = () => {
    return (
        <Container className="impact-dashboard mt-5">
            <h1 className="text-center mb-5">Environmental Impact Dashboard</h1>

            {/* Carbon Footprint Overview */}
            <Row className="mb-5">
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-muted">Carbon Footprint</Card.Title>
                            <h2 className="display-6">18.5 kg CO<sub>2</sub></h2>
                            <ProgressBar
                                now={60}
                                label="60% of typical trip"
                                className="mt-3"
                                style={{ height: '1rem' }}
                                variant="success"
                            />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-muted">Travel Distance & Speed</Card.Title>
                            <h2 className="display-6">245 km @ 60 km/h</h2>
                            <p className="text-muted">Average Speed: 60 km/h</p>
                            <ProgressBar
                                now={40}
                                label="Moderate Impact"
                                className="mt-3"
                                style={{ height: '1rem' }}
                                variant="warning"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Travel Mode Analysis */}
            <Row className="mb-5">
                <Col>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-muted">Travel Mode Analysis</Card.Title>
                            <Row className="text-center">
                                <Col md={4}>
                                    <FaCar size={50} color="#28a745" />
                                    <p>Car: <strong>12.5 kg CO<sub>2</sub></strong></p>
                                </Col>
                                <Col md={4}>
                                    <FaBiking size={50} color="#ffc107" />
                                    <p>Bike: <strong>2.3 kg CO<sub>2</sub></strong></p>
                                </Col>
                                <Col md={4}>
                                    <FaLeaf size={50} color="#17a2b8" />
                                    <p>Walking: <strong>0 kg CO<sub>2</sub></strong></p>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Impact Insights & Past Trip Comparisons */}
            <Row className="mb-5">
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-muted">Impact Insights</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item>Your trip emitted 30% less CO<sub>2</sub> than average car travel.</ListGroup.Item>
                                <ListGroup.Item>Consider biking instead of driving for shorter distances.</ListGroup.Item>
                                <ListGroup.Item>Using public transport could reduce your impact by 20%.</ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="shadow-sm">
                        <Card.Body>
                            <Card.Title className="text-muted">Past Trip Comparisons</Card.Title>
                            <p>Current Trip: <strong>18.5 kg CO<sub>2</sub></strong></p>
                            <p>Last Trip: <strong>24 kg CO<sub>2</sub></strong></p>
                            <ProgressBar
                                now={60}
                                label="25% Lower"
                                className="mt-3"
                                style={{ height: '1rem' }}
                                variant="info"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Travel Mode Insights Sub-Component */}
            <TravelModeInsights />
        </Container>
    );
};

export default ImpactDashboard;
