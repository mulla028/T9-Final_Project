# Changelog  

## Sprint 2 (Sp-2)  

### New Features  
- **Admin Dashboard for Service Statistics** ([#44](https://github.com/mulla028/T9-Final_Project/pull/44))  
  - Added a new **Admin Dashboard** that allows admins to view important service statistics:  
    - Total number of visitors  
    - Total registered users  
    - Total trips booked  (will be added in the next sprints)
  - Only admins can access the dashboard  
  - Unauthorized users are blocked from accessing the page  

### Testing  
- Verified that only admin users can access the dashboard  
- Confirmed that direct URL access is restricted for unauthorized users  
- Simulated and tested the statistics display to ensure accuracy  

### New Features
- **Search Results Section Enhancements** ([#48](https://github.com/mulla028/T9-Final_Project/pull/48))
  - Integrated a Search Results Component to dynamically display search results below the Hero section.
  - Ensured that the results push the WhySlowTravel section down instead of appearing inside Hero.js.
  - Implemented automatic scroll behavior so that users are taken to the search results after submitting a query.

### Testing
- Verified that the search results component appears below Hero.js and adjusts page layout accordingly.
- Ensured the scrolling effect redirects users to search results automatically.
- Confirmed that Header authentication logic displays the correct buttons based on login state.
- Manually tested server API routes to ensure all endpoints work correctly post-merge.

