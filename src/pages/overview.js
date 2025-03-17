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
    const [itinerariesPrint, setItinerariesPrint] = useState([]);
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
                    setItinerariesPrint(itineraryData.itinerary); // Save the whole attributes for printing
                    let newItineraries = []; // Temporary array to accumulate stops
                    // Convert itinerary data to stop data from stay

                    itineraryData.itinerary.forEach(itinerary => {
                        var newStops = [];
                        // Get all the experiences and stays
                        if (itinerary) {
                            if (itinerary.stay && itinerary.stay != {}) {
                                newStops.push(itinerary.stay?.placeName ? itinerary.stay?.placeName : itinerary.stay?.location);
                            }

                            itinerary.experiences?.forEach(experience => {
                                newStops.push(experience.name ? experience.name.toString() : experience.location);
                            });
    
                            var newItinerary = {
                                day: itinerary.day,
                                stops: newStops
                            }
                            newItineraries.push(newItinerary);
                        }
                    });
                    setItineraries(newItineraries);

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
        console.log(itinerariesPrint);

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

            if(dayPlan.stay) {
                html += `
                <li style="padding: 8px; border-bottom: 1px solid #eee;">
                    <strong><b>Stay: </b>${dayPlan.stay.placeName}</strong><br>
                    <strong><b>Check-in: </b>${dayPlan.stay.checkIn.split("T")[0]}</strong><br>
                    <strong><b>Check-out: </b>${dayPlan.stay.checkOut.split("T")[0]}</strong><br>
                    <strong><b>Guests: </b>${dayPlan.stay.guests}</strong><br>
                    <strong><b>Location: </b>${dayPlan.stay.location}</strong><br>
                    <strong><b>Phone: </b>${dayPlan.stay.phone}</strong><br>
                </li>`;
            } 

            dayPlan.experiences?.forEach((exp) => {
                html += `
                <li style="padding: 8px; border-bottom: 1px solid #eee;">
                    <strong><b>Experience: </b>${exp.name}</strong><br>
                    <strong><b>Date: </b>${exp.date?.split("T")[0]} ${exp.time?exp.time:null}</strong><br>
                    <strong><b>Location: </b>${exp.location}</strong><br>
                </li>`;
            });
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
                        pageBreakBefore: 'always',
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
