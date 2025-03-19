const express = require("express");

const router = express.Router();

const fetch = require("node-fetch");
 
const getCarbonEstimate = async (transportMode, distance) => {

    const apiKey = process.env.CARBON_API_KEY;

    const url = "https://www.carboninterface.com/api/v1/estimates";
 
    const requestBody = {

        type: transportMode === "flight" ? "flight" : "vehicle",

        distance_unit: "km",

        distance_value: distance

    };
 
    if (transportMode === "flight") {

        requestBody.legs = [{ departure_airport: "JFK", destination_airport: "LHR" }];

    } else {

        requestBody.vehicle_type = transportMode === "car" ? "gasoline" : "electric-bike"; 

    }
 
    const response = await fetch(url, {

        method: "POST",

        headers: {

            "Authorization": `Bearer ${apiKey}`,

            "Content-Type": "application/json"

        },

        body: JSON.stringify(requestBody)

    });
 
    const data = await response.json();

    console.log("API Response:", JSON.stringify(data, null, 2));

     // Check if the response has the expected structure
    if (!data || !data.data || !data.data.attributes) {
        console.error("Unexpected API response structure:", data);
        
        // Return a fallback value based on transport mode
        if (transportMode === "bike") return 2.3;
        if (transportMode === "car") return 12.5;
        if (transportMode === "flight") return 85.0;
        return 0;
    }

    return data.data.attributes.carbon_kg; // Returns emissions in kg of CO2

};
 
// API route to calculate carbon emissions 
router.get("/calculate", async (req, res) => {
    try {
        const { mode, distance } = req.query;
        if (!mode || !distance) {
            return res.status(400).json({ error: "Transport mode and distance are required" });
        }

        // Parse distance as a float to ensure proper calculation
        const distanceValue = parseFloat(distance);
        
        // Calculate based on mode and distance
        let carbonKg = 0;
        
        if (mode === "car") {
            carbonKg = 0.12 * distanceValue; // ~120g CO2 per km
        } else if (mode === "flight") {
            carbonKg = 0.25 * distanceValue; // ~250g CO2 per km
        } else if (mode === "bike") {
            carbonKg = 0.05 * distanceValue; // ~50g CO2 per km (including manufacturing)
        } else if (mode === "walk") {
            carbonKg = 0; // No direct emissions
        }
        
        // Return the calculated value with 2 decimal places
        res.json({ carbonKg: parseFloat(carbonKg.toFixed(2)) });
    } catch (error) {
        console.error("Error calculating carbon data:", error);
        res.status(500).json({ error: "Failed to calculate carbon footprint" });
    }
});
 
module.exports = router;


 