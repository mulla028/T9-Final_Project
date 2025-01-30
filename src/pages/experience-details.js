import { Container, Row, Col, Card, Carousel, Button, Form } from 'react-bootstrap';

const ExperienceDetails = () => {
    const images = [
        '/images/experience1.jpg',
        '/images/experience1b.jpg',
        '/images/experience1c.jpg'
    ];

    return (
        <Container className="experience-details" style={{ marginTop: '60px' }}>
            {/* Header Section */}
            <Row className="mb-4">
                <Col md={8}>
                    {/* Image Carousel */}
                    <Carousel>
                        {images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img src={image} className="d-block w-100" alt={`Slide ${index}`} style={{ height: '400px', objectFit: 'cover' }} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </Col>
                {/* Experience Info Section */}
                <Col md={4}>
                    <h2>Traditional Pottery Workshop</h2>
                    <p><strong>Category:</strong> Workshop</p>
                    <p><strong>Rating:</strong> 4.8/5</p>
                    <p><strong>Price:</strong> $50 per person</p>
                    <Button variant="primary" className="w-100">Book Now</Button>
                </Col>
            </Row>

            {/* Experience Description Section */}
            <Row>
                <Col md={8}>
                    <h3>Description</h3>
                    <p>
                        Join us for a hands-on traditional pottery workshop led by local artisans. Learn the ancient art of pottery making using eco-friendly techniques and materials.
                    </p>

                    {/* Booking Options */}
                    <h4>Booking Options</h4>
                    <Form>
                        <Form.Group controlId="selectDate" className="mb-3">
                            <Form.Label>Select Date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>
                        <Form.Group controlId="guestCount" className="mb-3">
                            <Form.Label>Number of Guests</Form.Label>
                            <Form.Control type="number" min="1" placeholder="1" />
                        </Form.Group>
                        <Button variant="success" className="w-100">Check Availability</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ExperienceDetails;
