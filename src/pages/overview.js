import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';

const ItineraryOverview = () => {
    const itinerary = [
        { day: 1, stops: ['Green Haven Hotel', 'Local Market Tour', 'Sunset Viewpoint'] },
        { day: 2, stops: ['Cultural Village Visit', 'Eco-friendly Café', 'Artisan Workshop'] }
    ];

    return (
        <Container className="itinerary-overview" style={{ marginTop: '60px' }}>
            <h2 className="text-center mb-4">Your Itinerary Overview</h2>
            <Row>
                {itinerary.map((dayPlan, index) => (
                    <Col md={6} key={index}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>Day {dayPlan.day}</Card.Title>
                                <ListGroup variant="flush">
                                    {dayPlan.stops.map((stop, stopIndex) => (
                                        <ListGroup.Item key={stopIndex}>{stop}</ListGroup.Item>
                                    ))}
                                </ListGroup>
                                <Button variant="outline-primary" className="mt-3 w-100">Edit Day {dayPlan.day}</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Share & Download Options */}
            <div className="text-center mt-5">
                <Button variant="success" className="mr-3">Download Itinerary</Button>
                <Button variant="primary">Share Itinerary</Button>
            </div>
        </Container>
    );
};

export default ItineraryOverview;
