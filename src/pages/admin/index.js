import { Container, Row, Col, Card, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";

async function fetchUsers() {
  const res = await fetch("http://localhost:8080/api/Users");
  const data = await res.json();
  return data;
}

async function fetchVisitorCount() {
  const res = await fetch("http://localhost:8080/api/visitors");
  const data = await res.json();
  return data.count;
}

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [visitorCount, setVisitorCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
      return;
    }

    fetch("http://localhost:8080/api/Admin", {
      headers: { Authorization: `Bearer ${token}` },
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

  const handleDelete = async (userId) => {
    const res = await fetch(`http://localhost:8080/api/Users/${userId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setUsers(users.filter(user => user.id !== userId));
    } else {
      alert('Failed to delete user');
    }
  };

  // Data for the bar chart
  const chartData = [
    { name: "Users", count: users.length },
    { name: "Visitors", count: visitorCount },
  ];

  return (
    <Container className="personalized-dashboard" style={{ marginTop: "60px" }}>
      {/* Display the total number of users and visitors */}
      <h2 className="text-center mb-4">All Users ({users.length})</h2>
      <h3 className="text-center mb-4">Total Website Visitors: {visitorCount}</h3>

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
                  href={`/admin/updateUser?userId=${user.id}`}
                >
                  Update User
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(user.id)}
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
    </Container>
  );
}