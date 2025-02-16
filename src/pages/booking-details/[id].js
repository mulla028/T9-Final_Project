import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Container, Row, Col, Carousel, Button, Card, Form, Spinner } from "react-bootstrap";
import dynamic from "next/dynamic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchPlaceDetails } from "@/services";

// Load Google Maps dynamically
const Map = dynamic(() => import("@/components/GoogleMap"), { ssr: false });

const BookingDetails = () => {
    const router = useRouter();
    const { id } = router.query; // Get place_id from URL

    const [placeDetails, setPlaceDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);

    useEffect(() => {
        if (id) {
            try {
                fetchPlaceDetails(id).then((data) => {
                    setPlaceDetails(data);
                    setLoading(false);
                });
            } catch (error) {
                console.error("Error fetching place details:", error);
                setLoading(false);
            }
        }
    }, [id]);

    if (loading) {
        return <Spinner animation="border" className="d-block mx-auto mt-5" />;
    }

    return (
        <Container className="booking-details" style={{ marginTop: "60px" }}>
            {/* Header Section */}
            <Row className="mb-4">
                <Col md={8}>
                    {/*Buttons for the user to navigate between the different sections*/}
                    <div className="d-flex justify-content-between mb-3">
                        <Button variant="success" onClick={() => router.push("#details")}>Back to Search</Button>
                        <Button variant="success" onClick={() => router.push('#')}>Details</Button>
                        <Button variant="success" onClick={() => router.push('#reviews')}>Reviews</Button>
                        <Button variant="success" onClick={() => router.push('#')}>Details</Button>
                    </div>
                    {/* Image Gallery with Modal */}
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

                    {/* Booking Card */}
                    {/* <Card className="p-3 shadow-lg">
                        <h2>{placeDetails.name}</h2>
                        <p><strong>Rating:</strong> {placeDetails.rating} ⭐ ({placeDetails.userRatings} reviews)</p>
                        <p><strong>Location:</strong> {placeDetails.address}</p>
                        <Button variant="outline-primary" className="w-100 mb-3" onClick={() => router.push(placeDetails.mapUrl)}>View on Map</Button>
                        <Button variant="success" className="w-100">Book Now</Button>
                    </Card> */}

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
                    {/* <h3>Description</h3> */}
                    <h3>{placeDetails.name}</h3>
                    <p>{placeDetails.description || "No detailed description available."}</p>

                    {/* Booking Form */}
                    {/* <Card className="p-3 shadow-sm mt-4">
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

                            <Button variant="primary" className="w-100">Check Availability</Button>
                        </Form>
                    </Card> */}

                    {/* Google Map Embed */}
                    <Card className="p-3 shadow-sm mt-3">
                        <Map lat={placeDetails.lat} lng={placeDetails.lng} />
                    </Card>
                </Col>

                {/* Contact & Map Section */}
                {/* <Col md={4}>
                    <Card className="p-3 shadow-sm">
                        <h4>Contact Information</h4>
                        <p><strong>Phone:</strong> {placeDetails.phone || "Not Available"}</p>
                        <p><strong>Email:</strong> {placeDetails.email || "Not Available"}</p>
                        <p><strong>Website:</strong> <a href={placeDetails.website} target="_blank">{placeDetails.website || "N/A"}</a></p>
                    </Card> */}

                {/* Google Map Embed */}
                {/* <Card className="p-3 shadow-sm mt-3">
                        <Map lat={placeDetails.lat} lng={placeDetails.lng} />
                    </Card>
                </Col> */}
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

// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { Container, Row, Col, Button, Card, Form, Spinner } from "react-bootstrap";
// import dynamic from "next/dynamic";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import ImageGallery from "react-image-gallery";
// import "react-image-gallery/styles/css/image-gallery.css";
// import { fetchPlaceDetails } from "@/services";

// // Load Google Maps dynamically
// const Map = dynamic(() => import("@/components/GoogleMap"), { ssr: false });

// const BookingDetails = () => {
//     const router = useRouter();
//     const { id } = router.query; // Get place_id from URL

//     const [placeDetails, setPlaceDetails] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [checkIn, setCheckIn] = useState("");
//     const [checkOut, setCheckOut] = useState("");
//     const [guests, setGuests] = useState(1);

//     useEffect(() => {
//         if (id) {
//             try {
//                 fetchPlaceDetails(id).then((data) => {
//                     setPlaceDetails(data);
//                     setLoading(false);
//                 });
//             } catch (error) {
//                 console.error("Error fetching place details:", error);
//                 setLoading(false);
//             }
//         }
//     }, [id]);

//     if (loading) {
//         return <Spinner animation="border" className="d-block mx-auto mt-5" />;
//     }

//     const images = placeDetails.images.map(img => ({ original: img, thumbnail: img }));

//     return (
//         <Container className="booking-details" style={{ marginTop: "60px" }}>
//             {/* Header Section */}
//             <Row className="mb-4">
//                 <Col md={8}>
//                     {/* Slideshow Gallery */}
//                     <ImageGallery items={images} showPlayButton={false} showFullscreenButton={false} />
//                 </Col>

//                 {/* Basic Info Section */}
//                 <Col md={4}>
//                     <h2>{placeDetails.name}</h2>
//                     <p><strong>Rating:</strong> {placeDetails.rating} ⭐ ({placeDetails.userRatings} reviews)</p>
//                     <p><strong>Location:</strong> {placeDetails.address}</p>
//                     <Button variant="outline-success" className="w-100 mb-3" onClick={() => router.push(placeDetails.mapUrl)}>View on Map</Button>
//                     <Button variant="primary" className="w-100">Book Now</Button>
//                 </Col>
//             </Row>

//             {/* Resort Features */}
//             {/* <Row className="mt-5">
//                 <Col md={8}>
//                     <h3>Resort Features</h3>
//                     <Row>
//                         {placeDetails.features.map((feature, index) => (
//                             <Col md={4} key={index} className="mb-3">
//                                 <Card className="p-3 text-center">
//                                     <p>{feature}</p>
//                                 </Card>
//                             </Col>
//                         ))}
//                     </Row>
//                 </Col>
//             </Row> */}

//             {/* Booking Form */}
//             <Row className="mt-5">
//                 <Col md={8}>
//                     <h4>Booking Options</h4>
//                     <Form>
//                         <Form.Group controlId="checkInDate" className="mb-3">
//                             <Form.Label>Check-In Date</Form.Label>
//                             <Form.Control type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} required />
//                         </Form.Group>

//                         <Form.Group controlId="checkOutDate" className="mb-3">
//                             <Form.Label>Check-Out Date</Form.Label>
//                             <Form.Control type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} required />
//                         </Form.Group>

//                         <Form.Group controlId="guests" className="mb-3">
//                             <Form.Label>Number of Guests</Form.Label>
//                             <Form.Control type="number" min="1" max="6" value={guests} onChange={(e) => setGuests(e.target.value)} required />
//                         </Form.Group>

//                         <Button variant="success" className="w-100">Check Availability</Button>
//                     </Form>
//                 </Col>

//                 {/* Contact & Map Section */}
//                 <Col md={4}>
//                     <h4>Contact Information</h4>
//                     <p><strong>Phone:</strong> {placeDetails.phone || "Not Available"}</p>
//                     <p><strong>Email:</strong> {placeDetails.email || "Not Available"}</p>
//                     <p><strong>Website:</strong> <a href={placeDetails.website} target="_blank">{placeDetails.website || "N/A"}</a></p>

//                     {/* Google Map Embed */}
//                     <Map lat={placeDetails.lat} lng={placeDetails.lng} />
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default BookingDetails;

