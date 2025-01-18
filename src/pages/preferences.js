import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const UserPreferencesForm = () => {
    return (
        <Container className="user-preferences-form" style={{ marginTop: '60px' }}>
            <h2 className="text-center mb-4">Set Your Travel Preferences</h2>
            <Row>
                {/* Budget Preferences */}
                <Col md={4}>
                    <h4>Budget</h4>
                    <Form.Check type="radio" label="Low" name="budget" />
                    <Form.Check type="radio" label="Medium" name="budget" />
                    <Form.Check type="radio" label="High" name="budget" />
                </Col>

                {/* Eco-Friendliness Preferences */}
                <Col md={4}>
                    <h4>Eco-Friendliness</h4>
                    <Form.Check type="radio" label="High" name="eco" />
                    <Form.Check type="radio" label="Moderate" name="eco" />
                    <Form.Check type="radio" label="Low" name="eco" />
                </Col>

                {/* Preferred Activities */}
                <Col md={4}>
                    <h4>Preferred Activities</h4>
                    <Form.Check type="checkbox" label="Nature" />
                    <Form.Check type="checkbox" label="Culture" />
                    <Form.Check type="checkbox" label="Adventure" />
                    <Form.Check type="checkbox" label="Wellness" />
                </Col>
            </Row>

            {/* Save Preferences Button */}
            <div className="text-center mt-5">
                <Button variant="primary" size="lg">Save Preferences</Button>
            </div>
        </Container>
    );
};

export default UserPreferencesForm;
