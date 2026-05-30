# FUTURE_FS_02 | Mini CRM (Client Lead Management System)

A clean, modern, junior-level Client Lead Management System (Mini CRM) built using the **MERN stack** (MongoDB, Express, React, Node.js). This project satisfies all core internship development requirements, presenting a high-end, responsive SaaS-style dashboard that is completely free of unnecessary visual gimmicks.

---

## Tech Stack Overview

- **Frontend**: React.js + Vite, Tailwind CSS, React Icons, Axios
- **Backend**: Node.js, Express.js, Mongoose, CORS, Dotenv
- **Database**: MongoDB Atlas (with a robust fallback to a local MongoDB instance)
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## Core Features

1. **Dashboard Overview**: Metrics overview cards displaying Total, New, Contacted, and Converted leads.
2. **Robust CRUD Operations**:
   - **Create**: Add client leads via a polished, input-validated overlay form.
   - **Read**: Dynamic responsive tabular presentation of clients.
   - **Update**: Edit full details or quickly change a lead's status inline.
   - **Delete**: Safely delete clients using a warning modal dialog.
3. **Advanced Filtering & Search**:
   - Search leads instantly by **Name** or **Email** (case-insensitive).
   - Filter leads by status (**All**, **New**, **Contacted**, **Converted**) with live badge counters.
4. **Notes & Follow-ups**: Record interaction logs and schedule follow-up dates directly in the lead profiles.

---

## Project Folder Structure

```
FUTURE_FS_02/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI elements (Navbar, Stats, Table, Modals)
│   │   ├── services/       # Axios API integrations
│   │   ├── App.jsx         # Primary React state controller
│   │   └── main.jsx        # Mounting point
│   ├── index.html          # Application entrypoint (links Inter typography)
│   ├── tailwind.config.js  # SaaS theme configurations
│   └── package.json        # Frontend dependencies
│
└── server/                 # Express backend server
    ├── models/             # Mongoose schemas (Lead)
    ├── controllers/        # CRUD endpoint handlers
    ├── routes/             # Express routes mounting
    ├── server.js           # Server bootstrap & MongoDB configurations
    └── package.json        # Backend dependencies
```

---

## Installation & Setup Instructions

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. MongoDB Atlas Database Setup

1. Sign in to your [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas).
2. Create a new shared cluster (free tier).
3. Under **Database Access**, create a user with a secure password (make sure you save this!).
4. Under **Network Access**, add an IP address of `0.0.0.0/0` to allow connections from anywhere (required for Render deployment).
5. Go to your cluster dashboard, click **Connect**, select **Drivers**, and copy the connection string.
6. Replace `<password>` with your database user's password.

> [!NOTE]
> **Local Fallback Mode**: If you do not configure MongoDB Atlas, the backend will automatically attempt to connect to your local MongoDB service at `mongodb://localhost:27017/mini-crm`.

---

### 2. Backend Server Configuration & Startup

1. Open your terminal and navigate to the `server/` directory:
   ```bash
   cd server
   ```
2. Install all required backend dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` configuration file by duplicating the provided `.env.example`:
   ```bash
   cp .env.example .env
   ```
4. Open the `.env` file and insert your MongoDB Atlas URI:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   ```
5. Launch the backend server in development mode (using Nodemon for auto-restarts):
   ```bash
   npm run dev
   ```
   *The console should output:*
   `Successfully connected to MongoDB!`
   `Server is running on port 5000`

---

### 3. Frontend Client Configuration & Startup

1. Open a new terminal tab/window and navigate to the `client/` directory:
   ```bash
   cd client
   ```
2. Install all required frontend dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server locally:
   ```bash
   npm run dev
   ```
   *Vite will start the client locally. By default, it runs on:*
   `http://localhost:3000`

4. Open `http://localhost:3000` in your web browser. You should see the fully rendered CRM dashboard displaying live data synced with MongoDB!

---

### 4. Running Frontend & Backend Simultaneously (Concurrently)

To simplify operations, we have equipped this project with a root-level concurrent configuration. If you choose to configure this at the root folder:

1. Create a `package.json` in the root of the project:
   ```json
   {
     "name": "future_fs_02_crm",
     "version": "1.0.0",
     "scripts": {
       "install-all": "npm install --prefix client && npm install --prefix server",
       "dev": "npx concurrently \"npm run dev --prefix server\" \"npm run dev --prefix client\""
     },
     "devDependencies": {
       "concurrently": "^8.2.2"
     }
   }
   ```
2. Run `npm install` in the root directory.
3. Start both projects simultaneously with a single terminal command:
   ```bash
   npm run dev
   ```

---

## Production Deployment Instructions

### 1. Backend Server Deployment (Render)

1. Push your code repository to GitHub (include the `server/` folder).
2. Sign in to [Render](https://render.com/) and create a **New Web Service**.
3. Link your GitHub repository.
4. Set the following configuration settings:
   - **Name**: `future-fs-02-backend`
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
5. Scroll down to **Environment Variables** and define:
   - `PORT` = `10000` (Render's internal port)
   - `MONGODB_URI` = *your production MongoDB Atlas URL*
6. Click **Deploy Web Service** and copy the resulting live URL once complete (e.g. `https://future-fs-02-backend.onrender.com`).

---

### 2. Frontend Client Deployment (Vercel)

1. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
2. Import your GitHub repository.
3. Configure the deployment settings:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
4. Under **Environment Variables**, define the API base url pointing to your deployed Render backend:
   - `VITE_API_BASE_URL` = `https://future-fs-02-backend.onrender.com/api`
5. Click **Deploy**. Vercel will bundle the production build and host it. Open the hosted dashboard and enjoy your CRM!

---

## Code Quality Highlights

- **Modern SaaS Aesthetics**: Sleek dark UI with deep obsidian colors (`#0b0f19`) and clean borders (`border-slate-800`), emphasizing usability, professional hierarchy, and zero gimmicks.
- **Robust Error Catching**: Clean loading animations, DB failure alerts, and graceful REST fallback handlers.
- **Mongoose Validation**: Fields like email structure, required attributes, and status enums are strictly verified on the DB layer.
- **Beginner-Friendly Hooks**: Component state flows exclusively through native React `useState` and `useEffect` patterns for maintenance simplicity.
