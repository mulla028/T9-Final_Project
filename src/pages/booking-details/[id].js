import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Carousel, Button, Card, Form, Spinner } from "react-bootstrap";
import dynamic from "next/dynamic";
import { fetchPlaceDetails } from "@/services";

// Load Google Maps dynamically
const Map = dynamic(() => import("@/components/GoogleMap"), { ssr: false });

const BookingDetails = () => {
    const router = useRouter();
    const { id } = router.query;  // Extract place_id from the URL

    const [placeDetails, setPlaceDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);

    useEffect(() => {
        if (id) {
            // Fetch place details only if id is available
            fetchPlaceDetails(id)
                .then((data) => {
                    setPlaceDetails(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error fetching place details:", error);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <Spinner animation="border" className="d-block mx-auto mt-5" />;
    }

    if (!placeDetails) {
        return (
            <Container className="booking-details" style={{ marginTop: "60px" }}>
                <h2>Place details not found.</h2>
                <p>The place you are looking for may not exist or the ID is invalid.</p>
            </Container>
        );
    }

    return (
        <Container className="booking-details" style={{ marginTop: "60px" }}>
            {/* Header Section */}
            <Row className="mb-4">
                <Col md={8}>
                    <Carousel>
                        {placeDetails.images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    src={image}
                                    className="d-block w-100"
                                    alt={`Slide ${index}`}
                                    style={{ height: "550px", objectFit: "cover", borderRadius: "12px" }}
                                />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <div className="d-flex justify-content-between mt-5">
                        <p><strong>Rating:</strong> {placeDetails.rating} ⭐ ({placeDetails.userRatings} reviews)</p>
                    </div>
                </Col>

                {/* Contact Card */}
                <Col md={4}>
                    <Card className="p-3 shadow-sm mb-3">
                        <h4>Contact Information</h4>
                        <p><strong>Phone:</strong> {placeDetails.phone || "Not Available"}</p>
                        <p><strong>Email:</strong> {placeDetails.email || "Not Available"}</p>
                        <p><strong>Location:</strong> {placeDetails.address}</p>
                        <p><strong>Website:</strong> <a href={placeDetails.website} target="_blank">{placeDetails.website || "N/A"}</a></p>
                    </Card>

                    <Card className="p-3 shadow-sm mt-4">
                        <h4>Book Your Stay</h4>
                        <Form>
                            <Form.Group controlId="checkInDate" className="mb-3">
                                <Form.Label>Check-In Date</Form.Label>
                                <Form.Control type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
                            </Form.Group>

                            <Form.Group controlId="checkOutDate" className="mb-3">
                                <Form.Label>Check-Out Date</Form.Label>
                                <Form.Control type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
                            </Form.Group>

                            <Form.Group controlId="guests" className="mb-3">
                                <Form.Label>Number of Guests</Form.Label>
                                <Form.Control type="number" min="1" max="6" value={guests} onChange={(e) => setGuests(e.target.value)} required />
                            </Form.Group>

                            <Button variant="outline-primary" className="w-100 mb-3" onClick={() => router.push(placeDetails.mapUrl)}>View on Map</Button>
                            <Button variant="primary" className="w-100">Check Availability</Button>
                        </Form>
                    </Card>
                </Col>
            </Row>

            {/* Detailed Information Section */}
            <Row className="mt-5" id="details">
                <Col md={8}>
                    <h3>{placeDetails.name}</h3>
                    <p>{placeDetails.description || "No detailed description available."}</p>
                    <Card className="p-3 shadow-sm mt-3">
                        <Map lat={placeDetails.lat} lng={placeDetails.lng} />
                    </Card>
                </Col>
            </Row>

            {/* Reviews Section */}
            <Row className="mt-5">
                <Col>
                    <h4>User Reviews</h4>
                    {placeDetails.reviews.length > 0 ? placeDetails.reviews.map((review, index) => (
                        <Card className="mb-3 p-3 shadow-sm" key={index}>
                            <Card.Body>
                                <Card.Title>{review.author_name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Rating: {review.rating} ⭐</Card.Subtitle>
                                <Card.Text>{review.text}</Card.Text>
                            </Card.Body>
                        </Card>
                    )) : <p>No reviews available.</p>}
                </Col>
            </Row>
        </Container>
    );
};

export default BookingDetails;
