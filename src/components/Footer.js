import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer style={{ backgroundColor: '#F6F6F6', color: 'black', padding: '40px 0' }}>
            <Container>
                <Row>
                    <Col md={4}>
                        <h5>DriftWay</h5>
                        <p>At DriftWay, we’re passionate about helping you discover the world through sustainable, meaningful travel experiences.</p>
                    </Col>
                    <Col md={4}>
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/">Home</a></li>
                            <li><a href="#features" >Features</a></li>
                            <li><a href="#eco-partners">Eco Partnerships</a></li>
                            <li><a href="/contact" >Contact Us</a></li>
                            <li><a href="/terms">Terms of Service</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                        </ul>
                    </Col>
                    <Col md={4}>
                        <h5>Newsletter</h5>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter your email" style={{ border: '1px solid #333' }} />
                            </Form.Group>
<<<<<<< HEAD
<<<<<<< HEAD
                            <Button variant="dark" type="submit">Subscribe</Button>
=======
                            <Button variant="primary" type="submit">Subscribe</Button>
>>>>>>> 6a51d3c (structure changed)
=======
                            <Button variant="dark" type="submit">Subscribe</Button>
>>>>>>> 3bec758 (adding booking feature files)
                        </Form>
                        <div className="social-icons mt-3">
                            <a href="https://instagram.com" style={{ marginRight: '10px' }}><FaInstagram size={24} /></a>
                            <a href="https://facebook.com" style={{ marginRight: '10px' }}><FaFacebook size={24} /></a>
                            <a href="https://twitter.com" style={{ marginRight: '10px' }}><FaTwitter size={24} /></a>
                            <a href="https://linkedin.com" style={{ marginRight: '10px' }}><FaLinkedin size={24} /></a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;


// import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import { FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

// const Footer = () => {
//     return (
//         <footer style={{ backgroundColor: '#333', color: '#fff', padding: '40px 0' }}>
//             <Container>
//                 <Row>
//                     <Col md={4}>
//                         <h5>DriftWay</h5>
//                         <p>Discover the world through sustainable, meaningful travel experiences.</p>
//                     </Col>
//                     <Col md={4}>
//                         <h5>Quick Links</h5>
//                         <ul className="list-unstyled">
//                             <li><a href="/">Home</a></li>
//                             <li><a href="#features">Features</a></li>
//                             <li><a href="#eco-partners">Eco Partnerships</a></li>
//                             <li><a href="/contact">Contact Us</a></li>
//                         </ul>
//                     </Col>
//                     <Col md={4}>
//                         <h5>Contact Us</h5>
//                         <Form>
//                             <Form.Control type="text" placeholder="Enter your email" />
//                             <Button variant="success" className="mt-2">Subscribe</Button>
//                         </Form>
//                         <div className="social-icons mt-3">
//                             <a href="#"><FaInstagram size={24} /></a>
//                             <a href="#"><FaFacebook size={24} /></a>
//                             <a href="#"><FaTwitter size={24} /></a>
//                             <a href="#"><FaLinkedin size={24} /></a>
//                         </div>
//                     </Col>
//                 </Row>
//             </Container>
//         </footer>
//     );
// };

<<<<<<< HEAD
<<<<<<< HEAD
// export default Footer;
=======
// export default Footer;
>>>>>>> 6a51d3c (structure changed)
=======
// export default Footer;
>>>>>>> d6d7489 (Home page implemented (#27))
