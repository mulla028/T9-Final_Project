// controllers/placesController.js

exports.searchPlaces = async (req, res) => {
    try {
        console.log("Request received:", req.query); // Log query parameters
        const { location, travelStyle } = req.query;

        if (!location || !travelStyle) {
            return res.status(400).json({ error: "Location and travelStyle are required" });
        }

        const apiKey = process.env.GOOGLE_MAPS_API_KEY;

        // Define search query based on travelStyle
        let placeQuery = "lodging"; // Default

        if (travelStyle === "Cultural Immersion") {
            placeQuery = "museums in " + location;
        } else if (travelStyle === "Outdoor Adventures") {
            placeQuery = "national parks, hiking trails in " + location;
        } else if (travelStyle === "Eco-Stays") {
            placeQuery = "eco-lodges, sustainable hotels in " + location;
        } else if (travelStyle === "Eco-Tourism") {
            placeQuery = "nature reserves, eco-tourism in " + location;
        } else if (travelStyle === "Farm-to-Table Dining") {
            placeQuery = "organic restaurants, farmers markets in " + location;
        } else if (travelStyle === "Wildlife Conservation") {
            placeQuery = "wildlife sanctuaries, nature reserves in " + location;
        }

        // Fetch basic place data
        const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placeQuery)}&key=${apiKey}`;
        const searchResponse = await fetch(searchUrl);
        if (!searchResponse.ok) throw new Error(`Google API error: ${searchResponse.statusText}`);
        const searchData = await searchResponse.json();

        // Extract place_ids for Places Details API
        const places = await Promise.all(searchData.results.slice(0, 20).map(async (place) => {
            const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,photos,editorial_summary,rating,user_ratings_total,website&key=${apiKey}`;
            const detailsResponse = await fetch(detailsUrl);
            const detailsData = await detailsResponse.json();

            return {
                place_id: place.place_id,
                name: detailsData.result.name,
                address: detailsData.result.formatted_address,
                description: detailsData.result.editorial_summary?.overview || "No description available.",
                rating: detailsData.result.rating,
                userRatings: detailsData.result.user_ratings_total,
                website: detailsData.result.website || null,
                image: detailsData.result.photos ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${detailsData.result.photos[0].photo_reference}&key=${apiKey}` : null
            };
        }));

        res.json(places);
    } catch (error) {
        console.error("Error fetching places:", error);
        res.status(500).json({ error: "Error fetching places from Google Places API" });
    }
};

exports.getPlaceDetails = async (req, res) => {
    try {
        const { place_id } = req.query;

        if (!place_id) {
            return res.status(400).json({ error: "place_id is required" });
        }

        const apiKey = process.env.GOOGLE_MAPS_API_KEY;
        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,formatted_address,photos,editorial_summary,rating,user_ratings_total,website,geometry&key=${apiKey}`;
        const detailsResponse = await fetch(detailsUrl);
        if (!detailsResponse.ok) throw new Error(`Google API error: ${detailsResponse.statusText}`);
        const detailsData = await detailsResponse.json();

        // Extract details
        const result = detailsData.result;

        const placeDetails = {
            name: result.name,
            email: result.email || "Not Available",
            address: result.formatted_address,
            phone: result.formatted_phone_number || "Not Available",
            website: result.website || null,
            rating: result.rating || "No Rating",
            userRatings: result.user_ratings_total || 0,
            description: result.editorial_summary?.overview || "No description available.",
            lat: result.geometry.location.lat,
            lng: result.geometry.location.lng,
            mapUrl: `https://www.google.com/maps/search/?api=1&query=${result.geometry.location.lat},${result.geometry.location.lng}`,
            reviews: result.reviews?.map(review => ({
                author_name: review.author_name,
                rating: review.rating,
                text: review.text
            })) || [],
            images: result.photos?.map(photo =>
                `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${photo.photo_reference}&key=${apiKey}`
            ) || []
        };

        res.json(placeDetails);

    } catch (error) {
        console.error("Error fetching place details:", error);
        res.status(500).json({ error: "Error fetching place details from Google Places API" });
    }
};
