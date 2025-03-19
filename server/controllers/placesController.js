// controllers/placesController.js
const redisClient = require('../config/redis');
const Tip = require('../models/Tip');

const apiKey = process.env.GOOGLE_MAPS_API_KEY;

// Pricing functions
const getCustomPrice = (priceLevel) => {
    switch (priceLevel) {
        case 1: return { price: 50, label: "Inexpensive" };
        case 2: return { price: 100, label: "Moderate" };
        case 3: return { price: 200, label: "Expensive" };
        case 4: return { price: 350, label: "Very Expensive" };
        default: return null; // No price info
    }
};

function estimatePriceLevel(types, locality, rating) {
    if (types.includes("lodging")) return estimateHotelPrice(types, rating);
    if (types.includes("restaurant") || types.includes("bar") || types.includes("cafe")) return estimateRestaurantPrice(types, rating);

    // General logic for other businesses
    if (types.includes("resort") || types.includes("luxury") || types.includes("jewelry_store") || rating > 4.5) return 4;
    if (types.includes("museum") || types.includes("casino") || types.includes("spa") || rating > 3.8) return 3;
    if (types.includes("store") || types.includes("clothing_store") || types.includes("movie_theater") || rating > 2.8) return 2;

    return 1; // Default to inexpensive
}

function estimateHotelPrice(types, rating) {
    if (types.includes("motel") || types.includes("hostel") || types.includes("campground") || rating <= 2.5) return 1;
    if (types.includes("inn") || types.includes("guest_house") || rating <= 3.8) return 2;
    if (types.includes("boutique_hotel") || rating <= 4.5) return 3;
    if (types.includes("resort") || types.includes("5-star_hotel") || rating > 4.5) return 4;
    return 2; // Default to standard hotel if unknown
}

function estimateRestaurantPrice(types, rating) {
    if (types.includes("fast_food") || types.includes("meal_takeaway") || rating <= 2.5) return 1;
    if (types.includes("restaurant") || types.includes("cafe") || rating <= 3.8) return 2;
    if (types.includes("gastropub") || types.includes("bar") || rating <= 4.5) return 3;
    if (types.includes("fine_dining") || types.includes("5-star_restaurant") || rating > 4.5) return 4;
    return 2; // Default to casual dining if unknown
}


exports.searchPlaces = async (req, res) => {
    try {
        console.log("Request received:", req.query); // Log query parameters
        const { location, travelStyle } = req.query;

        if (!location || !travelStyle) {
            return res.status(400).json({ error: "Location and travelStyle are required" });
        }

        // Check cache first
        const cacheKey = `searchPlaces:${location}:${travelStyle}`;
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log("Serving from cache...");
            return res.json(JSON.parse(cachedData));
        }

        // Define search query based on travelStyle
        let placeQuery = "lodging"; // Default
        const styleQueries = {
            "Cultural Immersion": "museums in",
            "Outdoor Adventures": "national parks, hiking trails in",
            "Eco-Stays": "eco-lodges, sustainable hotels in",
            "Eco-Tourism": "nature reserves, eco-tourism in",
            "Farm-to-Table Dining": "organic restaurants, farmers markets in",
            "Wildlife Conservation": "wildlife sanctuaries, nature reserves in"
        };
        if (styleQueries[travelStyle]) {
            placeQuery = `${styleQueries[travelStyle]} ${location}`;
        }

        // Fetch basic place data
        const searchUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(placeQuery)}&key=${apiKey}`;
        const searchResponse = await fetch(searchUrl);
        if (!searchResponse.ok) throw new Error(`Google API error: ${searchResponse.statusText}`);
        const searchData = await searchResponse.json();

        // Extract place_ids for Places Details API
        const detailedPlaces = await Promise.all(searchData.results.slice(0, 20).map(async (place) => {
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

        // Cache results for 24 hours
        await redisClient.set(cacheKey, JSON.stringify(detailedPlaces), { EX: 86400 });

        console.log("Serving from API...");
        res.json(detailedPlaces);
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

        // CHECK CACHE FIRST
        const cachedData = await redisClient.get(place_id);
        if (cachedData) {
            const { data, timestamp } = JSON.parse(cachedData);
            const currentTime = Date.now();
            const cacheAge = (currentTime - timestamp) / 1000; // Convert to seconds

            // AUTO-REFRESH CACHE IF OLD (every 24 hours)
            if (cacheAge < 86400) { // 86400 sec = 24 hours
                console.log("Serving from cache...");
                return res.json(data);
            }
        }

        const fields = "name,address_components,formatted_address,formatted_phone_number,photos,editorial_summary,rating,user_ratings_total,reviews,reservable,price_level,website,geometry,types";

        const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=${fields}&key=${apiKey}`;
        const detailsResponse = await fetch(detailsUrl);
        if (!detailsResponse.ok) throw new Error(`Google API error: ${detailsResponse.statusText}`);
        const detailsData = await detailsResponse.json();

        // Extract details
        const result = detailsData.result;
        const components = result.address_components || [];

        let locality = "Unknown";
        let route = "Unknown";
        let country = "Unknown";

        if (components.length > 0) {
            for (const component of components) {
                if (component.types.includes("locality")) {
                    locality = component.long_name;
                }
                if (locality === "Unknown" && component.types.includes("route")) {
                    route = component.long_name;
                }
                if (component.types.includes("country")) {
                    country = component.long_name; // Use short_name for country code if needed
                }
            }
        }

        const estimatedPriceLevel = estimatePriceLevel(result.types, locality, result.rating);
        const finalPriceLevel = result.price_level ?? estimatedPriceLevel;

        const placeDetails = {
            name: result.name,
            locality: locality,
            route: route,
            country: country,
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
            ) || [],
            priceLevel: finalPriceLevel,
            customPrice: getCustomPrice(finalPriceLevel),
            reservable: result.reservable || ["lodging", "restaurant", "tourist_attraction"].some(type => result.types.includes(type)),
            types: result.types
        };

        // 🌱 Fetch Relevant Eco-Friendly Tips  
        const relevantTips = await Tip.find({
            $or: [
                { category: { $in: result.types } }, // Match place types (e.g., "hotel", "park")
                { category: locality }, // Match city
                { category: country }, // Match country
                { category: "general" } // Include general tips as a fallback
            ]
        });

        placeDetails.ecoTips = relevantTips.map(tip => tip.text);

        console.log("Eco-Tips:", placeDetails.ecoTips);

        // STORE IN CACHE WITH TIMESTAMP
        const cacheData = { data: placeDetails, timestamp: Date.now() };
        await redisClient.set(place_id, JSON.stringify(cacheData));

        console.log("Serving from API...");
        res.json(placeDetails);

    } catch (error) {
        console.error("Error fetching place details:", error);
        res.status(500).json({ error: "Error fetching place details from Google Places API" });
    }
};

exports.getNearbyAttractions = async (req, res) => {
    try {
        let { location } = req.query;

        // Ensure location is properly formatted
        if (!location || !location.includes(",")) {
            return res.status(400).json({ error: "Invalid location format" });
        }

        // Check cache first
        const cacheKey = `nearbyAttractions:${location}`;
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log("Serving from cache...");
            return res.json(JSON.parse(cachedData));
        }

        const attractionsUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=5000&type=tourist_attraction&keyword=eco&key=${apiKey}`;

        const response = await fetch(attractionsUrl);
        const data = await response.json();

        // Process results
        const attractions = data.results.map(place => ({
            name: place.name || "Unknown",
            rating: place.rating || "No rating",
            location: place.vicinity || "No location available",
            image: place.photos
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${place.photos[0].photo_reference}&key=${apiKey}`
                : null
        }));

        // Cache results for 12 hours
        await redisClient.set(cacheKey, JSON.stringify(attractions), { EX: 43200 });

        console.log("Serving from API...");
        res.json(attractions);
        res.json(attractions);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch attractions" });
    }
};

exports.getLocalExperiences = async (req, res) => {
    try {
        const { location, category, sortBy } = req.query;

        if (!location) {
            return res.status(400).json({ error: "Location is required" });
        }

        // Check cache first
        const cacheKey = `localExperiences:${location}:${category}:${sortBy}`;
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            console.log("Serving from cache...");
            return res.json(JSON.parse(cachedData));
        }

        // Define curated categories
        let placeTypes = [];
        if (category === "Workshops") {
            placeTypes = ["art_gallery", "university", "point_of_interest", "school", "cultural_center"];
        } else if (category === "Cultural") {
            placeTypes = ["museum", "church", "historical_landmark", "synagogue", "hindu_temple", "mosque"];
        } else if (category === "Eco-Friendly") {
            placeTypes = ["park", "nature_reserve", "farm", "botanical_garden", "wildlife_park"];
        } else if (category === "Dining") {
            placeTypes = ["restaurant", "cafe", "bakery", "farmers_market", "vegan_restaurant"];
        } else if (category === "Adventure") {
            placeTypes = ["hiking_trail", "campground", "ski_resort", "climbing_area", "rafting"];
        } else if (category === "Tours") {
            placeTypes = ["tourist_attraction", "zoo", "aquarium", "winery", "brewery", "boat_tour"];
        } else {
            // If 'All Categories' is selected or no category is provided, return all relevant experiences
            placeTypes = [];
        }


        const searchUrl = category !== ""
            ? `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(location)}&type=${placeTypes.join("|")}&key=${apiKey}`
            : `https://maps.googleapis.com/maps/api/place/textsearch/json?query=things to do in ${encodeURIComponent(location)}&key=${apiKey}`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();

        if (!searchData.results || searchData.results.length === 0) {
            return res.json([]);
        }

        // Fetch place details for each experience
        let experiences = await Promise.all(
            searchData.results.slice(0, 20).map(async (place) => {
                const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,formatted_address,photos,rating,user_ratings_total,editorial_summary,price_level&key=${apiKey}`;
                const detailsResponse = await fetch(detailsUrl);
                const detailsData = await detailsResponse.json();

                return {
                    id: place.place_id,
                    name: detailsData.result.name,
                    address: detailsData.result.formatted_address,
                    description: detailsData.result.editorial_summary?.overview || "No description available.",
                    rating: detailsData.result.rating || "No Rating",
                    userRatings: detailsData.result.user_ratings_total || 0,
                    priceLevel: detailsData.result.price_level || "N/A",
                    image: detailsData.result.photos
                        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${detailsData.result.photos[0].photo_reference}&key=${apiKey}`
                        : "/images/default-experience.jpg"
                };
            })
        );

        // **Sorting Logic**
        if (sortBy === "Price") {
            experiences.sort((a, b) => (a.priceLevel === "N/A" ? 1 : a.priceLevel - b.priceLevel));
        } else if (sortBy === "Rating") {
            experiences.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === "Popularity") {
            experiences.sort((a, b) => b.userRatings - a.userRatings);
        }

        // Cache results for 12 hours
        await redisClient.set(cacheKey, JSON.stringify(experiences), { EX: 43200 });

        console.log("Serving from API...");
        res.json(experiences);
    } catch (error) {
        console.error("Error fetching local experiences:", error);
        res.status(500).json({ error: "Error fetching local experiences" });
    }
};
