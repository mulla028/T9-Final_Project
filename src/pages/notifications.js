import { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Spinner, Alert, Modal } from 'react-bootstrap';
import { FaArrowLeft, FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import { fetchNotifications, markNotificationAsRead, markAllNotificationsAsRead, dismissNotification } from '@/services';

const iconMap = {
    success: <FaCheckCircle size={50} color="green" />,
    warning: <FaExclamationCircle size={50} color="orange" />,
    info: <FaInfoCircle size={50} color="blue" />
};

const NotificationsPanel = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedNotification, setSelectedNotification] = useState(null);
    const [showNotification, setShowNotification] = useState(false);


    useEffect(() => {
        fetchNotifications().then((data) => {
            setNotifications(data);
            setLoading(false);
        }).catch((err) => {
            console.error('Error fetching notifications:', err);
            setError('Failed to load notifications.');
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const handleReadAll = () => {
        markAllNotificationsAsRead().then(() => {
            setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
            setNotifications((prev) => prev.filter((n) => !n.isRead));
            console.log('All notifications marked as read.');
        }).catch((err) => {
            console.error('Error marking all notifications as read:', err);
            setError('Failed to mark all notifications as read.');
        });
    }

    const handleDismiss = (index) => {
        dismissNotification(notifications[index]._id).then(() => {
            setNotifications((prev) => prev.filter((_, i) => i !== index));
        }).catch((err) => {
            console.error('Error dismissing notification:', err);
            setError('Failed to dismiss notification.');
        });

    }

    const handleView = (notification) => {
        // Logic to view the notification details
        // This could be a redirect to another page or a modal popup
        markNotificationAsRead(notification._id).then(() => {
            setNotifications((prev) => prev.map((n) => n._id === notification._id ? { ...n, isRead: true } : n));
            setSelectedNotification(notification);
            setShowNotification(true);
            console.log('Viewing notification:', notification);
        }).catch((err) => {
            console.error('Error marking notification as read:', err);
            setError('Failed to mark notification as read.');
        });
    }

    return (
        <>
            {/* Back button to the home page */}
            <Container fluid className="mt-3">
                {/* Back Button Row */}
                <Row>
                    <Col md={3} className="text-start">
                        <Button href="/" className="back-button" variant="link">
                            <FaArrowLeft /> Back
                        </Button>
                    </Col>
                </Row>
            </Container>

            <Container className="notifications-panel" style={{ marginTop: '30px' }}>
                <h2 className="text-center mb-4">Notifications</h2>

                {loading && <Spinner animation="border" />}
                {error && <Alert variant="danger">{error}</Alert>}
                {!loading && notifications.length === 0 && <Alert variant="info">You don't have any notifications</Alert>}

                <Row>
                    <Col xs={10} className="mx-auto">
                        {notifications.length > 0 && (
                            <>
                                <div className="text-end mb-3">
                                    <Button style={{ background: 'none', border: '1px solid #ccc', color: 'black' }} size="sm" onClick={handleReadAll}>Mark all as read</Button>
                                </div>

                                {notifications.map((n, i) => (
                                    <Card key={i} className="notifications-card mb-4">
                                        {/* Icon */}
                                        <div className="notification-icon" >
                                            {iconMap[n.icon]}
                                        </div>

                                        {/* Content */}
                                        < div style={{ flex: 1 }}>
                                            <h5 className="mb-1">{n.type}</h5>
                                            <p className="mb-1">
                                                {n.message}
                                            </p>
                                            <small className="text-muted">{new Date(n.timestamp).toLocaleString()}</small>
                                        </div>

                                        {/* Buttons */}
                                        <div className="notification-buttons d-inline flex-column align-items-end ms-3">
                                            <Button style={{ borderRadius: '30px' }} className="view-button mb-2" onClick={() => handleView(n)}>
                                                View
                                            </Button>
                                            <Button style={{ borderRadius: '30px' }} className="dismiss-button mb-2" onClick={() => handleDismiss(i)}>
                                                Dismiss
                                            </Button>
                                        </div>
                                    </Card>
                                ))}
                            </>
                        )}
                    </Col>
                </Row >
            </Container >

            {/* Modal to display notification details */}
            <Modal
                show={showNotification}
                onHide={() => { setShowNotification(false); setSelectedNotification(null); }}
                size="lg"
                centered
                contentClassName="custom-modal">
                <Modal.Header closeButton>
                    <Modal.Title>Notification Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Notification details go here */}
                    {selectedNotification && (
                        <div className="notification-details">
                            <h5>{selectedNotification.type}</h5>
                            <p>{selectedNotification.message}</p>
                            <p><strong>Timestamp:</strong> {new Date(selectedNotification.timestamp).toLocaleString()}</p>
                            <p><strong>Status:</strong> {selectedNotification.isRead ? 'Read' : 'Unread'}</p>
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default NotificationsPanel;
