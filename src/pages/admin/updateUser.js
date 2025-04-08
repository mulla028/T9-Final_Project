
import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Alert,
  Spinner,
  Card,
} from "react-bootstrap";
import { API_BASE_URL } from "../../utils/general";

export default function UpdateUser() {
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("userId");
    if (id) setUserId(id);
  }, []);

  useEffect(() => {
    if (!userId) return;

    async function fetchUser() {
      try {
        const res = await fetch(`${API_BASE_URL}/users/${userId}`);
        if (!res.ok) throw new Error("User not found");
        const data = await res.json();
        setUserData({ username: data.username, email: data.email });
      } catch (error) {
        setError(error.message);
      }
    }

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    const updatedData = { ...userData };
    if (password) updatedData.password = password;

    try {
      const res = await fetch(`${API_BASE_URL}/admin/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      const result = await res.json();

      if (!res.ok) throw new Error(result.message || "Error updating user");

      setSuccess("User successfully updated");
      window.location.href = "/admin";
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Card className="shadow-lg p-4 border-0 rounded-4" style={{ maxWidth: "400px", width: "100%" }}>
        <Card.Body>
          <h2 className="text-center text-success mb-4">Update User</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
                required
                className="rounded-3"
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mt-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                required
                className="rounded-3"
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>New Password (Optional)</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-3"
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mt-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-3"
              />
            </Form.Group>

            <Button
              variant="success"
              type="submit"
              className="mt-4 w-100 rounded-3"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" animation="border" /> : "Update User"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
