# Changelog  
Every sprint's progress relflected here.

## Sprint 2 (Sp-2)  

### Deployment

* Web Application has been **deployed** using vercel here's the [link](https://drift-way.vercel.app) where you access it!

#### **Access Control & Restrictions**

- Only authenticated users can make bookings.
- Direct API access is restricted for unauthorized users.
- Implemented input validation to prevent invalid or incomplete bookings.
- Limited the number of guests per booking to **5 people**.

### New Features  

- **Admin Dashboard for Service Statistics** ([#44](https://github.com/mulla028/T9-Final_Project/pull/44))  
  - Added a new **Admin Dashboard** that allows admins to view important service statistics:  
    - Total number of visitors  
    - Total registered users  
    - Total trips booked  (will be added in the next sprints)
  - Only admins can access the dashboard  
  - Unauthorized users are blocked from accessing the page  

- **Search Results Section Enhancements** ([#48](https://github.com/mulla028/T9-Final_Project/pull/48))
  - Integrated a Search Results Component to dynamically display search results below the Hero section.
  - Ensured that the results push the WhySlowTravel section down instead of appearing inside Hero.js.
  - Implemented automatic scroll behavior so that users are taken to the search results after submitting a query.

- **Booking Feature Added** ([#62](https://github.com/mulla028/T9-Final_Project/pull/62))
  - Implemented the booking system that allows users to book stays (accommodations) and experiences (activities).
  - Users can add bookings to their **itinerary**, whether paid or unpaid.
  - Integrated **Google Place IDs** to display details of selected destinations and to prevent duplicate entries for the same location.
  - Booking details include check-in/check-out dates, number of guests, and pricing.
  - Implemented caching to reduce API calls using Redis.

- **Booking Confirmation Feature Added** ([#66](https://github.com/mulla028/T9-Final_Project/pull/66))
  - Implemented Modal Window
  - With user selected data
  - Confirmation functionality doesn't work yet, the main force was in UI 

### Testing  

**Admin Dashboard**
- Verified that only admin users can access the dashboard  
- Confirmed that direct URL access is restricted for unauthorized users  
- Simulated and tested the statistics display to ensure accuracy  

**Search Results Section Enhancements**
- Verified that the search results component appears below Hero.js and adjusts page layout accordingly.
- Ensured the scrolling effect redirects users to search results automatically.
- Confirmed that Header authentication logic displays the correct buttons based on login state.
- Manually tested server API routes to ensure all endpoints work correctly post-merge.

**Booking Feature Added**
- Verified that users can **view a list of hotels** in a selected destination.
- Confirmed that users can **select check-in and check-out dates**.
- Ensured that users can **specify the number of guests** (up to 5).
- Checked that users can **add optional preferences** in the text field.
- Simulated various inputs to validate system behavior and prevent invalid entries.

## Sprint 1

### Added

- We have implemented this page bla bla bla. [#11](https://github.com/mulla028/T9-Final_Project/pull/11)
- Added the homepage [#27](https://github.com/mulla028/T9-Final_Project/pull/27)
- Registration Page [#29](https://github.com/mulla028/T9-Final_Project/pull/29)
- Forgot Password logic and UI/UX using `nodemailer` Added [#28](https://github.com/mulla028/T9-Final_Project/pull/28)
- Login Page logic and UI implemented using OAuth [#23](https://github.com/mulla028/T9-Final_Project/pull/23)

