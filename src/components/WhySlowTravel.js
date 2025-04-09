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
        <section id="why-slow-travel">        
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
            </Container>
        </div>
        </section>
    );
};

export default WhySlowTravel;


