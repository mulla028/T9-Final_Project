const User = require("../models/User");
const Notification = require("../models/Notification");

const addBooking = async (req, res) => {
  console.log(req.body);
  try {
    const {
      date,
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

    // Find an existing itinerary entry with the same date
    let existingEntry;
    let newDay = false;
    existingEntry = user.itinerary.find(itinerary => itinerary.date?.toISOString().split('T')[0] === new Date(date).toISOString().split('T')[0]);

    if (!existingEntry) {
      // If no existing entry is found, create a new one
      existingEntry = { day: 0, date, stay: null, experiences: [] };
      newDay = true;
    }

    if (placeName && checkIn && checkOut && guests) {
      existingEntry.stay = {
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
      existingEntry.experiences.push(
        ...experiences.map((exp) => ({
          placeId: exp.placeId,
          name: exp.name,
          location: exp.location || null,
          time: exp.time,
          paid: exp.paid || false,
          date: exp.date,

        })));
    }

    // If you did add a new booking, then sort the dates
    if (newDay) {
      user.itinerary.push(existingEntry);
      // Sorting logic
      console.log(user.itinerary);
      user.itinerary.sort((a, b) => {
        const getDate = (entry) => entry.date || entry.stay?.checkIn || entry.experiences?.[0]?.date || "";
        return new Date(getDate(a)) - new Date(getDate(b));
      });

      // Re-number days
      user.itinerary.forEach((entry, index) => {
        entry.day = index + 1;
      });
    }
    // Save updated user itinerary
    await user.save();

    // Create a notification for the user
    const notification = new Notification({
      userId: user._id,
      type: "Booking Confirmation",
      message: existingEntry
        ? `Your booking at ${existingEntry.experiences?.[0]?.name} is confirmed!`
        : "Your booking is confirmed!", // Fallback message if no stay is found
      icon: "success",
      relatedId: existingEntry.experiences[0]?._id || null,
      timestamp: new Date(),
    });

    await notification.save();
    console.log(notification);

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

const addMultipleBookings = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found." });
  }

  if (
    (!req.body.plans[0].placeName || !req.body.plans[0].checkIn || !req.body.plans[0].checkOut ||
      !req.body.plans[0].guests || !req.body.plans[0].phone) &&
    (!req.body.plans[0].experiences || req.body.plans[0].experiences.length === 0)
  ) {
    return res
      .status(400)
      .json({ message: "Not enough information has been submitted to make a reservation." });
  }

  try {
    req.body.plans.forEach(async plan => {
      const {
        date,
        place_id,
        placeName,
        location,
        checkIn,
        checkOut,
        guests,
        phone,
        package,
        totalPrice,
        preferences,
        experiences,
      } = plan;

      // Find an existing itinerary entry with the same date
      let existingEntry = user.itinerary.find(itinerary => itinerary.date?.toISOString().split('T')[0] === new Date(date).toISOString().split('T')[0]);
      let newDay = false;

      if (!existingEntry) {
        // If no existing entry is found, create a new one
        existingEntry = { date, stay: null, experiences: [] };
        newDay = true;
      }

      // Add the date
      existingEntry.date = date;

      if (placeName && checkIn && checkOut && guests) {
        existingEntry.stay = {
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
        existingEntry.experiences.push(
          ...experiences.map((exp) => ({
            placeId: exp.placeId,
            name: exp.name,
            location: exp.location || null,
            time: exp.time,
            paid: exp.paid || false,
            date: exp.date,

          })));
      }

      // Push the new itinerary if it does not exist
      if (newDay) user.itinerary.push(existingEntry);
    });

    // Sorting logic
    user.itinerary.sort((a, b) => {
      const getDate = (entry) => entry.date || entry.stay?.checkIn || entry.experiences?.[0]?.date || "";
      return new Date(getDate(a)) - new Date(getDate(b));
    });

    // Re-number days
    user.itinerary.forEach((entry, index) => {
      entry.day = index + 1;
    });

    // Save updated user itinerary
    await user.save();

    // Find the most recent itinerary entry with a stay
    const recentStayEntry = user.itinerary.find(itinerary => itinerary.stay?.placeName);

    // Create a notification for the user
    const notification = new Notification({
      userId: user._id,
      type: "Booking Confirmation",
      message: recentStayEntry
        ? `Your booking at ${recentStayEntry.stay.placeName} is confirmed!`
        : "Your booking is confirmed!", // Fallback message if no stay is found
      icon: "success",
      relatedId: recentStayEntry?.stay?.placeId || null,
      timestamp: new Date(),
    });

    await notification.save();
    console.log(notification);

    res.status(201).json({
      id: user._id,
      message: "Reservations are successfully added!",
      itinerary: user.itinerary,
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred on the server." });
  }
}

module.exports = { addBooking, addMultipleBookings };
