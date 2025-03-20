import { useEffect, useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { API_BASE_URL } from "@/utils/general";

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
    visitDate: "",
    time: "",
  });
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    console.log("BM:", bookingData);
    console.log("Booking Data Model:", bookingData.model);
  }, [bookingData]);

  useEffect(() => {
    setGuests(bookingData.guests || 1);
    setStartDate(formatDate(new Date(bookingData?.startDate)));
    setEndDate(formatDate(bookingData?.endDate) || "");
    setTime(bookingData?.time);
  }, [bookingData]);

  useEffect(() => {
    let newPrice = 0;
    if (bookingData.packageType === "vip") {
      newPrice = 400;
    } else if (bookingData.packageType === "standard") {
      newPrice = 100;
    } else if (bookingData.packageType === "all-inclusive") {
      newPrice = 250;
    }
    setCustomPackagePrice(newPrice);
  }, [bookingData.packageType]);

  const validateForm = () => {
    let newErrors = { guests: "", startDate: "", endDate: "", visitDate: "" };

    if (guests < 1 || guests > 5) {
      newErrors.guests = "Guests must be between 1 and 5.";
    }
    if (bookingData.model === "hasPrice&&isEcoStay") {
      // Validate startDate and endDate for Eco Stay
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
    } else {
      // Validate visitDate for non-Eco Stay
      if (!visitDate) {
        newErrors.visitDate = "Visit date is required.";
      } else if (new Date(visitDate) < new Date(today)) {
        newErrors.visitDate = "Visit date cannot be before today.";
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const validate = () => {
    let newErrors = { visitDate: "", time: "" };

    const now = new Date();
    const selectedDate = new Date(visitDate);
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
      bookingData.model === "hasPrice&&isEcoStay"
    ) {
      bookingPayload.place_id = placeDetails.place_id;
      bookingPayload.placeName = placeDetails.name;
      bookingPayload.location = placeDetails.address;
      bookingPayload.checkIn = startDate;
      bookingPayload.checkOut = endDate;
      bookingPayload.guests = guests;
      bookingPayload.phone = placeDetails.phone;
      bookingPayload.package = bookingData.packageType;
      bookingPayload.preferences = bookingData.preferences;
      bookingPayload.totalPrice = bookingData.price == 0 ? customPackagePrice *
        Math.max(
          (new Date(endDate).setHours(12) -
            new Date(startDate).setHours(12)) /
          (1000 * 60 * 60 * 24),
          1,
        )
        : bookingData.price *
        Math.max(
          (new Date(endDate).setHours(12) -
            new Date(startDate).setHours(12)) /
          (1000 * 60 * 60 * 24),
          1,
        )
    } else {
      bookingPayload.experiences = [
        {
          id: placeDetails.place_id,
          name: placeDetails.name,
          location: placeDetails.address,
          time: time.toLocaleTimeString(),
          paid: bookingData.price > 0,
          date: time.toLocaleDateString(),
        },
      ];
    }

    try {
      console.log("Sending request to:", `${API_BASE_URL}/bookings/add`);
      console.log("Request payload:", bookingPayload);

      const response = await fetch(`${API_BASE_URL}/bookings/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("access_token"),
        },
        body: JSON.stringify(bookingPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        alert(errorData.message || "Failed to save booking.");
        return;
      }

      const data = await response.json();
      localStorage.setItem("newStop", JSON.stringify({
        name: bookingPayload.placeName,
        address: bookingPayload.location
      }));
      alert("The reservation was successfully registered!");
      window.location.href = `/overview?id=${data.id}`;
    } catch (error) {
      console.error("Error saving reservation:", error);
      alert("Error saving reservation!");
    }
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} contentClassName="custom-modal" size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Your Booking</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {placeDetails &&
          bookingData &&
          (
            bookingData.model === "hasPrice&&isEcoStay" ||
              bookingData.model === "hasPrice&&!isEcoStay" ||
              bookingData.model === "isPackageMode&&hasPrice" ? (
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

                    {bookingData.model === "hasPrice&&isEcoStay" ? (
                      <>
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
                      </>
                    ) : (
                      <>
                        <div className="mb-2">
                          <strong>Visit Date:</strong>

                          <Form.Control
                            type="date"
                            value={startDate}
                            min={today}
                            isInvalid={!!errors.startDate}
                            onChange={(e) => setVisitDate(e.target.value)}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.startDate}
                          </Form.Control.Feedback>
                        </div>

                        <strong>Pick Time:</strong>
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
                            wrapperClassName="d-flex justify-content-center align-items-center"
                            className={`form-control date-picker ${errors.time ? "border border-danger" : ""}`}
                            icon={<FaClock className="search-icon" />}
                            value={time}
                            isInvalid={!!errors.time}
                          />
                          {errors.time && (
                            <div className="text-danger mt-1">{errors.time}</div>
                          )}
                        </Form.Group>
                      </>
                    )}

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
                          {bookingData.model === "hasPrice&&isEcoStay" ? bookingData.price *
                            Math.max(
                              (new Date(endDate).setHours(12) -
                                new Date(startDate).setHours(12)) /
                              (1000 * 60 * 60 * 24),
                              1,
                            ) : bookingData.price * guests}
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="mb-2">
                          <strong>Base Price:</strong> ${customPackagePrice}
                        </div>
                        <div className="mb-2">
                          <strong>Total:</strong> $
                          {customPackagePrice *
                            Math.max(
                              (new Date(endDate).setHours(12) -
                                new Date(startDate).setHours(12)) /
                              (1000 * 60 * 60 * 24),
                              1,
                            )}

                        </div>
                      </>
                    )}
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
                      value={visitDate}
                      min={today}
                      isInvalid={!!errors.visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.visitDate}
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