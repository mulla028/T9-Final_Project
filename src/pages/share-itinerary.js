import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaEnvelope, FaQrcode, FaDownload, FaMapMarkerAlt } from 'react-icons/fa';

const ShareItinerary = () => {
    const itinerary = [
        { day: 1, stops: ['Green Haven Hotel', 'Local Market Tour', 'Sunset Viewpoint'] },
        { day: 2, stops: ['Cultural Village Visit', 'Eco-friendly Café', 'Artisan Workshop'] }
    ];

    return (
        <>
            {/* Hero Section */}
            <div className="hero-section">
                <div className="overlay">
                    <h2 className="text-white text-center">Plan & Share Your Journey</h2>
                </div>
            </div>

            {/* Main Content */}
            <Container className="share-itinerary mt-5">
                <Row>
                    {/* Itinerary Section */}
                    <Col md={8}>
                        <Card className="itinerary-card mb-4">
                            <Card.Body>
                                <Card.Title className="mb-3">Your Travel Itinerary</Card.Title>
                                <p><strong>2 Days | 6 Stops | Bali, Indonesia</strong></p>
                                {/* Day-by-Day Breakdown */}
                                {itinerary.map((day, index) => (
                                    <div key={index} className="day-overview mb-4">
                                        <h5><FaMapMarkerAlt className="mr-2 text-primary" />Day {day.day}</h5>
                                        <ul className="itinerary-stops">
                                            {day.stops.map((stop, stopIndex) => (
                                                <li key={stopIndex}><FaMapMarkerAlt className="mr-2" />{stop}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                                <Button variant="success" className="w-100">View Full Map</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    {/* Sharing Options */}
                    <Col md={4}>
                        <div className="sharing-section">
                            <h4 className="mb-3">Share Itinerary</h4>
                            <Button variant="outline-primary" className="w-100 mb-3">
                                <FaEnvelope className="mr-2" /> Share via Email
                            </Button>
                            <Button variant="outline-info" className="w-100 mb-3">
                                <FaFacebook className="mr-2" /> Share on Facebook
                            </Button>
                            <Button variant="outline-info" className="w-100 mb-3">
                                <FaTwitter className="mr-2" /> Share on Twitter
                            </Button>
                            <Button variant="outline-secondary" className="w-100 mb-3">
                                <FaQrcode className="mr-2" /> Generate QR Code
                            </Button>

                            <Button variant="success" className="w-100 mt-4">
                                <FaDownload className="mr-2" /> Download as PDF
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ShareItinerary;
