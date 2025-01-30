import { useEffect, useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';

const AdminDashboard = () => {
    const [userCount, setUserCount] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get('http://localhost:8080/api/admin/dashboard', {
                    headers: { 'x-auth-token': token },
                });
                setUserCount(response.data.userCount);
            } catch (err) {
                console.error(err);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <Container>
            <h2>Admin Dashboard</h2>
            <Card>
                <Card.Body>
                    <h5>Total Registered Users: {userCount}</h5>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AdminDashboard;
