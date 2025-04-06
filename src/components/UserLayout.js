import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import Sidebar from './Sidebar'; // Separate Sidebar Component
import styles from '@/styles/UserProfile.module.css';

const UserLayout = ({ children }) => {
    const pathname = window.location.pathname;
    let pathName = pathname.split('/').pop();
    pathName = pathName.charAt(0).toUpperCase() + pathName.slice(1);

    return (
        <>
            {/* Back button to the home page */}
            <Container fluid className="mt-3 mb-2">
                {/* Back Button Row */}
                <Row>
                    <Col md={3} className="text-start">
                        <Button href="/" className="back-button" variant="link">
                            <FaArrowLeft /> Back
                        </Button>
                    </Col>
                </Row>

                {/* Page Title Centered Row */}
                <Row className="mt-1">
                    <Col className="text-center">
                        <h5>Account / {pathName}</h5>
                    </Col>
                </Row>
            </Container>

            {/* Sidebar and Profile Content */}
            <Container fluid>
                <Row>
                    <Col md={3} className={styles.sidebar}>
                        <Sidebar />
                    </Col>
                    <Col md={9} className={styles["profile-container"]}>
                        {children}
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default UserLayout;
