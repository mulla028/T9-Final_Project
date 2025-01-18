import { Container, Row, Col, Carousel, Button, Card, Form } from 'react-bootstrap';

const BookingDetails = () => {
    const images = [
        '/images/hotel1.jpg',
        '/images/hotel2.jpg',
        '/images/hotel3.jpg'
    ];

    const reviews = [
        { name: 'John Doe', rating: '4.5/5', comment: 'Beautiful stay with excellent eco-friendly practices!' },
        { name: 'Jane Smith', rating: '4.7/5', comment: 'Loved the local food and the sustainable approach.' }
    ];

    return (
        <Container className="booking-details" style={{ marginTop: '60px' }}>
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

                {/* Basic Info Section */}
                <Col md={4}>
                    <h2>Green Haven Hotel</h2>
                    <p><strong>Type:</strong> Hotel</p>
                    <p><strong>Rating:</strong> 4.5/5</p>
                    <p><strong>Location:</strong> Bali, Indonesia</p>
                    <Button variant="outline-success" className="w-100 mb-3">View on Map</Button>
                    <Button variant="primary" className="w-100">Book Now</Button>
                </Col>
            </Row>

            {/* Detailed Information Section */}
            <Row className="mt-5">
                <Col md={8}>
                    <h3>Description</h3>
                    <p>
                        The Green Haven Hotel offers a serene environment surrounded by lush greenery, focusing on sustainability and eco-friendly practices. Guests can enjoy organic dining, wellness activities, and direct access to beautiful hiking trails.
                    </p>

                    {/* Booking Form */}
                    <h4>Booking Options</h4>
                    <Form>
                        <Form.Group controlId="checkInDate" className="mb-3">
                            <Form.Label>Check-In Date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>

                        <Form.Group controlId="checkOutDate" className="mb-3">
                            <Form.Label>Check-Out Date</Form.Label>
                            <Form.Control type="date" />
                        </Form.Group>

                        <Form.Group controlId="guests" className="mb-3">
                            <Form.Label>Number of Guests</Form.Label>
                            <Form.Control type="number" min="1" placeholder="1" />
                        </Form.Group>

                        <Button variant="success" className="w-100">Check Availability</Button>
                    </Form>
                </Col>

                {/* Contact & Map Section */}
                <Col md={4}>
                    <h4>Contact Information</h4>
                    <p><strong>Phone:</strong> +123 456 7890</p>
                    <p><strong>Email:</strong> contact@greenhavenhotel.com</p>
                    <p><strong>Website:</strong> <a href="#">www.greenhavenhotel.com</a></p>

                    {/* Embedded Map */}
                    <div className="map-view mt-4" style={{ height: '300px', backgroundColor: '#e9ecef' }}>
                        <p className="text-center pt-5">Map Placeholder</p>
                    </div>
                </Col>
            </Row>

            {/* Reviews Section */}
            <Row className="mt-5">
                <Col>
                    <h4>User Reviews</h4>
                    {reviews.map((review, index) => (
                        <Card className="mb-3" key={index}>
                            <Card.Body>
                                <Card.Title>{review.name}</Card.Title>
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

export default BookingDetails;
