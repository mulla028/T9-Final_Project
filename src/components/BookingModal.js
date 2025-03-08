import { Modal, Button, Row, Col } from 'react-bootstrap';

export default function BookingModal({ handleClose, show, placeDetails, bookingData, onConfirm }) {
    const formatDate = (date) => {
        if (!date) return 'Not selected';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const handleConfirmBooking = () => {
        onConfirm(bookingData);
        handleClose();
    };

    return (
        <Modal show={show} contentClassName='custom-modal' onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Your Booking</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {placeDetails && bookingData && (
                    <>
                        <h4 className="mb-4">{placeDetails.name}</h4>

                        <Row className="mb-4">
                            <Col md={6}>
                                <h5 className="text-muted mb-3">Booking Details</h5>
                                <div className="mb-2">
                                    <strong>Check-in:</strong> {formatDate(bookingData.startDate)}
                                </div>
                                {bookingData.endDate && (
                                    <div className="mb-2">
                                        <strong>Check-out:</strong> {formatDate(bookingData.endDate)}
                                    </div>
                                )}
                                <div className="mb-2">
                                    <strong>Guests:</strong> {bookingData.guests}
                                </div>
                                {bookingData.packageType && (
                                    <div className="mb-2">
                                        <strong>Package:</strong> {bookingData.packageType}
                                    </div>
                                )}
                            </Col>

                            <Col md={6}>
                                <h5 className="text-muted mb-3">Price Details</h5>
                                {bookingData.price && (
                                    <>
                                        <div className="mb-2">
                                            <strong>Base Price:</strong> ${bookingData.price}
                                        </div>
                                        <div className="mb-2">
                                            <strong>Total:</strong> ${bookingData.price * (bookingData.guests || 1)}
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
                                <strong>Phone:</strong> {placeDetails.phone || 'Not Available'}
                            </div>
                            <div className="mb-2">
                                <strong>Address:</strong> {placeDetails.address}
                            </div>
                        </div>
                    </>
                )}
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