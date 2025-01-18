import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const FeedbackForm = () => {
    const pastReviews = [
        { title: 'Eco Haven Resort', rating: '4.5/5', comment: 'Fantastic stay with great eco-friendly practices!' },
        { title: 'Local Market Tour', rating: '4.8/5', comment: 'Amazing experience with authentic local food.' }
    ];

    return (
        <Container className="feedback-form" style={{ marginTop: '60px' }}>
            <h2 className="text-center mb-4">Leave a Review</h2>
            <Row>
                <Col md={6} className="mx-auto">
                    {/* Feedback Form */}
                    <Card className="mb-4">
                        <Card.Body>
                            <Card.Title>Share Your Experience</Card.Title>
                            <Form>
                                <Form.Group controlId="experienceTitle" className="mb-3">
                                    <Form.Label>Experience</Form.Label>
                                    <Form.Control as="select">
                                        <option>Eco Haven Resort</option>
                                        <option>Local Market Tour</option>
                                        <option>Pottery Workshop</option>
                                    </Form.Control>
                                </Form.Group>

                                {/* Star Rating */}
                                <Form.Group controlId="rating" className="mb-3">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control as="select">
                                        <option>5 Stars</option>
                                        <option>4 Stars</option>
                                        <option>3 Stars</option>
                                        <option>2 Stars</option>
                                        <option>1 Star</option>
                                    </Form.Control>
                                </Form.Group>

                                {/* Comment Box */}
                                <Form.Group controlId="reviewComment" className="mb-4">
                                    <Form.Label>Comments</Form.Label>
                                    <Form.Control as="textarea" rows={4} placeholder="Write your review here..." />
                                </Form.Group>

                                {/* Submit Button */}
                                <Button variant="primary" className="w-100">Submit Review</Button>
                            </Form>
                        </Card.Body>
                    </Card>

                    {/* Past Reviews */}
                    <h4 className="mb-4">Your Past Reviews</h4>
                    {pastReviews.map((review, index) => (
                        <Card key={index} className="mb-3">
                            <Card.Body>
                                <Card.Title>{review.title}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Rating: {review.rating}</Card.Subtitle>
                                <Card.Text>{review.comment}</Card.Text>
                            </Card.Body>
                        </Card>
                    ))}
                </Col>
            </Row>
        </Container>
    );
};

export default FeedbackForm;
