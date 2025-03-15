import { Container, Row, Col, Card, Button, ListGroup, Navbar, Nav, Accordion } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getItineraries } from '@/services';
import React, { useState, useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";

const ItineraryOverview = () => {
    const router = useRouter();
    const { id } = router.query;
    const printRef = useRef(null); // Reference for print content
    const [itineraries, setItineraries] = useState([]);
    const [activeKey, setActiveKey] = useState(null); // State to track open accordion;

    const handleToggle = (eventKey) => {
        setActiveKey(activeKey === eventKey ? null : eventKey); // Toggle between open and closed
    };

    useEffect(() => {
        if (!id) return;

        // Fetch the itineraries for the specific user
        const fetchItinerary = async () => {
            try {
                const itineraryData = await getItineraries(id);

                if (itineraryData) {
                    let newItineraries = []; // Temporary array to accumulate stops
                    // Convert itinerary data to stop data from stay
                    console.log(itineraryData.itinerary);

                    itineraryData.itinerary.forEach(itinerary => {
                        var newStops = [];
                        // Get all the experiences and stays
                        if (itinerary)
                            newStops.push(itinerary.stay?.placeName.toString());

                        itinerary.experiences?.forEach(experience => {
                            newStops.push(experience.name ? experience.name.toString() : experience.location);
                        });

                        var newItinerary = {
                            day: itinerary.day,
                            stops: newStops
                        }
                        newItineraries.push(newItinerary);
                    });
                    setItineraries(newItineraries);
                    console.log(itineraries);

                } else {
                    console.log("No itinerary found");
                }

            } catch (error) {
                console.error("Error fetching itinerary:", error);
            }
        };

        fetchItinerary();
    }, [id]);

    // Function to navigate to the itinerary planner with the day query
    const handleEditDay = (day) => {
        router.push({
            pathname: "/itinerary-planner",
            query: { id, day }, // Pass both id and day as query parameters
        });
    };

    // Generate HTML for printing
    const generateItineraryHTML = () => {
        if (!itineraries || itineraries.length === 0) {
            return "<h2>No Itinerary Available</h2>";
        }

        let html = `<h2 style="font-family: 'Lora', serif; font-weight: 700; font-size: 2.5rem;">DriftWay</h2>
        `;

        itineraries.forEach((dayPlan) => {
            html += `
               
                <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 15px; border-radius: 5px;">
                    <h3 style="background: #28a745; color: white; padding: 10px; border-radius: 5px;">Day ${dayPlan.day}</h3>
                    <ul style="list-style-type: none; padding-left: 0;">`;

            // dayPlan.experiences.forEach((stop) => {
            //     html += `
            //         <li style="padding: 8px; border-bottom: 1px solid #eee;">
            //             <strong>${stop.name || stop.placeName}</strong><br>
            //             <span style="color: #555;">${stop.address ? stop.address : "No address available"}</span>
            //         </li>`;
            // });

            html += `</ul></div>`;
        });

        return html;
    };

    // Function to trigger print/download
    const handlePrint = useReactToPrint({
        documentTitle: "Itinerary Overview",
        contentRef: printRef,
    });

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container fluid="md">
                    <Navbar.Brand href="/">Driftway</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Container>
            </Navbar>

            <Container className="itinerary-planner" style={{ marginTop: '60px' }}>
                <div className="hero" >
                    <h2 className="text-center mb-4">Your Itinerary Overview</h2>
                    <p>You can select a day to add or remove your experiences and stays.</p>
                </div>
                <br />

                {itineraries.length > 0 ? (
                    <Accordion activeKey={activeKey}>
                        <Row>
                            {itineraries.map((dayPlan, index) => (
                                <Col md={6} key={index} className="mb-3"> {/* Two-column layout */}
                                    <Accordion.Item eventKey={index.toString()}>
                                        <Accordion.Header
                                            onClick={() => handleToggle(index.toString())}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontWeight: "bold",
                                                height: "50px",
                                                width: "100%",
                                            }}
                                        >
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

                {/* Generate pdf for download */}
                <div
                    ref={printRef}
                    style={{ padding: "20px", margin: "20px", backgroundColor: "white" }} 
                    className="print-only"
                    dangerouslySetInnerHTML={{ __html: generateItineraryHTML() }}
                />

                {/* Share & Download Options */}
                <div className="text-center mt-5">
                    <Button variant="success" className="mr-3" onClick={handlePrint}>Download Itinerary</Button>
                    <Button variant="primary">Share Itinerary</Button>
                </div>
            </Container>

            {/* Hide pdf content only for print */}
            <style>
                {`
                @media print {
                    .print-only {
                        display: block !important; /* Show only when printing */
                    }
                }
                    
                .print-only {
                    display: none; /* Hide by default */
                }
            `}
            </style>
        </>
    );
};

export default ItineraryOverview;
