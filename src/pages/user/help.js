import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaUserShield, FaCreditCard, FaGlobe, FaLifeRing } from 'react-icons/fa';
import { useRouter } from 'next/router';
import UserLayout from '@/components/UserLayout';
import styles from '@/styles/UserProfile.module.css';

const HelpCenter = () => {
    const router = useRouter();

    const helpTopics = [
        {
            icon: <FaUserShield size={30} className="text-primary" />,
            title: 'Account Support',
            description: 'Manage login, security, and personal settings.',
            link: '/user/faq#account'
        },
        {
            icon: <FaCreditCard size={30} className="text-success" />,
            title: 'Payment Issues',
            description: 'Help with transactions, refunds, and billing.',
            link: '/user/faq#payment'
        },
        {
            icon: <FaGlobe size={30} className="text-info" />,
            title: 'Booking & Travel',
            description: 'Assistance with bookings, itineraries and locations.',
            link: '/user/faq#travel'
        },
        {
            icon: <FaLifeRing size={30} className="text-warning" />,
            title: 'Other Questions',
            description: 'Need help with something else? We got you.',
            link: '/user/contact'
        }
    ];

    return (
        <UserLayout title="Help Center" description="Get assistance with your account, payments, and travel.">
            <Container style={{ marginTop: '0px' }}>
                <h2 className="text-center mb-4">Help Center</h2>
                <Row className="mb-5">
                    {helpTopics.map((topic, index) => (
                        <Col md={6} lg={4} key={index} className="mb-4">
                            <Card className="h-100 shadow-sm">
                                <Card.Body>
                                    <div className="mb-3">{topic.icon}</div>
                                    <Card.Title>{topic.title}</Card.Title>
                                    <Card.Text>{topic.description}</Card.Text>
                                    <Button className={styles["custom-button"]} onClick={() => router.push(topic.link)}>Learn More</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                <div className="text-center">
                    <h5>Still need help?</h5>
                    <p>Reach out to our support team for more assistance.</p>
                    <Button variant="dark" className={styles["save-btn"]} onClick={() => router.push('/user/contact')}>Contact Us</Button>
                </div>
            </Container>
        </UserLayout>
    );
};

export default HelpCenter;
