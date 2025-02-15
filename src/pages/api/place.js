import axios from 'axios';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { place_id } = req.query;
    const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

    if (!place_id) {
        return res.status(400).json({ error: "Missing place_id parameter" });
    }

    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json`, {
            params: {
                place_id,
                key: GOOGLE_MAPS_API_KEY,
                fields: 'name,formatted_address,photos,rating,reviews,types,website,geometry,formatted_phone_number,international_phone_number,editorial_summary',
            },
        });

        console.log("Google Places API Response:", response.data);

        if (response.data.status !== "OK") {
            return res.status(400).json({ error: response.data.status });
        }

        // ✅ Ensure overview is correctly extracted
        res.status(200).json({
            name: response.data.result.name,
            formatted_address: response.data.result.formatted_address,
            formatted_phone_number: response.data.result.formatted_phone_number || null,
            rating: response.data.result.rating,
            overview: response.data.result.editorial_summary?.overview || "No description available",
            website: response.data.result.website || null,
            geometry: response.data.result.geometry,
            photos: response.data.result.photos || [],
        });
    } catch (error) {
        console.error("Error fetching place details:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
