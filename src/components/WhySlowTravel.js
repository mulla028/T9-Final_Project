<<<<<<< HEAD
// import { Container, Row, Col, Button } from 'react-bootstrap';
// import { FaLeaf, FaGlobe, FaHandsHelping } from 'react-icons/fa';

// const WhySlowTravel = () => {
//     return (
//         <div
//             id="why-slow-travel" // Section ID for navigation
//             className="why-slow-travel"
//             style={{ padding: '60px 0', backgroundColor: '#f9f9f9' }}
//         >
//             <Container>
//                 <h2 className="text-center mb-4">Why Slow Travel Matters</h2>
//                 <Row>
//                     <Col md={4} className="text-center">
//                         <FaLeaf size={50} color="#28a745" />
//                         <h3>Sustainability</h3>
//                         <p>Focus on eco-friendly itineraries, carbon footprint reduction, and sustainable accommodations.</p>
//                     </Col>
//                     <Col md={4} className="text-center">
//                         <FaGlobe size={50} color="#007bff" />
//                         <h3>Cultural Immersion</h3>
//                         <p>Connect deeply with local cultures and engage in respectful community experiences.</p>
//                     </Col>
//                     <Col md={4} className="text-center">
//                         <FaHandsHelping size={50} color="#ffc107" />
//                         <h3>Support Local</h3>
//                         <p>Promote local businesses, homestays, and community-driven experiences for a more meaningful impact.</p>
//                     </Col>
//                 </Row>
//                 {/* <div className="d-flex justify-content-center mt-5">
//                     <Button variant="primary" size="lg" href="/booking" className="my-button">
//                         Start Planning Your Trip
//                     </Button>
//                 </div> */}
//             </Container>
//         </div>
//     );
// };

// export default WhySlowTravel;

import { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaLeaf, FaGlobe, FaHandsHelping } from 'react-icons/fa';

const WhySlowTravel = () => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 } // Trigger when 20% of the section is visible
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <div
            id="why-slow-travel"
            ref={sectionRef}
            className={`why-slow-travel ${isVisible ? 'animate-section' : 'hidden'}`}
            style={{
                padding: '60px 0',
                background: 'linear-gradient(to bottom, #f7fcfc, #ffffff)',
            }}
        >
            <Container>
                <h2
                    className="text-center mb-5"
                    style={{
                        color: '#333',
                    }}
                >
                    Why Slow Travel Matters
                </h2>
                <Row>
                    <Col md={4} className="text-center">
                        <FaLeaf size={50} color="#66bb6a" />
                        <h3
                            style={{
                                fontSize: '1.8rem',
                                color: '#333',
                                marginTop: '15px',
                            }}
                        >
                            Sustainability
                        </h3>
                        <p
                            style={{
                                fontSize: '1rem',
                                color: '#555',
                                lineHeight: '1.6',
                                marginTop: '10px',
                            }}
                        >
                            Focus on eco-friendly itineraries, carbon footprint reduction, and sustainable accommodations.
                        </p>
                    </Col>
                    <Col md={4} className="text-center">
                        <FaGlobe size={50} color="#42a5f5" />
                        <h3
                            style={{
                                fontSize: '1.8rem',
                                color: '#333',
                                marginTop: '15px',
                            }}
                        >
                            Cultural Immersion
                        </h3>
                        <p
                            style={{
                                fontSize: '1rem',
                                color: '#555',
                                lineHeight: '1.6',
                                marginTop: '10px',
                            }}
                        >
                            Connect deeply with local cultures and engage in respectful community experiences.
                        </p>
                    </Col>
                    <Col md={4} className="text-center">
                        <FaHandsHelping size={50} color="#ffca28" />
                        <h3
                            style={{
                                fontSize: '1.8rem',
                                color: '#333',
                                marginTop: '15px',
                            }}
                        >
                            Support Local
                        </h3>
                        <p
                            style={{
                                fontSize: '1rem',
                                color: '#555',
                                lineHeight: '1.6',
                                marginTop: '10px',
                            }}
                        >
                            Promote local businesses, homestays, and community-driven experiences for a more meaningful impact.
                        </p>
                    </Col>
                </Row>
=======
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaLeaf, FaGlobe, FaHandsHelping } from 'react-icons/fa';

const WhySlowTravel = () => {
    return (
        <div className="why-slow-travel" style={{ padding: '60px 0', backgroundColor: '#f9f9f9' }}>
            <Container>
                <h2 className="text-center mb-4">Why Slow Travel Matters</h2>
                <Row>
                    <Col md={4} className="text-center">
                        <FaLeaf size={50} color="#28a745" />
                        <h3>Sustainability</h3>
                        <p>Focus on eco-friendly itineraries, carbon footprint reduction, and sustainable accommodations.</p>
                    </Col>
                    <Col md={4} className="text-center">
                        <FaGlobe size={50} color="#007bff" />
                        <h3>Cultural Immersion</h3>
                        <p>Connect deeply with local cultures and engage in respectful community experiences.</p>
                    </Col>
                    <Col md={4} className="text-center">
                        <FaHandsHelping size={50} color="#ffc107" />
                        <h3>Support Local</h3>
                        <p>Promote local businesses, homestays, and community-driven experiences for a more meaningful impact.</p>
                    </Col>
                </Row>
                <div className="d-flex justify-content-center mt-5">
                    <Button variant="primary" size="lg" href="/booking" className=" my-button">Start Planning Your Trip</Button>
                </div>
>>>>>>> 6a51d3c (structure changed)
            </Container>
        </div>
    );
};

export default WhySlowTravel;
<<<<<<< HEAD


=======
>>>>>>> 6a51d3c (structure changed)
