

## System Architecture

- `Frontend`: **Next.JS**
- `Backend`: **Node.js**
- `Database`: MongoDB
- `Authentication`: **JWT**, **GoogleAuth** & **FacebookAuth**
- `Hosting`: **Railway** for **backend** and **Vercel** for **frontend**

## Technologies Used

| Component | Technology |
| :--- | :---: |
| `Frontend` | **Next.js v14.2** |
| `Backend` | **Node.js v22.8** |
| `Databse` | **MongoDB** |
| `Auth` | **JWT, GOOGLEAUTH, FACEBOOKAUTH** |
| `Hosting` | **Vercel, Railway** |

## API Endpoints

| Endpoint | Description |
| --- | ---: |
| POST/api/Admin/login/admin | Authenticate an admin |
| GET/api/Admin | Get all admins |
| POST/api/Admin | Create a new user |
| PATCH/api/Admin/:id | Update a user's details |
| DELETE/api/Admin/:id | Delete an inactive user |
| POST/api/auth/register | Register a new user |
| POST/api/auth/login | Authenticate a user |
| GET/api/auth/google | Google login route |
| GET/api/auth/facebook | Facebook login route |
| GET/api/auth/google/callback | Callback route for Google |
| GET/api/auth/facebook/callback | Callback route for Facebook |
| POST/api/bookings/add | Add a new booking | 
| POST/api/bookings/addMultiple | Add bookings for multiple days |
| GET/api/carbon/calculate | Get calculated carbon emissions |
| GET/api/faqs | Get all FAQs |
| POST/api/faqs| Admin-only: Post new FAQs |
| GET/api/feedback | Get feedbacks with user info |
| POST/api/feedback | Post a new feedback |
| GET/api/notifications/ | Get all user notifications |
| DELETE/api/notifications/:id | Dismiss a notification |
| PATCH/api/notifications/:id | Mark a notification as read |
| PATCH/api/notifications/mark-all-read | Mark all notifications as read |
| GET/api/notifications/unread-count | Get the number of unread notifications |
| GET/api/places | Get search results |
| GET/api/places/details | Get details for a destination |
| GET/api/places/nearby | Get nearby attractions |
| GET/api/places/experiences| Get local experiences |
| GET/api/privacy | Get the privacy policy |
| POST/api/privacy | Admin-only: Update the privacy policy |
| GET/api/terms | Get the terms of service |
| POST/api/privacy | Admin-only: Update the terms of service |
| POST/api/token/refresh-token | Route to refresh expired token |
| POST/api/support/contact | Send a support message |
| GET/api/tips | Get all eco-friendly tips |
| POST/api/tips | Admin-only: Create a new tip |
| PUT/api/tips/:tipId | Admin-only: Update an existing tip |
| DELETE/api/tips/:tipId | Admin-only: Delete a tip |
| GET/api/users/profile | Get a user's details |
| PUT/api/users/profile | Update a user's profile |
| DELETE/api/users/profile/:id | Delete a user account |
| PUT/api/users/password | Change a user's password |
| GET/api/users | Admin-only: Get all user accounts |
| POST/api/passwordResetEmail | Send email for password reset |
| POST/api/resetPassword | Send reset password |
| GET/api/visitors | Get the number of visitors |
| POST/api/itinerary | Get the user itinerary details for a specific day |
| POST/api/itineraries | Get all user itineraries |
| POST/api/setItinerary | Set the user itinerary details for a specific day |
| DELETE/api/deleteItinerary | Remove a destination from itinerary |

---

## Installation Instructions

> Instructions on how to set up an environment for local development, I would move it to `CONTRIBUTION.md`

1. Clone Repository: 

```bash
git clone https://github.com/mulla028/T9-Final_Project.git
cd T9-Final_Project
```

2. Set up Backend
   * Go to the backend folder (/server)
     ```bash
     cd server
     ```
    * Install dependencies
      ```bash
      npm i
      ```

    * Create .env file
      ```bash
      touch .env
      ```
    * Add the variables to `server/.env`
      ```
      GOOGLE_CLIENT_ID=<>
      GOOGLE_CLIENT_SECRET=<>
      FACEBOOK_APP_ID=<>
      FACEBOOK_APP_SECRET=<>
      JWT_SECRET=<>
      MONGODB_URI=<>
      PASSWORD_SALT=<>
      REDIS_PASSWORD=<>
      REDIS_HOST=<>
      REDIS_PORT=<>
      GOOGLE_MAPS_API_KEY=<>
      EMAIL_USER=<>
      EMAIL_PASS=<>
      JWT_REFRESH_SECRET=<>
      ```
    * Start the backend server
      ```bash
      npm start
      ```
Now your backend should be running!

4. Set Up frontend
   
   * Go back to the root of the project and install the dependencies
     ```bash
     npm i (in T9-Final_Project/)
     ```
  * Create .env file
    ```bash
    touch .env
    ```
  * Add these ENV VARS
    ```
    REACT_APP_GOOGLE_CLIENT_ID=<>
    REACT_APP_FACEBOOK_APP_ID=<>
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<>
    ```
  * Build frontend
    ```
    npm run build
    ```
  * Run frontend
    ```
    npm start
    or
    npm run dev
    ```
**Now web application is accessible at [http://localhost:3000]()**

## Public Server Instructions

* Backend: **Hosted on Railway**, _auto-deployed from main branch_
* Frontend: **Hosted on Vercel**, _auto-deployed from main branch_

## Test Account Credentials

* Username: king@gmail.com
* Password: 12345678
