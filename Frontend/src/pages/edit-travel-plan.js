import { Container, Row, Col, Card, Button, Form, ListGroup } from 'react-bootstrap';

const CollaborativeItinerary = () => {
    const comments = [
        { user: 'John Doe', comment: 'Let’s add a lunch stop at an eco-friendly café!', time: '2 hours ago' },
        { user: 'Jane Smith', comment: 'Great idea! I’ll look for one in the area.', time: '1 hour ago' }
    ];

    return (
        <Container className="collaborative-itinerary" style={{ marginTop: '60px' }}>
            <h2 className="text-center mb-4">Collaborate on Your Itinerary</h2>
            <Row>
                <Col md={8}>
                    {/* Editable Itinerary Section */}
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Day 1: Bali, Indonesia</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                    Green Haven Hotel
                                    <Button variant="outline-danger" size="sm">Remove</Button>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                    Local Market Tour
                                    <Button variant="outline-danger" size="sm">Remove</Button>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                    Sunset Viewpoint
                                    <Button variant="outline-danger" size="sm">Remove</Button>
                                </ListGroup.Item>
                            </ListGroup>
                            <Button variant="outline-success" className="w-100 mt-3">Add Stop</Button>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Comments Section */}
                <Col md={4}>
                    <h4>Comments</h4>
                    <ListGroup className="mb-3">
                        {comments.map((comment, index) => (
                            <ListGroup.Item key={index}>
                                <strong>{comment.user}</strong> <span className="text-muted">- {comment.time}</span>
                                <p>{comment.comment}</p>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    {/* Add Comment */}
                    <Form>
                        <Form.Group controlId="commentText">
                            <Form.Control as="textarea" rows={3} placeholder="Leave a comment..." />
                        </Form.Group>
                        <Button variant="primary" className="w-100 mt-3">Add Comment</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default CollaborativeItinerary;
