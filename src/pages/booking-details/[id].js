import { useEffect, useState } from "react";
import { useRouter } from "next/router";
<<<<<<< HEAD
import { Container, Row, Col, Carousel, Button, Card, Form, Spinner } from "react-bootstrap";
import dynamic from "next/dynamic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchPlaceDetails } from "@/services";
=======
import { Container, Row, Col, Carousel, Button, Card, Form, Spinner, Nav, ToggleButtonGroup, ToggleButton } from "react-bootstrap";
import dynamic from "next/dynamic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchPlaceDetails, fetchNearbyAttractions } from "@/services";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import BookingModal from "@/components/BookingModal";
>>>>>>> 3bec758 (adding booking feature files)

// Load Google Maps dynamically
const Map = dynamic(() => import("@/components/GoogleMap"), { ssr: false });

const BookingDetails = () => {
    const router = useRouter();
    const { id } = router.query; // Get place_id from URL

    const [placeDetails, setPlaceDetails] = useState(null);
<<<<<<< HEAD
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

=======
    const [nearbyAttractions, setNearbyAttractions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [guests, setGuests] = useState(1);
    const [preferences, setPreferences] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [activeTab, setActiveTab] = useState("#details");
    const [packageType, setPackageType] = useState("standard");
    const [isPackageMode, setIsPackageMode] = useState(false);
    const [dateRange, setDateRange] = useState([null, null]);
    const [visitDate, setVisitDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [startDate, endDate] = dateRange;


    useEffect(() => {
        if (id) {
            fetchPlaceDetails(id).then((data) => {
                setPlaceDetails(data);
                setLoading(false);

                if (data.lat && data.lng) {
                    fetchNearbyAttractions({ lat: data.lat, lng: data.lng })
                        .then((attractions) => setNearbyAttractions(attractions));
                }
            });
        }
    }, [id]);


>>>>>>> 3bec758 (adding booking feature files)
    if (loading) {
        return <Spinner animation="border" className="d-block mx-auto mt-5" />;
    }

<<<<<<< HEAD
=======
    const handleClose = () => setShowConfirmation(false);
    const handleShow = () => setShowConfirmation(true);

    /** Pricing & Availability Logic */
    const isBookable = placeDetails.reservable;
    const priceData = isBookable ? placeDetails.customPrice : null;
    const priceIndicator = priceData ? `$${priceData.price} (${priceData.label})` : "N/A";
    const hasPrice = priceIndicator !== "N/A" ? true : false;

    /** Custom Booking Packages */
    const packages = [
        { name: "Standard Stay", price: 100, description: "Room + Breakfast" },
        { name: "Luxury Package", price: 250, description: "Room + Spa + Private Dinner" },
        { name: "Adventure Package", price: 400, description: "Room + Guided Tours" }
    ];

>>>>>>> 3bec758 (adding booking feature files)
    return (
        <Container className="booking-details" style={{ marginTop: "60px" }}>
            {/* Header Section */}
            <Row className="mb-4">
                <Col md={8}>
<<<<<<< HEAD
                    {/*Buttons for the user to navigate between the different sections*/}
                    <div className="d-flex justify-content-between mb-3">
                        <Button variant="success" onClick={() => router.push("#details")}>Back to Search</Button>
                        <Button variant="success" onClick={() => router.push('#')}>Details</Button>
                        <Button variant="success" onClick={() => router.push('#reviews')}>Reviews</Button>
                        <Button variant="success" onClick={() => router.push('#')}>Details</Button>
                    </div>
                    {/* Image Gallery with Modal */}
=======
                    {/* Navigation Tabs */}
                    <Nav fill variant="pills" className="border rounded mb-3 gap-2 p-2" activeKey={activeTab}>
                        {["details", "attractions", "reviews"].map(section => (
                            <Nav.Item key={section}>
                                <Nav.Link
                                    eventKey={`#${section}`}
                                    className={`fw-bold border ${activeTab === `#${section}` ? "bg-success text-white" : "text-dark"}`}
                                    onClick={() => { setActiveTab(`#${section}`); router.push(`#${section}`) }}
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1).replace("-", " ")}
                                </Nav.Link>
                            </Nav.Item>
                        ))}
                    </Nav>

                    {/* Image Gallery */}
>>>>>>> 3bec758 (adding booking feature files)
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
<<<<<<< HEAD
                    <div className="d-flex justify-content-between mt-5">
=======

                    {/* Ratings */}
                    <div className="d-flex justify-content-between mt-5">
                        <div className="location-tag">
                            📍 {placeDetails.locality === "Unknown" ? placeDetails.route : placeDetails.locality}, {placeDetails.country}
                        </div>
>>>>>>> 3bec758 (adding booking feature files)
                        <p><strong>Rating:</strong> {placeDetails.rating} ⭐ ({placeDetails.userRatings} reviews)</p>
                    </div>
                </Col>

<<<<<<< HEAD
                {/* Contact Card */}
=======
                {/* Contact & Booking Section */}
>>>>>>> 3bec758 (adding booking feature files)
                <Col md={4}>
                    <Card className="p-3 shadow-sm mb-3">
                        <h4>Contact Information</h4>
                        <p><strong>Phone:</strong> {placeDetails.phone || "Not Available"}</p>
<<<<<<< HEAD
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
=======
                        {/* <p><strong>Location:</strong> {placeDetails.address}</p> */}
                        <p><strong>Website:</strong> <a href={placeDetails.website} target="_blank">{placeDetails.website || "N/A"}</a></p>
                    </Card>

                    {/* Pricing & Availability / Package Toggle */}
                    <Card className="p-3 shadow-sm mt-4">
                        {/* Conditional Heading */}
                        <h4>{hasPrice ? "Choose Your Booking Option" : "Add to Itinerary"}</h4>

                        {/* Pricing & Availability / Package Toggle (only if there's a price) */}
                        {hasPrice && (
                            <ToggleButtonGroup type="radio" name="bookingMode" defaultValue={0} onChange={(val) => setIsPackageMode(val === 1)}>
                                <ToggleButton id="standard" value={0} variant="outline-primary">
                                    Standard Pricing
                                </ToggleButton>
                                <ToggleButton id="packages" value={1} variant="outline-success">
                                    Custom Packages
                                </ToggleButton>
                            </ToggleButtonGroup>
                        )}

                        {/* Standard Pricing */}
                        {!isPackageMode && hasPrice && (
                            <>
                                <p><strong>Price Level:</strong> {priceIndicator}</p>
                                <Form>
                                    <Form.Group controlId="date" className="form-group mb-3">
                                        <DatePicker
                                            showIcon
                                            selected={startDate}
                                            onChange={(update) => setDateRange(update)}
                                            startDate={startDate}
                                            endDate={endDate}
                                            selectsRange
                                            minDate={new Date()}
                                            dateFormat="MMM d, yyyy"
                                            placeholderText="Select Dates"
                                            className="date-picker"
                                            icon={<FaCalendarAlt className="search-icon" />}
                                        />
                                    </Form.Group>

                                    {isBookable ? (
                                        <>
                                            <Form.Group controlId="guests" className="mb-3">
                                                <Form.Label>Number of Guests</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    min="1"
                                                    max="5"
                                                    required
                                                    value={guests}
                                                    onChange={(e) => {
                                                        const value = Math.min(5, Math.max(1, Number(e.target.value)));
                                                        setGuests(value);
                                                    }}
                                                />
                                            </Form.Group>

                                            <Form.Group controlId="preferences" className="mb-3">
                                                <Form.Label>Preferences</Form.Label>
                                                <Form.Control as="textarea" rows={3}
                                                    value={preferences}
                                                    onChange={(e) => setPreferences(e.target.value)}
                                                />
                                            </Form.Group>

                                            <Button variant="outline-primary" className="w-100 mb-3"
                                                onClick={() => router.push(placeDetails.mapUrl)}>View on Map</Button>

                                            <Button variant="success" className="w-100"
                                                onClick={handleShow}
                                            >
                                                {priceData ? `Book Now for $${priceData.price}` : "Book Now"}
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button variant="outline-primary" className="w-100 mb-3"
                                                onClick={() => router.push(placeDetails.mapUrl)}>View on Map</Button>

                                            <Button variant="warning" className="w-100"
                                                onClick={handleShow}
                                            >
                                                Add to Itinerary
                                            </Button>
                                        </>
                                    )}
                                </Form>
                            </>
                        )}

                        {/* Custom Booking Packages */}
                        {isPackageMode && hasPrice && (
                            <>
                                <h5>Available Packages</h5>
                                <ul>
                                    {packages.map((pkg, index) => (
                                        <li key={index}>
                                            <strong>{pkg.name}:</strong> {pkg.description} - ${pkg.price} per night
                                        </li>
                                    ))}
                                </ul>

                                <Form>
                                    <Form.Group controlId="bookingPackage" className="mb-3">
                                        <Form.Label>Select Booking Package</Form.Label>
                                        <Form.Select value={packageType} onChange={(e) => setPackageType(e.target.value)}>
                                            <option value="standard">Standard Stay ($100)</option>
                                            <option value="all-inclusive">Luxury Package ($250)</option>
                                            <option value="vip">Adventure Package ($400)</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group controlId="date" className="form-group mb-3">
                                        <DatePicker
                                            showIcon
                                            selected={startDate}
                                            onChange={(update) => setDateRange(update)}
                                            startDate={startDate}
                                            endDate={endDate}
                                            selectsRange
                                            minDate={new Date()}
                                            dateFormat="MMM d, yyyy"
                                            placeholderText="Select Dates"
                                            className="date-picker"
                                            icon={<FaCalendarAlt className="search-icon" />}
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="guests" className="mb-3">
                                        <Form.Label>Number of Guests</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min="1"
                                            max="5"
                                            required
                                            value={guests}
                                            onChange={(e) => {
                                                const value = Math.min(5, Math.max(1, Number(e.target.value)));
                                                setGuests(value);
                                            }}
                                        />
                                    </Form.Group>

                                    <Button variant="outline-primary" className="w-100 mb-3"
                                        onClick={() => router.push(placeDetails.mapUrl)}>View on Map</Button>

                                    <Button variant="success" className="w-100"
                                        onClick={handleShow}
                                    >Book Package</Button>
                                </Form>
                            </>
                        )}

                        {/* If no price, allow users to still select dates and add to itinerary */}
                        {!hasPrice && (
                            <Form>
                                <Form.Group controlId="date" className="mb-3">
                                    <DatePicker
                                        showIcon
                                        selected={visitDate}
                                        onChange={(date) => setVisitDate(date)}
                                        minDate={new Date()}
                                        dateFormat="MMM d, yyyy"
                                        placeholderText="Select Dates"
                                        className="date-picker"
                                        icon={<FaCalendarAlt className="search-icon" />}
                                    />
                                </Form.Group>

                                <Form.Group controlId="date" className="mb-3">
                                    <DatePicker
                                        showIcon
                                        selected={time}
                                        onChange={(time) => setTime(time)}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={15}
                                        timeCaption="Time"
                                        dateFormat="h:mm aa"
                                        placeholderText="Time"
                                        className="date-picker"
                                        icon={<FaClock className="search-icon" />}
                                    />
                                </Form.Group>

                                <Button variant="outline-primary" className="w-100 mb-3"
                                    onClick={() => router.push(placeDetails.mapUrl)}>View on Map</Button>
                                <Button variant="warning" className="w-100"
                                    onClick={handleShow}
                                >
                                    Add to Itinerary
                                </Button>
                            </Form>
                        )}
>>>>>>> 3bec758 (adding booking feature files)
                    </Card>
                </Col>
            </Row>

            {/* Detailed Information Section */}
            <Row className="mt-5" id="details">
                <Col md={8}>
                    {/* <h3>Description</h3> */}
                    <h3>{placeDetails.name}</h3>
                    <p>{placeDetails.description || "No detailed description available."}</p>

<<<<<<< HEAD
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

=======
>>>>>>> 3bec758 (adding booking feature files)
                    {/* Google Map Embed */}
                    <Card className="p-3 shadow-sm mt-3">
                        <Map lat={placeDetails.lat} lng={placeDetails.lng} />
                    </Card>
                </Col>
<<<<<<< HEAD

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
=======
            </Row>

            {/* Nearby Attractions */}
            <Row className="mt-5" id="attractions">
                <Col md={8}>
                    <h4>Nearby Attractions</h4>
                    <ul>
                        {nearbyAttractions.length > 0 ? nearbyAttractions.map(attraction => (
                            <li key={attraction.name}>{attraction.name} - {attraction.rating} ⭐</li>
                        )) : <p>No nearby attractions found.</p>}
                    </ul>
                </Col>
            </Row>

            {/* Reviews Section */}
            <Row className="mt-5" id="reviews">
>>>>>>> 3bec758 (adding booking feature files)
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
<<<<<<< HEAD
=======
            <BookingModal show={showConfirmation} handleClose={handleClose} />
>>>>>>> 3bec758 (adding booking feature files)
        </Container>
    );
};

export default BookingDetails;
<<<<<<< HEAD

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

=======
>>>>>>> 3bec758 (adding booking feature files)
