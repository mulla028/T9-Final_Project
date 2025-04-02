const User = require("../models/User");

const addBooking = async (req, res) => {
  console.log(req.body);
  try {
    const {
      place_id,
      placeName,
      location,
      checkIn,
      checkOut,
      guests,
      email,
      phone,
      package,
      totalPrice,
      preferences,
      experiences,
    } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (
      (!placeName || !checkIn || !checkOut || !guests || !phone) &&
      (!experiences || experiences.length === 0)
    ) {
      return res
        .status(400)
        .json({ message: "Not enough information has been submitted to make a reservation." });
    }

    // Create a new booking object
    const newBooking = {};

    if (placeName && checkIn && checkOut && guests) {
      newBooking.stay = {
        placeId: place_id,
        placeName,
        location,
        checkIn,
        checkOut,
        guests,
        phone,
        package,
        totalPrice,
        preferences,
      };
    }

    if (experiences && experiences.length > 0) {
      newBooking.experiences = experiences.map((exp) => ({
        placeId: exp.placeId,
        name: exp.name,
        location: exp.location || null,
        time: exp.time,
        paid: exp.paid || false,
        date: exp.date,

      }));
    }

    // Add the new booking to the user's itinerary
    user.itinerary.push(newBooking);

    // Sorting logic
    user.itinerary.sort((a, b) => {
      const getDate = (entry) => entry.stay?.checkIn || entry.experiences?.[0]?.date || "";
      return new Date(getDate(a)) - new Date(getDate(b));
    });

    // Re-number days
    user.itinerary.forEach((entry, index) => {
      entry.day = index + 1;
    });

    // Save updated user itinerary
    await user.save();

    res.status(201).json({
      id: user._id,
      message: "Reservation successfully added!",
      itinerary: user.itinerary,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred on the server." });
  }
};

module.exports = { addBooking };
