import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar'; // Separate Sidebar Component
import styles from '@/styles/UserProfile.module.css';

const UserLayout = ({ children }) => {
    return (
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
    );
};

export default UserLayout;
