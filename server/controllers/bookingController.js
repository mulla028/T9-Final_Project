// const User = require('../models/User'); 
// const mongoose = require('mongoose');

// const addBooking = async (req, res) => {
//     console.log(req.body);
//     try {
//         const { placeName, location, checkIn, checkOut, guests, email, phone, package, totalPrice, preferences, experiences } = req.body;

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "User not found." });
//         }
//         if ((!placeName || !checkIn || !checkOut || !guests || !phone) && (!experiences || experiences.length === 0)) {
//             return res.status(400).json({ message: "Not enough information has been submitted to make a reservation." });
//         }

//         const newBooking = {};
//         let bookingDate;

//         if (placeName && checkIn && checkOut && guests) {
//             newBooking.stay = { placeName, location, checkIn, checkOut, guests, phone, package, totalPrice, preferences };
//             bookingDate = new Date(checkIn);
//         }

//         if (experiences && experiences.length > 0) {
//             newBooking.experiences = experiences.map(exp => ({
//                 name: exp.name,
//                 location: exp.location || null,
//                 time: exp.time,
//                 date: exp.date
//             }));
//             const earliestExpDate = new Date(Math.min(...experiences.map(exp => new Date(exp.date).getTime())));
//             bookingDate = bookingDate ? (earliestExpDate < bookingDate ? earliestExpDate : bookingDate) : earliestExpDate;
//         }

//         newBooking.bookingDate = bookingDate;
//         user.itinerary.push(newBooking);

//        
//         user.itinerary.sort((a, b) => {
//             const dateA = a.bookingDate ? new Date(a.bookingDate) : new Date(0);
//             const dateB = b.bookingDate ? new Date(b.bookingDate) : new Date(0);
//             return dateA - dateB;
//         });

//         
//         user.itinerary.forEach((item, index) => {
//             item.day = index + 1;
//         });

//         await user.save();

//         res.status(201).json({ message: "Reservation successfully added!", itinerary: user.itinerary });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "An error occurred on the server." });
//     }
// };

// module.exports = { addBooking };



const User = require('../models/User');

const addBooking = async (req, res) => {
    console.log(req.body);
    try {
        const { placeName, location, checkIn, checkOut, guests, email, phone, package, totalPrice, preferences, experiences } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        if ((!placeName || !checkIn || !checkOut || !guests || !phone) && (!experiences || experiences.length === 0)) {
            return res.status(400).json({ message: "Not enough information has been submitted to make a reservation." });
        }


        const newBooking = {
            day: user.itinerary.length + 1,
        };

        if (placeName && checkIn && checkOut && guests) {
            newBooking.stay = { placeName, location, checkIn, checkOut, guests, phone, package, totalPrice, preferences };
        }

        if (experiences && experiences.length > 0) {
            newBooking.experiences = experiences.map(exp => ({
                name: exp.name,
                location: exp.location || null,
                time: exp.time,
                date: exp.date
            }));
            console.log(experiences)
        }

        user.itinerary.push(newBooking);

        await user.save();

        res.status(201).json({ message: "Reservation successfully added!", itinerary: user.itinerary });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred on the server." });
    }
};

module.exports = { addBooking };


