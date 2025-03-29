import { Container, Row, Col, Card, Button, ListGroup, Navbar, Accordion, Modal, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getItineraries } from '@/services';
import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FacebookShareButton, FacebookIcon } from 'next-share';
import { FaWhatsapp, FaFacebookSquare } from 'react-icons/fa';
import { GoLink } from "react-icons/go";
import { BiSolidSend } from "react-icons/bi";

const ItineraryOverview = () => {
    const router = useRouter();
    const { id } = router.query;
    const printRef = useRef(null);
    const [itineraries, setItineraries] = useState([]);
    const [itinerariesPrint, setItinerariesPrint] = useState([]);
    const [activeKey, setActiveKey] = useState(null);
    const [showModal, setShowModal] = useState(false);  // Modal state
    const [email, setEmail] = useState(""); // Email input
    const [shareLink, setShareLink] = useState("");
    const [copied, setCopied] = useState(false);  // State for "Copied!" message

    const handleToggle = (eventKey) => {
        setActiveKey(activeKey === eventKey ? null : eventKey);
    };

    useEffect(() => {
        if (!id) return;

        const fetchItinerary = async () => {
            try {
                const itineraryData = await getItineraries(id);
                if (itineraryData) {
                    setItinerariesPrint(itineraryData.itinerary);
                    let newItineraries = [];

                    itineraryData.itinerary.forEach(itinerary => {
                        var newStops = [];
                        if (itinerary) {
                            if (itinerary.stay && itinerary.stay != {}) {
                                newStops.push(itinerary.stay?.placeName || itinerary.stay?.location);
                            }

                            itinerary.experiences?.forEach(exp => {
                                newStops.push(exp.name || exp.location);
                            });

                            newItineraries.push({
                                day: itinerary.day,
                                stops: newStops
                            });
                        }
                    });
                    setItineraries(newItineraries);

                    // Create shareable link
                    const link = `${window.location.origin}/itinerary/${id}`;
                    setShareLink(link);
                } else {
                    console.log("No itinerary found");
                }
            } catch (error) {
                console.error("Error fetching itinerary:", error);
            }
        };

        fetchItinerary();
    }, [id]);

    const handleEditDay = (day) => {
        router.push({
            pathname: "/itinerary-planner",
            query: { id, day },
        });
    };

    const generateItineraryHTML = () => {
        if (!itinerariesPrint || itinerariesPrint.length === 0) {
            return "<h2>No Itinerary Available</h2>";
        }

        let html = `<div style="display:flex; align-items:baseline;"><h2 style="font-family: 'Lora', serif; font-weight: 700; font-size: 2.5rem;">DriftWay</h2>
                    <h3> - Your Itinerary</h3></div>`;

        itinerariesPrint.forEach((dayPlan) => {
            html += `
                <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px; border-radius: 5px;">
                    <h3 style="padding: 10px; border-radius: 5px;">Day ${dayPlan.day}</h3>
                    <ul style="list-style-type: none; padding-left: 0;">`;

            if (dayPlan.stay) {
                html += `
                <li style="padding: 8px; border-bottom: 1px solid #eee;">
                    <strong>Stay: </strong>${dayPlan.stay.placeName}<br>
                    <strong>Check-in: </strong>${dayPlan.stay.checkIn?.split("T")[0]}<br>
                    <strong>Check-out: </strong>${dayPlan.stay.checkOut?.split("T")[0]}<br>
                    <strong>Guests: </strong>${dayPlan.stay.guests}<br>
                    <strong>Location: </strong>${dayPlan.stay.location}<br>
                </li>`;
            }

            dayPlan.experiences?.forEach((exp) => {
                html += `
                <li style="padding: 8px; border-bottom: 1px solid #eee;">
                    <strong>Experience: </strong>${exp.name}<br>
                    <strong>Date: </strong>${exp.date?.split("T")[0]} ${exp.time || ''}<br>
                    <strong>Location: </strong>${exp.location}<br>
                </li>`;
            });
            html += `</ul></div>`;
        });
        console.log(html);
        return html;
    };

    const handlePrint = useReactToPrint({
        documentTitle: "Itinerary Overview",
        contentRef: printRef,
    });

    const handleShare = () => {
        setShowModal(true);
    };

    const handleSendEmail = () => {
        if (email) {
            window.location.href = `mailto:${email}?subject=Shared Itinerary&body=Check out my itinerary: ${shareLink}`;
        }
    };

    const handleShareWhatsApp = () => {
        window.open(`https://wa.me/?text=Check out my DriftWay itinerary: ${shareLink}`, '_blank');
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareLink)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);  // Hide message after 2 seconds
            })
            .catch(err => console.error("Failed to copy:", err));
    };

    const handleGoBack = () => {
        router.push({
            pathname: "/"
        });
    };

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid="md">
                    <Navbar.Brand href="/">Driftway</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Container>
            </Navbar>

            <Container className="itinerary-planner" style={{ marginTop: '20px' }}>
                <div className="hero" style={{ marginBottom: '20px' }}>
                    <h2 className="text-center mb-4">Your Itinerary Overview</h2>
                    <p>You can select a day to add or remove your experiences and stays.</p>
                </div>

                {itineraries.length > 0 ? (
                    <Accordion activeKey={activeKey}>
                        <Row>
                            {itineraries.map((dayPlan, index) => (
                                <Col md={6} key={index} className="mb-3">
                                    <Accordion.Item eventKey={index.toString()}>
                                        <Accordion.Header onClick={() => handleToggle(index.toString())}>
                                            Day {dayPlan.day}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <ListGroup variant="flush">
                                                {dayPlan.stops.map((stop, stopIndex) => (
                                                    <ListGroup.Item key={stopIndex}>{stop}</ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                            <Button
                                                variant="outline-primary"
                                                className="mt-3 w-100"
                                                onClick={() => handleEditDay(dayPlan.day)}
                                            >
                                                Edit Day {dayPlan.day}
                                            </Button>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Col>
                            ))}
                        </Row>
                    </Accordion>
                ) : (
                    <p className="text-center">Loading itinerary...</p>
                )}

                <div
                    ref={printRef}
                    style={{ padding: "20px", margin: "20px", backgroundColor: "white" }}
                    className="print-only"
                    dangerouslySetInnerHTML={{ __html: generateItineraryHTML() }}
                />

                <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
                    <Button variant="success p-2" onClick={handlePrint}> Download Itinerary </Button>
                    <Button variant="primary p-2" onClick={handleShare}> Share Itinerary </Button>
                    <Button variant="outline-secondary p-2" onClick={handleGoBack}> Go Back to Main Page </Button>
                </div>
            </Container>

            {/* Share Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Share Itinerary</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Control
                            type="email"
                            placeholder="Enter recipient's email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <div className="d-flex flex-wrap  gap-3 mt-3">
                        <Button variant="primary" onClick={handleSendEmail}>Email <BiSolidSend /></Button>
                        <Button variant="success" onClick={handleShareWhatsApp}>
                            <FaWhatsapp />
                        </Button>
                        <Button>
                            <FacebookShareButton
                                url="https://your-website.com/your-page"
                                quote="Hey I am having an eco conscious vacation!"
                                hashtag="#driftway #ecomindfultravelling"
                            >
                                <FaFacebookSquare className="mr-2" />
                            </FacebookShareButton>
                        </Button>
                        <Button
                            variant="primary"
                            onClick={handleCopyLink}
                        >
                            <GoLink /> {copied ? "Copied!" : "Copy Link"}
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>

            <style>{`
                @media print {
                    .print-only { display: block !important; }
                }
                .print-only { display: none; }
            `}</style>
        </>
    );
};

export default ItineraryOverview;
