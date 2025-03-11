
import { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
export default function BookingModal({
  handleClose,
  show,
  placeDetails,
  bookingData,
  onConfirm,
}) {
  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-CA");
  };

  const today = new Date().toLocaleDateString("en-CA");
  const [visitDate, setVisitDate] = useState(new Date());
  const [guests, setGuests] = useState(1);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState("");
  const [customPackagePrice, setCustomPackagePrice] = useState();
  const [errors, setErrors] = useState({
    guests: "",
    startDate: "",
    endDate: "",
    time:""
  });
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setGuests(bookingData.guests || 1);
    setStartDate(formatDate(new Date(bookingData?.startDate)));
    setEndDate(formatDate(bookingData?.endDate) || "");
    setTime(bookingData?.time);
  }, [bookingData]);


  useEffect(() => {
    let newPrice = 0;
    if (bookingData.packageType === 'vip') {
      newPrice = 400;
    } else if (bookingData.packageType === 'standard') {
      newPrice = 100;
    } else if (bookingData.packageType === 'all-inclusive') {
      newPrice = 250;
    }
    setCustomPackagePrice(newPrice);
  }, [bookingData.packageType]);


  const validateForm = () => {
    let newErrors = { guests: "", startDate: "", endDate: "" };

    if (guests < 1 || guests > 5) {
      newErrors.guests = "Guests must be between 1 and 5.";
    }
    if (!startDate) {
      newErrors.startDate = "Start date is required.";
    } else if (new Date(startDate) < new Date(today)) {
      newErrors.startDate = "Start date cannot be before today.";
    }
    if (!endDate) {
      newErrors.endDate = "End date is required.";
    } else if (endDate && new Date(endDate) < new Date(startDate)) {
      newErrors.endDate = "End date cannot be before start date.";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const validate = () => {
    let newErrors = { visitDate: "", time: "" };
  
    const now = new Date();
    const selectedDate = new Date(startDate);
    const selectedTime = new Date(time); 
  
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
  
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };
  

 
  const handleConfirmBooking = async () => {
    const isValid = validate();
    const isFormValid = validateForm();

    if (!isValid && !isFormValid) return;

    const bookingPayload = {
      email: localStorage.getItem("email"),
    };
    if (
      bookingData.model === "isPackageMode&&hasPrice" ||
      bookingData.model === "hasPrice"
    ) {
      bookingPayload.placeName = placeDetails.name;
      bookingPayload.location = placeDetails.address;
      bookingPayload.checkIn = startDate;
      bookingPayload.checkOut = endDate;
      bookingPayload.guests = guests;
      bookingPayload.phone = placeDetails.phone;
      bookingPayload.package = bookingData.packageType;
      bookingPayload.preferences =bookingData.preferences;
      bookingPayload.totalPrice = bookingData.price == 0 ? customPackagePrice * (guests || 1) : bookingData.price * (guests || 1);
    } else {
      bookingPayload.experiences = [
        {
          name: placeDetails.name,
          location: placeDetails.address,
          time: time.toLocaleTimeString(),
          date: time.toLocaleDateString()
        },
      ];
    }

    try {
      const response = await fetch("http://localhost:8080/api/bookings/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("access_token"),
        },
        body: JSON.stringify(bookingPayload),
      });

      const data = await response.json();
      if (response.ok) {
        alert("The reservation was successfully registered!");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Error saving reservation!");
    }
    handleClose();
    window.location.pathname = "/";
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Your Booking</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {placeDetails &&
          bookingData &&
          (bookingData.model == "isPackageMode" ||
            bookingData.model == "hasPrice" || bookingData.model == "isPackageMode&&hasPrice" ? (
            <>
              <h4 className="mb-4">{placeDetails.name}</h4>

              <Row className="mb-4">
                <Col md={6}>
                  <h5 className="text-muted mb-3">Booking Details</h5>
                  {bookingData.model == "isPackageMode&&hasPrice" && (
                    <div className="mb-2">
                      <strong>Package Type:</strong>{" "}
                      {bookingData.packageType || "Not Available"}
                    </div>
                  )}
                  <div className="mb-2">
                    <strong>Check-in:</strong>
                    <Form.Control
                      type="date"
                      value={startDate}
                      min={today}
                      isInvalid={!!errors.startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.startDate}
                    </Form.Control.Feedback>
                  </div>

                  <div className="mb-2">
                    <strong>Check-out:</strong>
                    <Form.Control
                      type="date"
                      value={endDate}
                      min={startDate}
                      isInvalid={!!errors.endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.endDate}
                    </Form.Control.Feedback>
                  </div>

                  <div className="mb-2">
                    <strong>Guests:</strong>
                    <Form.Control
                      type="number"
                      value={guests}
                      isInvalid={!!errors.guests}
                      onChange={(e) => {
                        const value = e.target.value;
                        setGuests(value);
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.guests}
                    </Form.Control.Feedback>
                  </div>
                </Col>

                <Col md={6}>
                  <h5 className="text-muted mb-3">Price Details</h5>
                  {bookingData.price ? (
                    <>
                      <div className="mb-2">
                        <strong>Base Price:</strong> ${bookingData.price}
                      </div>
                      <div className="mb-2">
                        <strong>Total:</strong> $
                        {bookingData.price * (guests || 1)}
                  
                      </div>
                    </>
                  ):
                    <>
                      <div className="mb-2">
                        <strong>Base Price:</strong> ${customPackagePrice}
                      </div>
                      <div className="mb-2">
                        <strong>Total:</strong> $
                        {customPackagePrice * (guests || 1)}

                      </div>
                    </>
                  }
                </Col>
              </Row>
              {bookingData.preferences && (
                <div className="mb-4">
                  <h5 className="text-muted mb-3">Special Requests</h5>
                  <p>{bookingData.preferences}</p>
                </div>
              )}

              <div>
                <h5 className="text-muted mb-3">Contact Information</h5>
                <div className="mb-2">
                  <strong>Phone:</strong>{" "}
                  {placeDetails.phone || "Not Available"}
                </div>
                <div className="mb-2">
                  <strong>Address:</strong> {placeDetails.address}
                </div>
              </div>
            </>
          ) : (
            <Row className="mb-4">
              <Col md={6}>
                <h5 className="text-muted mb-3">Booking Details</h5>

                <div className="mb-2">
                  <strong>Visit Date:</strong>

                  <Form.Control
                    type="date"
                    value={startDate}
                    min={today}
                    isInvalid={!!errors.startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.startDate}
                  </Form.Control.Feedback>
                </div>

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
                    className={`date-picker ${errors.time ? "border border-danger" : ""}`}
                    icon={<FaClock className="search-icon" />}
                    value={time}
                    isInvalid={!!errors.time}
                  />
                  {errors.time && (
                    <div className="text-danger mt-1">{errors.time}</div>
                  )}
                </Form.Group>
              </Col>
            </Row>
          ))}
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleConfirmBooking}>
          Confirm Booking
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
