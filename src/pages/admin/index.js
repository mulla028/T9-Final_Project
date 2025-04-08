import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav,
  Modal,
} from "react-bootstrap";
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
import {
  FaUserPlus,
  FaLightbulb,
  FaUserEdit,
  FaTrash,
  FaPlus,
  FaBook,
  FaHome,
} from "react-icons/fa";
import { API_BASE_URL } from "../../utils/general";
import { isAuthenticated } from "@/services";
import { FaSuitcaseRolling } from "react-icons/fa";
async function fetchVisitorCount() {
  const res = await fetch(`${API_BASE_URL}/visitors`);
  const data = await res.json();
  return data.count;
}

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [visitorCount, setVisitorCount] = useState(0);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedUserId, setSelectedUserId] = useState(null); // State to track selected user
  const router = useRouter();

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
    async function loadData() {
      const count = await fetchVisitorCount();
      setVisitorCount(count);
    }
    loadData();
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
        console.log(data);
      } else {
        const errorData = await res.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async () => {
    if (!selectedUserId) return;

    try {
      const res = await fetch(`${API_BASE_URL}/admin/${selectedUserId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== selectedUserId),
        );
        setShowModal(false); // Close modal after successful delete
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

 
  const [totalCount, setTotalCount] = useState(0);

  const calculateTotal = () => {
    let total = 0;

    users.forEach((user) => {
      user.itinerary?.forEach((item) => {
        if (item.stay) {
          total += 1; 
        } else if (item.experiences?.length) {
          total += item.experiences.length; 
        }
      });
    });

    setTotalCount(total);
  };

  useEffect(() => {
    calculateTotal();
  }, [users]);

  const chartData = [
    { name: "Users", count: users.length },
    { name: "Visitors", count: visitorCount },
    { name: "Journeys", count: totalCount }, 
  ];
  return (
    <>
      {/* 🔝 Navbar */}
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        sticky="top"
        className="shadow-sm"
      >
        <Container>
          <Navbar.Brand href="/">🌿 Admin Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar" />
          <Navbar.Collapse id="admin-navbar">
            <Nav className="ms-auto">
              <Button
                variant="outline-light"
                size="sm"
                className="ms-3"
                onClick={() => router.push("/")}
              >
                <FaHome className="me-1" />
                Home
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* 🔲 Main Container */}
      <Container className="mt-5">
        {/* 🔢 Top Stats Cards */}
        <Row className="mb-4">
          <Col md={6} className="mb-3">
            <Card className="bg-light border-0 shadow-sm rounded-4">
              <Card.Body className="d-flex align-items-center">
                <div className="me-3">
                  <div
                    className="bg-success bg-opacity-25 text-success d-flex justify-content-center align-items-center rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <FaUserPlus size={24} />
                  </div>
                </div>
                <div>
                  <h6 className="mb-0 text-muted">Total Users</h6>
                  <h4 className="fw-bold text-success">{users.length}</h4>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-3">
            <Card className="bg-light border-0 shadow-sm rounded-4">
              <Card.Body className="d-flex align-items-center">
                <div className="me-3">
                  <div
                    className="bg-success bg-opacity-25 text-success d-flex justify-content-center align-items-center rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <FaLightbulb size={24} />
                  </div>
                </div>
                <div>
                  <h6 className="mb-0 text-muted">Website Visitors</h6>
                  <h4 className="fw-bold text-success">{visitorCount}</h4>
                </div>
              </Card.Body>
            </Card>
          </Col>
        
<Col md={6} className="mb-3">
  <Card className="bg-light border-0 shadow-sm rounded-4">
    <Card.Body className="d-flex align-items-center">
      <div className="me-3">
        <div
          className="bg-success bg-opacity-25 text-success d-flex justify-content-center align-items-center rounded-circle"
          style={{ width: "50px", height: "50px" }}
        >
          <FaSuitcaseRolling size={24} />
        </div>
      </div>
      <div>
        <h6 className="mb-0 text-muted">Journey Count</h6> 
        <h4 className="fw-bold text-success">{totalCount}</h4>
      </div>
    </Card.Body>
  </Card>
</Col>
        </Row>

        {/* 📊 Chart */}
        <Row className="mb-5">
          <Col md={12}>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#198754" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </Col>
        </Row>

        {/* 👤 User Cards */}
        <Row className="mb-5">
          {users.map((user) => (
            <Col md={4} key={user._id} className="mb-4">
              <Card className="shadow-sm border-0 rounded-4">
                <Card.Body>
                  <Card.Title className="fw-semibold">
                    {user.name || user.username}
                  </Card.Title>
                  <div className="d-flex gap-2 mt-3">
                    <Button
                      variant="success"
                      href={`/admin/updateUser?userId=${user._id}`}
                    >
                      <FaUserEdit className="me-1" /> Update
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setSelectedUserId(user._id); // Set the selected user ID
                        setShowModal(true); // Show the modal
                      }}
                    >
                      <FaTrash className="me-1" /> Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* ➕ Buttons */}
        <Row className="mb-4 justify-content-center">
          <Col md={4} className="mb-2">
            <Button
              variant="success"
              size="lg"
              className="w-100"
              href="/admin/addUser"
            >
              <FaPlus className="me-2" />
              Add User
            </Button>
          </Col>
          <Col md={4} className="mb-2">
            <Button
              variant="warning"
              size="lg"
              className="w-100"
              href="/admin/tips"
            >
              <FaBook className="me-2" />
              View Tips
            </Button>
          </Col>
        </Row>
      </Container>

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
