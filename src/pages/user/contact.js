import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useState } from 'react';
import UserLayout from '@/components/UserLayout';
import styles from '@/styles/UserProfile.module.css';
import { sendSupportMessage } from '@/services';

const ContactSupport = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        attachments: null,
    });

    const [success, setSuccess] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess('');
        setError('');

        // Basic frontend validation
        if (!form.name || !form.email || !form.subject || !form.message) {
            setError(true);
            return;
        }

        try {
            const data = await sendSupportMessage(form);

            if (res.status === 200) {
                setSuccess(data.message);
                setSubmitted(true);
                setForm({ name: '', email: '', subject: '', message: '', attachments: null });
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : 'An error occurred. Please try again later.');
            setSubmitted(false);
        }
    };

    return (
        <UserLayout title="Contact Support" description="Reach out to our support team for assistance.">
            <Container style={{ marginTop: '0px' }}>
                <h2 className="text-center mb-4">Contact Support</h2>
                <Row className="justify-content-center">
                    <Col md={8}>
                        {submitted && <Alert variant="success">{success}</Alert>}
                        {error && <Alert variant="danger">{error}</Alert>}

                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label className={styles["custom-label"]}>Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className={styles["custom-input"]}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label className={styles["custom-label"]}>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    className={styles["custom-input"]}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="subject">
                                <Form.Label className={styles["custom-label"]}>Subject</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    className={styles["custom-input"]}
                                />
                            </Form.Group>

                            <Form.Group className="mb-4" controlId="message">
                                <Form.Label className={styles["custom-label"]}>Message</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Type your message here..."
                                />
                            </Form.Group>
                            <div className="mb-4">
                                <Form.Group className="mb-4" controlId="attachments">
                                    <Form.Label className={styles["custom-label"]}>Attachments</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="attachments"
                                        accept=".jpg,.jpeg,.png,.pdf,.docx"
                                        onChange={(e) => setForm({ ...form, attachments: e.target.files })}
                                        className={styles["custom-input"]}
                                    />
                                    <Form.Text className="text-muted">
                                        You can attach images or documents (max 5MB).
                                    </Form.Text>
                                </Form.Group>
                            </div>
                            <div className="text-end mb-4">
                                <Button variant="dark" className={styles["save-btn"]} type="submit">Send Message</Button>
                            </div>
                        </Form>
                    </Col>
                </Row>

                <Row className="text-center mt-5">
                    <Col>
                        <h5>Need quick answers?</h5>
                        <p>Email us directly at <strong>support@driftway.com</strong><br />
                            or call <strong>+123 456 7890</strong></p>
                    </Col>
                </Row>
            </Container>
        </UserLayout>
    );
};

export default ContactSupport;
