

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
| | |

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
