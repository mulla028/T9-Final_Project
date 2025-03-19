import { useState } from "react";
import { Card, Button, Collapse } from "react-bootstrap";

const TipsDisplay = ({ tips }) => {
    const [expanded, setExpanded] = useState(false);
    const visibleCount = 2;

    console.log("TipsDisplay tips: ", tips);


    return (
        <div className="mt-4">
            <h4>🌿 Eco-Friendly Travel Tips</h4>

            {/* Display Key Tips */}
            {tips?.slice(0, visibleCount).map((tip, index) => (
                <Card key={index} className="mb-2 p-2 shadow-sm">
                    <Card.Body>{tip}</Card.Body>
                </Card>
            ))}

            {/* Collapsible Section for More Tips */}
            <Collapse in={expanded}>
                <div className="mt-2">
                    {tips.slice(visibleCount).map((tip, index) => (
                        <Card key={index} className="mb-2 p-2 shadow-sm">
                            <Card.Body>{tip}</Card.Body>
                        </Card>
                    ))}
                </div>
            </Collapse>

            {/* Show More / Show Less Button */}
            {tips.length > visibleCount && (
                <Button
                    variant="outline-success"
                    className="mt-2"
                    onClick={() => setExpanded(!expanded)}
                >
                    {expanded ? "Show Less Tips" : "See More Tips"}
                </Button>
            )}
        </div>
    );
};

export default TipsDisplay;
