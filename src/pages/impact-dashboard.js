import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Container, Row, Col, Card, ProgressBar, ListGroup, Form, Button, Badge } from 'react-bootstrap';
import { FaLeaf, FaCar, FaBiking, FaWalking, FaBus, FaPlane, FaArrowLeft, FaChartLine, FaTree } from 'react-icons/fa';
import Head from 'next/head';
import Link from 'next/link';

const TravelModeInsights = () => {
    return (
        <Row className="mb-5">
            <Col>
                <Card className="shadow-sm">
                    <Card.Body>
                        <h4 className="border-bottom pb-2 mb-4">Travel Mode Environmental Insights</h4>
                        
                        <Row>
                            <Col md={6} lg={4} className="mb-4">
                                <div className="d-flex">
                                    <div className="me-3">
                                        <div className="bg-light p-3 rounded-circle">
                                            <FaCar size={30} className="text-secondary" />
                                        </div>
                                    </div>
                                    <div>
                                        <h5>Car Travel</h5>
                                        <ul className="small ps-3">
                                            <li>Avg. emissions: 120g CO₂/km per passenger</li>
                                            <li>Higher for SUVs and older vehicles</li>
                                            <li>Electric vehicles reduce emissions by ~70%</li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            
                            <Col md={6} lg={4} className="mb-4">
                                <div className="d-flex">
                                    <div className="me-3">
                                        <div className="bg-light p-3 rounded-circle">
                                            <FaBiking size={30} className="text-success" />
                                        </div>
                                    </div>
                                    <div>
                                        <h5>Bicycle</h5>
                                        <ul className="small ps-3">
                                            <li>Nearly zero direct emissions</li>
                                            <li>Small lifecycle emissions from manufacturing</li>
                                            <li>Added health benefits offset environmental costs</li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            
                            <Col md={6} lg={4} className="mb-4">
                                <div className="d-flex">
                                    <div className="me-3">
                                        <div className="bg-light p-3 rounded-circle">
                                            <FaWalking size={30} className="text-info" />
                                        </div>
                                    </div>
                                    <div>
                                        <h5>Walking</h5>
                                        <ul className="small ps-3">
                                            <li>Zero emissions transport option</li>
                                            <li>Most sustainable for distances under 2km</li>
                                            <li>Zero noise pollution and infrastructure impact</li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            
                            <Col md={6} lg={4} className="mb-4">
                                <div className="d-flex">
                                    <div className="me-3">
                                        <div className="bg-light p-3 rounded-circle">
                                            <FaBus size={30} className="text-primary" />
                                        </div>
                                    </div>
                                    <div>
                                        <h5>Public Transport</h5>
                                        <ul className="small ps-3">
                                            <li>Avg. emissions: 70g CO₂/km per passenger</li>
                                            <li>Emissions per person decrease with ridership</li>
                                            <li>Electric buses reduce emissions significantly</li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            
                            <Col md={6} lg={4} className="mb-4">
                                <div className="d-flex">
                                    <div className="me-3">
                                        <div className="bg-light p-3 rounded-circle">
                                            <FaPlane size={30} className="text-danger" />
                                        </div>
                                    </div>
                                    <div>
                                        <h5>Air Travel</h5>
                                        <ul className="small ps-3">
                                            <li>Avg. emissions: 250g CO₂/km per passenger</li>
                                            <li>Higher impact due to emissions at altitude</li>
                                            <li>Short flights have higher per-km emissions</li>
                                        </ul>
                                    </div>
                                </div>
                            </Col>
                            
                            <Col md={6} lg={4} className="mb-4">
                                <div className="bg-light p-3 rounded">
                                    <h5 className="mb-3">Sustainable Travel Tips</h5>
                                    <ul className="small">
                                        <li>Combine trips to reduce total distance</li>
                                        <li>Opt for newer, fuel-efficient vehicles</li>
                                        <li>Consider carbon offset programs</li>
                                        <li>Use multi-modal transport for optimal efficiency</li>
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
};


const ImpactDashboard = () => {
    const router = useRouter();
    
    // State management with default values
    const [carbonFootprint, setCarbonFootprint] = useState(null);
    const [tripDistance, setTripDistance] = useState(0);
    const [transportMode, setTransportMode] = useState("car");
    const [averageSpeed, setAverageSpeed] = useState(60);
    const [isLoading, setIsLoading] = useState(true);
    const [lastTripCO2, setLastTripCO2] = useState(24);
    const [treesNeeded, setTreesNeeded] = useState(0);
    const [alternativeModes, setAlternativeModes] = useState([]);
    const [ecoTips, setEcoTips] = useState([]);

    // Update state when query params are available
    useEffect(() => {
        if (router.isReady) {
            if (router.query.distance) {
                setTripDistance(parseFloat(router.query.distance));
            }
            
            if (router.query.mode) {
                setTransportMode(router.query.mode);
            }
        }
    }, [router.isReady, router.query]);

    // Fetch carbon data when transport mode or distance changes
    useEffect(() => {
        if (!router.isReady || tripDistance <= 0) return;
        
        setIsLoading(true);
        
        // Calculate average speed based on transport mode
        let speed = 60; // default for car
        switch(transportMode) {
            case "bike":
                speed = 15;
                break;
            case "walk":
                speed = 5;
                break;
            case "public":
                speed = 30;
                break;
            case "flight":
                speed = 800;
                break;
        }
        setAverageSpeed(speed);
        
        fetch(`/api/carbon/calculate?mode=${transportMode}&distance=${tripDistance}`)
            .then(res => res.json())
            .then(data => {
                setCarbonFootprint(data.carbonKg);
                
                // Calculate trees needed to offset this carbon (very rough estimate: 1 tree absorbs ~22kg CO2 per year)
                setTreesNeeded(Math.ceil(data.carbonKg / 22));
                
                // Generate alternative mode data
                generateAlternativeModes(data.carbonKg, transportMode);
                
                // Set eco-friendly tips based on transport mode
                setEcoTips(getEcoTips(transportMode));
                
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching carbon data:", err);
                // Fallback values if API fails
                let fallbackCarbon = 0;
                if (transportMode === "car") fallbackCarbon = 0.12 * tripDistance;
                if (transportMode === "bike") fallbackCarbon = 0.05 * tripDistance;
                if (transportMode === "walk") fallbackCarbon = 0;
                if (transportMode === "public") fallbackCarbon = 0.07 * tripDistance;
                if (transportMode === "flight") fallbackCarbon = 0.25 * tripDistance;
                
                setCarbonFootprint(fallbackCarbon);
                setTreesNeeded(Math.ceil(fallbackCarbon / 22));
                generateAlternativeModes(fallbackCarbon, transportMode);
                setEcoTips(getEcoTips(transportMode));
                setIsLoading(false);
            });
    }, [transportMode, tripDistance, router.isReady]);

    // Generate eco-friendly tips based on transport mode
    const getEcoTips = (mode) => {
        const tips = {
            car: [
                "Consider carpooling to reduce per-person emissions.",
                "Keep your tires properly inflated to improve fuel efficiency.",
                "Remove roof racks when not in use to reduce drag.",
                "Avoid excessive idling."
            ],
            bike: [
                "You're already making a great eco-friendly choice!",
                "Maintain your bike properly for optimal efficiency.",
                "Consider using bike share programs when traveling.",
                "Plan routes with dedicated bike lanes for safety."
            ],
            walk: [
                "Walking is one of the most eco-friendly transport options!",
                "Consider walking for short trips under 2km.",
                "Combine walking with public transport for longer journeys.",
                "Use walking paths and pedestrian shortcuts where available."
            ],
            public: [
                "Off-peak travel may be less crowded and more efficient.",
                "Consider multi-day or weekly passes for regular use.",
                "Combine public transport with walking or biking for first/last mile.",
                "Check for eco-certified transport operators."
            ],
            flight: [
                "Choose direct flights when possible to reduce emissions.",
                "Pack light to reduce aircraft weight and fuel consumption.",
                "Consider carbon offset programs offered by airlines.",
                "For short distances, consider train alternatives."
            ]
        };
        
        return tips[mode] || tips.car;
    };

    // Generate alternative transport modes data
    const generateAlternativeModes = (currentCarbon, currentMode) => {
        const alternatives = [];
        
        // Only calculate alternatives for modes other than the current one
        if (currentMode !== "car") {
            alternatives.push({
                mode: "car",
                icon: <FaCar size={30} />,
                name: "Car",
                carbon: 0.12 * tripDistance,
                comparison: ((0.12 * tripDistance - currentCarbon) / currentCarbon * 100).toFixed(0)
            });
        }
        
        if (currentMode !== "bike" && tripDistance <= 30) {
            alternatives.push({
                mode: "bike",
                icon: <FaBiking size={30} />,
                name: "Bike",
                carbon: 0.05 * tripDistance,
                comparison: ((0.05 * tripDistance - currentCarbon) / currentCarbon * 100).toFixed(0)
            });
        }
        
        if (currentMode !== "walk" && tripDistance <= 10) {
            alternatives.push({
                mode: "walk",
                icon: <FaWalking size={30} />,
                name: "Walking",
                carbon: 0,
                comparison: (-100).toFixed(0)
            });
        }
        
        if (currentMode !== "public") {
            alternatives.push({
                mode: "public",
                icon: <FaBus size={30} />,
                name: "Public Transport",
                carbon: 0.07 * tripDistance,
                comparison: ((0.07 * tripDistance - currentCarbon) / currentCarbon * 100).toFixed(0)
            });
        }
        
        if (currentMode !== "flight" && tripDistance >= 100) {
            alternatives.push({
                mode: "flight",
                icon: <FaPlane size={30} />,
                name: "Flight",
                carbon: 0.25 * tripDistance,
                comparison: ((0.25 * tripDistance - currentCarbon) / currentCarbon * 100).toFixed(0)
            });
        }
        
        setAlternativeModes(alternatives);
    };

    // Calculate percentage reduction compared to last trip
    const reductionPercentage = lastTripCO2 && carbonFootprint 
        ? Math.round(((lastTripCO2 - carbonFootprint) / lastTripCO2) * 100) 
        : 0;
    
    // Calculate impact percentage compared to typical car travel (used as baseline)
    const getImpactLevel = () => {
        if (!carbonFootprint) return { color: "secondary", label: "Not calculated" };
        
        const carEmission = 0.12 * tripDistance; // Baseline car emission
        const percentage = (carbonFootprint / carEmission) * 100;
        
        if (percentage <= 10) return { color: "success", label: "Excellent" };
        if (percentage <= 50) return { color: "info", label: "Good" };
        if (percentage <= 80) return { color: "warning", label: "Moderate" };
        return { color: "danger", label: "High" };
    };
    
    const impactLevel = getImpactLevel();
    
    // Get icon for current transport mode
    const getCurrentModeIcon = () => {
        switch(transportMode) {
            case "car": return <FaCar size={40} />;
            case "bike": return <FaBiking size={40} />;
            case "walk": return <FaWalking size={40} />;
            case "public": return <FaBus size={40} />;
            case "flight": return <FaPlane size={40} />;
            default: return <FaCar size={40} />;
        }
    };
    
    // Format the transport mode for display
    const formatTransportMode = (mode) => {
        switch(mode) {
            case "car": return "Car";
            case "bike": return "Bicycle";
            case "walk": return "Walking";
            case "public": return "Public Transport";
            case "flight": return "Flight";
            default: return "Car";
        }
    };
    
    // Get color based on carbon footprint
    const getCarbonColor = () => {
        if (!carbonFootprint) return "secondary";
        
        const carEmission = 0.12 * tripDistance; // baseline car emission
        const percentage = (carbonFootprint / carEmission) * 100;
        
        if (percentage <= 10) return "success";
        if (percentage <= 50) return "info";
        if (percentage <= 80) return "warning";
        return "danger";
    };

    // Handle going back to itinerary
    const goBackToItinerary = () => {
        router.push({
            pathname: "/itinerary-planner",
            query: { 
                id: router.query.id,
                day: router.query.day
            }
        });
    };

    return (
        <>
            <Head>
                <title>Environmental Impact Dashboard</title>
                <meta name="description" content="See the environmental impact of your travel choices" />
            </Head>
            
            <Container className="impact-dashboard mt-4 mb-5">
                <Button 
                    variant="outline-primary" 
                    className="mb-4" 
                    onClick={goBackToItinerary}
                >
                    <FaArrowLeft className="me-2" /> Back to Itinerary
                </Button>
                
                <Card className="shadow-sm mb-4">
                    <Card.Body>
                        <div className="d-flex align-items-center">
                            <FaLeaf size={36} className="text-success me-3" />
                            <div>
                                <h1 className="mb-0">Environmental Impact Dashboard</h1>
                                <p className="text-muted mb-0">Analyze and improve your travel footprint</p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>

                {/* Main Impact Summary */}
                <Row className="mb-4">
                    <Col lg={8}>
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <h4 className="border-bottom pb-2">Trip Impact Summary</h4>
                                
                                <Row className="align-items-center mt-4">
                                    <Col md={3} className="text-center">
                                        <div className="p-3 rounded-circle bg-light d-inline-block mb-2">
                                            {getCurrentModeIcon()}
                                        </div>
                                        <h5>{formatTransportMode(transportMode)}</h5>
                                    </Col>
                                    
                                    <Col md={9}>
                                        <Row>
                                            <Col sm={6} className="mb-3">
                                                <div className="small text-muted">DISTANCE</div>
                                                <h4>{tripDistance} km</h4>
                                            </Col>
                                            <Col sm={6} className="mb-3">
                                                <div className="small text-muted">AVG SPEED</div>
                                                <h4>{averageSpeed} km/h</h4>
                                            </Col>
                                            <Col sm={6} className="mb-3">
                                                <div className="small text-muted">CARBON FOOTPRINT</div>
                                                <h4 className={`text-${getCarbonColor()}`}>
                                                    {isLoading ? "Calculating..." : carbonFootprint ? `${carbonFootprint.toFixed(1)} kg CO₂` : "Not calculated"}
                                                </h4>
                                            </Col>
                                            <Col sm={6} className="mb-3">
                                                <div className="small text-muted">IMPACT LEVEL</div>
                                                <h4>
                                                    <Badge bg={impactLevel.color} className="px-3 py-2">{impactLevel.label}</Badge>
                                                </h4>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                                
                                <hr />
                                
                                <div className="mt-3">
                                    <h5>Carbon Offset Equivalent</h5>
                                    <p className="mb-2">Trees needed to absorb this carbon in one year:</p>
                                    <div className="d-flex align-items-center">
                                        {[...Array(Math.min(treesNeeded, 10))].map((_, i) => (
                                            <FaTree key={i} size={24} className="text-success me-1" />
                                        ))}
                                        {treesNeeded > 10 && <span className="ms-2">+{treesNeeded - 10} more</span>}
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col lg={4}>
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <h4 className="border-bottom pb-2">Change Transport Mode</h4>
                                
                                <Form className="mt-3">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Transport Mode</Form.Label>
                                        <Form.Select 
                                            value={transportMode} 
                                            onChange={(e) => setTransportMode(e.target.value)}
                                            className="form-select-lg"
                                        >
                                            <option value="car">Car</option>
                                            <option value="bike">Bicycle</option>
                                            <option value="walk">Walking</option>
                                            <option value="public">Public Transport</option>
                                            <option value="flight">Flight</option>
                                        </Form.Select>
                                    </Form.Group>
                                    
                                    <Form.Group>
                                        <Form.Label>Distance (km)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            size="lg"
                                            value={tripDistance}
                                            onChange={(e) => setTripDistance(parseFloat(e.target.value) || 0)}
                                            min="1"
                                        />
                                    </Form.Group>
                                </Form>
                                
                                <div className="mt-3 text-center">
                                    <p className="text-muted small">
                                        Adjust values above to see how different options impact your carbon footprint
                                    </p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Alternatives & Comparison */}
                <Row className="mb-4">
                    <Col md={6}>
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <h4 className="border-bottom pb-2">Alternative Options</h4>
                                
                                {alternativeModes.length > 0 ? (
                                    <ListGroup variant="flush">
                                        {alternativeModes.map((alt, index) => (
                                            <ListGroup.Item key={index} className="border-0 py-3">
                                                <div className="d-flex align-items-center">
                                                    <div className="me-3">
                                                        {alt.icon}
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <h5 className="mb-0">{alt.name}</h5>
                                                        <div>
                                                            <span className="me-3">{alt.carbon.toFixed(1)} kg CO₂</span>
                                                            <Badge bg={parseInt(alt.comparison) <= 0 ? "success" : "danger"}>
                                                                {parseInt(alt.comparison) <= 0 ? "↓" : "↑"} {Math.abs(parseInt(alt.comparison))}%
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                    <Button 
                                                        variant="outline-primary" 
                                                        size="sm"
                                                        onClick={() => setTransportMode(alt.mode)}
                                                    >
                                                        Select
                                                    </Button>
                                                </div>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-muted">No alternative transport options available for this distance.</p>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col md={6}>
                        <Card className="shadow-sm h-100">
                            <Card.Body>
                                <h4 className="border-bottom pb-2">Eco-Friendly Tips</h4>
                                
                                <div className="mt-3">
                                    {ecoTips.map((tip, index) => (
                                        <div key={index} className="mb-3">
                                            <div className="d-flex">
                                                <div className="me-3 text-success">
                                                    <FaLeaf />
                                                </div>
                                                <div>
                                                    {tip}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Comparison with Previous Trip */}
                <Row className="mb-4">
                    <Col md={12}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <h4 className="border-bottom pb-2">Comparison with Previous Trip</h4>
                                
                                <Row className="align-items-center mt-3">
                                    <Col md={4}>
                                        <div className="text-center">
                                            <FaChartLine size={40} className="text-primary mb-2" />
                                            <h5>Carbon Footprint Analysis</h5>
                                        </div>
                                    </Col>
                                    
                                    <Col md={8}>
                                        <div className="mb-3">
                                            <div className="d-flex justify-content-between mb-1">
                                                <span>Current Trip</span>
                                                <strong className={`text-${getCarbonColor()}`}>
                                                    {carbonFootprint ? `${carbonFootprint.toFixed(1)} kg CO₂` : "Not calculated"}
                                                </strong>
                                            </div>
                                            <div className="d-flex justify-content-between mb-1">
                                                <span>Previous Trip</span>
                                                <strong>{lastTripCO2} kg CO₂</strong>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <span className="small">Carbon Reduction</span>
                                            <ProgressBar
                                                now={reductionPercentage > 0 ? reductionPercentage : 0}
                                                label={`${reductionPercentage > 0 ? reductionPercentage : 0}% Lower`}
                                                className="mt-2"
                                                style={{ height: '1.5rem' }}
                                                variant={reductionPercentage > 0 ? "success" : "warning"}
                                            />
                                            
                                            {reductionPercentage > 0 ? (
                                                <p className="small text-success mt-2">
                                                    <FaLeaf className="me-1" />
                                                    Great job! Your current trip has a {reductionPercentage}% lower carbon footprint than your previous trip.
                                                </p>
                                            ) : (
                                                <p className="small text-muted mt-2">
                                                    Consider alternative transport options to reduce your carbon footprint compared to your last trip.
                                                </p>
                                            )}
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Travel Mode Insights */}
                <TravelModeInsights />
            </Container>
        </>
    );
};

export default ImpactDashboard;