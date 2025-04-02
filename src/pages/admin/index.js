import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { API_BASE_URL } from "../../utils/general";
import { isAuthenticated } from "@/services";

async function fetchUsers() {
  const res = await fetch(`${API_BASE_URL}/Users`);
  const data = await res.json();
  console.log(data);
  return data;
}

async function fetchVisitorCount() {
  const res = await fetch(`${API_BASE_URL}/visitors`);
  const data = await res.json();
  return data.count;
}

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [visitorCount, setVisitorCount] = useState(0);
  const router = useRouter();
  // Add state for delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push("/");
      return;
    }

    fetch(`${API_BASE_URL}/Admin`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const isAdmin = data.some((user) => user.role === "admin");

        if (!isAdmin) {
          router.push("/");
        }
      })
      .catch(() => router.push("/"));
  }, []);

  useEffect(() => {
    async function loadUsers() {
      const data = await fetchUsers();
      setUsers(data);
    }
    async function loadData() {
      const count = await fetchVisitorCount();
      setVisitorCount(count);
    }
    loadUsers();
    loadData();
  }, []);

  // Function to open the delete confirmation modal
  const initiateDelete = (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  // Function to handle deletion after confirmation
  const confirmDelete = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/${userToDelete}`, {
        method: "DELETE",
      });

      console.log("Deleting user:", userToDelete);

      if (res.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userToDelete));
        // Close the modal after successful deletion
        setShowDeleteModal(false);
        setUserToDelete(null);
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Function to close the modal without deleting
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  // Data for the bar chart
  const chartData = [
    { name: "Users", count: users.length },
    { name: "Visitors", count: visitorCount },
  ];

  return (
    <Container className="personalized-dashboard" style={{ marginTop: "60px" }}>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button variant="success" href="/" className="my-button">
          Home
        </Button>
      </div>
      {/* Display the total number of users and visitors */}
      <h2 className="text-center mb-4">All Users ({users.length})</h2>
      <h3 className="text-center mb-4">
        Total Website Visitors: {visitorCount}
      </h3>

      {/* Bar Chart */}
      <Row className="mb-5">
        <Col md={12}>
          {/* <h4 className="text-center mb-4">Statistics</h4> */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>

      {/* User Cards */}
      <Row className="mb-5">
        {users.map((user) => (
          <Col md={4} key={user._id} className="mb-4">
            <Card>
              <Card.Body>
                {user.name ? (
                  <Card.Title>{user.name}</Card.Title>
                ) : (
                  <Card.Title>{user.username}</Card.Title>
                )}
                <Button
                  variant="success"
                  href={`/admin/updateUser?userId=${user._id}`}
                >
                  Update User
                </Button>
                <Button
                  variant="danger"
                  onClick={() => initiateDelete(user._id)}
                  className="ml-2"
                >
                  Delete User
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Add User Button */}
      <div className="d-grid gap-2">
        <Button variant="success" size="lg" href="/admin/addUser">
          Add User
        </Button>
      </div>

      {/* View Tips Button */}
      <div className="d-grid gap-2 mt-4">
        <Button variant="warning" size="lg" href="/admin/tips">
          View Tips
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            No
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}