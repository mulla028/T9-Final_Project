
import React, { useState } from "react";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import { API_BASE_URL } from "../../utils/general";

export default function AddUser() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const res = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, confirmPassword })
        });

        if (res.ok) {
            setSuccess("User created successfully");
            setError('');
            window.location.href = "/admin";
        } else {
            const errorData = await res.json();
            setError(`Error: ${errorData.message}`);
            setSuccess('');
        }
    };

    return (
        <Container className="d-flex flex-column align-items-center justify-content-center vh-100" style={{ backgroundColor: "#f8f9fa" }}>
            <Card className="shadow-lg p-4 border-0 rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
                <Card.Body>
                    <h2 className="text-center text-success mb-4">Add User</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formUsername" className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="rounded-3"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="rounded-3"
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="rounded-3"
                            />
                        </Form.Group>
                        <Form.Group controlId="formConfirmPassword" className="mb-4">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="rounded-3"
                            />
                        </Form.Group>
                        <Button variant="success" type="submit" className="w-100 rounded-3">
                            Add User
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}