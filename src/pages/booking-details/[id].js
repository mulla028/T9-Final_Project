import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Row,
  Col,
  Carousel,
  Button,
  Card,
  Form,
  Spinner,
  Nav,
  ToggleButtonGroup,
  ToggleButton
} from "react-bootstrap";
import dynamic from "next/dynamic";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchPlaceDetails, fetchNearbyAttractions } from "@/services";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import BookingModal from "@/components/BookingModal";
import TipsDisplay from "@/components/TipsDisplay";

// Load Google Maps dynamically
const Map = dynamic(() => import("@/components/GoogleMap"), { ssr: false });

const BookingDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Get place_id from URL

  const [placeDetails, setPlaceDetails] = useState(null);
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
          fetchNearbyAttractions({ lat: data.lat, lng: data.lng }).then(
            (attractions) => setNearbyAttractions(attractions),
          );
        }
      });
    }
  }, [id]);

  useEffect(() => {
    if (!visitDate) {
      setErrors((prev) => ({ ...prev, visitDate: true }));
    } else {
      setErrors((prev) => ({ ...prev, visitDate: false }));
    }
  }, [visitDate]);

  const [errors, setErrors] = useState({
    guests: false,
    startDate: false,
    endDate: false,
    visitDate: false,
  });

  const today = new Date().toISOString().split("T")[0];

  const validate = () => {
    let newErrors = { visitDate: "", time: "" };
    let newErrors = { visitDate: "", time: "" };

    const now = new Date();
    const selectedDate = new Date(visitDate);
    const selectedTime = new Date(time);
    const now = new Date();
    const selectedDate = new Date(visitDate);
    const selectedTime = new Date(time);

    if (!visitDate) {
      newErrors.visitDate = "Visit date is required.";
    }
    if (!visitDate) {
      newErrors.visitDate = "Visit date is required.";
    }

    if (!time) {
      newErrors.time = "Time cannot be empty.";
    } else if (
      selectedDate.toDateString() === now.toDateString() &&
      selectedTime.getHours() < now.getHours()
    ) {
      newErrors.time = "Selected time cannot be in the past.";
    } else if (
      selectedDate.toDateString() === now.toDateString() &&
      selectedTime.getHours() === now.getHours() &&
      selectedTime.getMinutes() < now.getMinutes()
    ) {
      newErrors.time = "Selected time cannot be in the past.";
    }
    if (!time) {
      newErrors.time = "Time cannot be empty.";
    } else if (
      selectedDate.toDateString() === now.toDateString() &&
      selectedTime.getHours() < now.getHours()
    ) {
      newErrors.time = "Selected time cannot be in the past.";
    } else if (
      selectedDate.toDateString() === now.toDateString() &&
      selectedTime.getHours() === now.getHours() &&
      selectedTime.getMinutes() < now.getMinutes()
    ) {
      newErrors.time = "Selected time cannot be in the past.";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };
  setErrors(newErrors);
  return !Object.values(newErrors).some((error) => error);
};

const handleShowNotPrice = () => {
  if (validate()) {
    setShowConfirmation(true);
  }
};

const validateInputs = () => {
  let newErrors = { guests: "", startDate: "", endDate: "" };

  if (guests < 1 || guests > 5) {
    newErrors.guests = "Guests must be between 1 and 5.";
  }
  if (!startDate) {
    newErrors.startDate = "Start date is required.";
  } else if (new Date(startDate) < new Date(today)) {
    newErrors.startDate = "Start date cannot be before today.";
  }
  if (endDate && !endDate) {
    newErrors.endDate = "End date is required.";
  } else if (endDate && new Date(endDate) < new Date(startDate)) {
    newErrors.endDate = "End date cannot be before start date.";
  }

  setErrors(newErrors);
  return !Object.values(newErrors).some((error) => error);
};

if (loading) {
  return <Spinner animation="border" className="d-block mx-auto mt-5" />;
}

const handleClose = () => setShowConfirmation(false);

const handleShow = () => {
  if (validateInputs()) {
    setShowConfirmation(true);
  }
};

const handleConfirmBooking = (bookingData) => {
  handleClose();
};

/** Pricing & Availability Logic */
const isBookable = placeDetails.reservable;
const priceData = isBookable ? placeDetails.customPrice : null;
const priceIndicator = priceData
  ? `$${priceData.price} (${priceData.label})`
  : "N/A";
const hasPrice = priceIndicator !== "N/A" ? true : false;

/** Custom Booking Packages */
const packages = [
  { name: "Standard Stay", price: 100, description: "Room + Breakfast" },
  {
    name: "Luxury Package",
    price: 250,
    description: "Room + Spa + Private Dinner",
  },
  {
    name: "Adventure Package",
    price: 400,
    description: "Room + Guided Tours",
  },
];

// Prepare booking data
const getBookingData = () => {
  if (isPackageMode && hasPrice) {
    return {
      startDate,
      endDate,
      guests,
      packageType,
      price:
        packages.find((pkg) => pkg.name.toLowerCase().includes(packageType))
          ?.price || 0,
      model: "isPackageMode&&hasPrice",
    };
  } else if (hasPrice) {
    return {
      startDate,
      endDate,
      guests,
      preferences,
      price: priceData?.price || 0,
      model: "hasPrice",
    };
  } else {
    return {
      startDate: visitDate,
      time: time,
      time: time,
      model: "!hasPrice",
    };
  }
};

return (
  <Container className="booking-details" style={{ marginTop: "60px" }}>
    {/* Header Section */}
    <Row className="mb-4">
      <Col md={8}>
        {/* Navigation Tabs */}
        <Nav
          fill
          variant="pills"
          className="border rounded mb-3 gap-2 p-2"
          activeKey={activeTab}
        >
          {["details", "tips", "attractions", "reviews"].map((section) => (
            <Nav.Item key={section}>
              <Nav.Link
                eventKey={`#${section}`}
                className={`fw-bold border ${activeTab === `#${section}` ? "bg-success text-white" : "text-dark"}`}
                onClick={() => {
                  setActiveTab(`#${section}`);
                  router.push(`#${section}`);
                }}
              >
                {section.charAt(0).toUpperCase() +
                  section.slice(1).replace("-", " ")}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        {/* Image Gallery */}
        <Carousel>
          {placeDetails.images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                src={image}
                className="d-block w-100"
                alt={`Slide ${index}`}
                style={{
                  height: "550px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Ratings */}
        <div className="d-flex justify-content-between mt-5">
          <div className="location-tag">
            📍{" "}
            {placeDetails.locality === "Unknown"
              ? placeDetails.route
              : placeDetails.locality}
            , {placeDetails.country}
          </div>
          <p>
            <strong>Rating:</strong> {placeDetails.rating} ⭐ (
            {placeDetails.userRatings} reviews)
          </p>
        </div>
      </Col>

      {/* Contact & Booking Section */}
      <Col md={4}>
        <Card className="p-3 shadow-sm mb-3">
          <h4>Contact Information</h4>
          <p><strong>Phone:</strong> {placeDetails.phone || "Not Available"}</p>
          <p><strong>Website:</strong> <a href={placeDetails.website} target="_blank">{placeDetails.website || "N/A"}</a></p>
        </Card>

        {/* Pricing & Availability / Package Toggle */}
        <Card className="pricing-card p-4 mt-4 shadow-lg">
          {/* Conditional Heading */}
          <h4 className="text-center mb-3">
            {hasPrice ? "Choose Your Booking Option" : "Add to Itinerary"}
          </h4>

          {/* Pricing & Availability / Package Toggle (only if there's a price) */}
          {hasPrice && (
            <ToggleButtonGroup
              type="radio"
              name="bookingMode"
              defaultValue={0}
              onChange={(val) => setIsPackageMode(val === 1)}
              className="d-flex justify-content-center mb-4"
              className="d-flex justify-content-center mb-4"
            >
              <ToggleButton
                id="standard"
                value={0}
                variant={isPackageMode ? "outline-primary" : "primary"}
                className="toggle-btn"
              >
                <ToggleButton
                  id="standard"
                  value={0}
                  variant={isPackageMode ? "outline-primary" : "primary"}
                  className="toggle-btn"
                >
                  Standard Pricing
                </ToggleButton>
                <ToggleButton
                  id="packages"
                  value={1}
                  variant={isPackageMode ? "success" : "outline-success"}
                  className="toggle-btn"
                >
                  <ToggleButton
                    id="packages"
                    value={1}
                    variant={isPackageMode ? "success" : "outline-success"}
                    className="toggle-btn"
                  >
                    Custom Packages
                  </ToggleButton>
                </ToggleButtonGroup>
            )}

                {/* Standard Pricing */}
                {!isPackageMode && hasPrice && (
                  <>
                    <p className="text-muted text-center">
                      <strong>Price Level:</strong> {priceIndicator}
                    </p>

                    <Form>
                      {/* Date Range Picker */}
                      <Form.Group className="mb-3">
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
                          wrapperClassName="d-flex justify-content-between align-items-center"
                          className={`form-control date-picker ${errors.startDate || errors.endDate ? "is-invalid" : ""}`}
                          icon={<FaCalendarAlt className="search-icon" />}
                        />
                      </Form.Group>

                      {isBookable ? (
                        <>
                          {/* Guests Field */}
                          <Form.Group className="mb-3">
                            <Form.Label>Number of Guests</Form.Label>
                            <Form.Control
                              type="number"
                              min="1"
                              max="5"
                              value={guests}
                              onChange={(e) => {
                                const value = Math.min(5, Math.max(1, Number(e.target.value)));
                                setGuests(value);
                              }}
                            />
                          </Form.Group>

                          {/* Preferences Field */}
                          <Form.Group className="mb-3">
                            <Form.Label>Preferences</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              placeholder="Any special requests?"
                              value={preferences}
                              onChange={(e) => setPreferences(e.target.value)}
                            />
                          </Form.Group>

                          {/* View on Map Button */}
                          <Button
                            variant="outline-primary"
                            className="w-100 mb-2 view-btn"
                            onClick={() => router.push(placeDetails.mapUrl)}
                          >
                            View on Map
                          </Button>

                          {/* Book Now Button */}
                          <Button
                            variant="success"
                            className="w-100 book-btn"
                            onClick={handleShow}
                          >
                            {priceData ? `Book Now for $${priceData.price}` : "Book Now"}
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="outline-primary"
                            className="w-100 mb-2 view-btn"
                            onClick={() => router.push(placeDetails.mapUrl)}
                          >
                            View on Map
                          </Button>
                          <Button
                            variant="warning"
                            className="w-100 itinerary-btn"
                            onClick={handleShow}
                          >
                            Add to Itinerary
                          </Button>
                        </>
                      )}
                    </Form>
                  </>
                )}

                {/* Custom Packages */}
                {isPackageMode && hasPrice && (
                  <>
                    <h5 className="text-center mb-3">Available Packages</h5>
                    <ul className="package-list">
                      {packages.map((pkg, index) => (
                        <li key={index} className="mb-2">
                          <strong>{pkg.name}:</strong> {pkg.description} - $
                          {pkg.price} per night
                        </li>
                      ))}
                    </ul>

                    <Form>
                      {/* Package Dropdown */}
                      <Form.Group className="mb-3">
                        <Form.Label>Select Package</Form.Label>
                        <Form.Select
                          value={packageType}
                          onChange={(e) => setPackageType(e.target.value)}
                        >
                          {packages.map((pkg, index) => (
                            <option key={index} value={pkg.name.toLowerCase()}>
                              {pkg.name} (${pkg.price})
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                      {/* Date Range */}
                      <Form.Group className="mb-3">
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
                          wrapperClassName="d-flex justify-content-between align-items-center"
                          className={`form-control date-picker ${errors.startDate || errors.endDate ? "is-invalid" : ""}`}
                          icon={<FaCalendarAlt className="search-icon" />}
                        />
                        {(errors.startDate || errors.endDate) && (
                          <div className="text-danger">
                            Please select a valid date range.
                          </div>
                        )}
                      </Form.Group>

                      <Form.Group controlId="guests" className="mb-3">
                        <Form.Label>Number of Guests</Form.Label>
                        <Form.Control
                          type="number"
                          required
                          value={guests}
                          onChange={(e) => setGuests(e.target.value)}
                          className={errors.guests ? "is-invalid" : ""}
                        />
                        {errors.guests && (
                          <div className="text-danger">
                            Please enter a valid number of guests.
                          </div>
                        )}
                      </Form.Group>

                      <Button
                        variant="outline-primary"
                        className="w-100 mb-3 view-btn"
                        onClick={() => router.push(placeDetails.mapUrl)}
                      >
                        View on Map
                      </Button>

                      <Button
                        variant="success"
                        className="w-100 book-btn"
                        onClick={handleShow}
                      >
                        Book Package
                      </Button>
                    </Form>
                  </>
                )}

                {!hasPrice && (
                  <Form>
                    <Form.Group controlId="visitDate" className="mb-3">
                      <DatePicker
                        showIcon
                        selected={visitDate}
                        onChange={(date) => {
                          setVisitDate(date);
                          setErrors((prev) => ({ ...prev, visitDate: "" }));
                        }}
                        minDate={new Date()}
                        dateFormat="yyyy/MM/dd"
                        placeholderText="Visit Date"
                        wrapperClassName="d-flex justify-content-between align-items-center"
                        className={`form-control date-picker ${errors.time ? "border border-danger" : ""}`}
                        icon={<FaCalendarAlt className="search-icon" />}
                      />
                      {errors.visitDate && (
                        <div className="text-danger mt-1">{errors.visitDate}</div>
                      )}
                    </Form.Group>
                    <Form.Group controlId="date" className="mb-3">
                      <DatePicker
                        showIcon
                        selected={time}
                        onChange={(time) => {
                          setTime(time);
                          setErrors((prev) => ({ ...prev, time: "" }));
                        }}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        placeholderText="Time"
                        wrapperClassName="d-flex justify-content-between align-items-center"
                        className={`form-control date-picker ${errors.time ? "border border-danger" : ""}`}
                        icon={<FaClock className="search-icon" />}
                      />
                      {errors.time && <div className="text-danger mt-1">{errors.time}</div>}

                    </Form.Group>

                    <Button
                      variant="outline-primary"
                      className="w-100 mb-3"
                      onClick={() => router.push(placeDetails.mapUrl)}
                    >
                      View on Map
                    </Button>
                    <Button
                      variant="warning"
                      className="w-100"
                      onClick={handleShowNotPrice}
                    >
                      Add to Itinerary
                    </Button>
                  </Form>
                )}
              </Card>
            </Col>
      </Row>

        {/* Detailed Information Section */}
        <Row className="mt-5" id="details">
          <Col md={8}>
            <h3>{placeDetails.name}</h3>
            <p>
              {placeDetails.description || "No detailed description available."}
            </p>

            {/* Eco-Friendly Tips Section - Below the Description */}
            <Row className="mt-5" id="tips">
              <Col md={8}>
                <TipsDisplay tips={placeDetails.ecoTips} />
              </Col>
            </Row>

            {/* Google Map Embed */}
            <Card className="p-3 shadow-sm mt-5">
              <Map lat={placeDetails.lat} lng={placeDetails.lng} />
            </Card>
          </Col>
        </Row>

        {/* Eco-Friendly Tips Section - Below the Description */}
        <Row className="mt-5" id="tips">
          <Col md={8}>
            <TipsDisplay tips={placeDetails.ecoTips} />
          </Col>
        </Row>

        {/* Nearby Attractions */}
        <Row className="mt-5" id="attractions">
          <Col md={8}>
            <h4>Nearby Attractions</h4>
            <ul>
              {nearbyAttractions.length > 0 ? (
                nearbyAttractions.map((attraction) => (
                  <li key={attraction.name}>
                    {attraction.name} - {attraction.rating} ⭐
                  </li>
                ))
              ) : (
                <p>No nearby attractions found.</p>
              )}
            </ul>
          </Col>
        </Row>

        {/* Reviews Section */}
        <Row className="mt-5" id="reviews">
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
        <BookingModal
          show={showConfirmation}
          handleClose={handleClose}
          placeDetails={placeDetails}
          bookingData={getBookingData}
          onConfirm={handleConfirmBooking}
        />
      </Container>
      );
};

      export default BookingDetails;