# FUTURE_FS_02 Mini CRM

A simple and lightweight Mini Customer Relationship Management (CRM) application designed to manage client leads.

This project is structured with a **Node.js/Express backend** and a **React/Vite frontend** styled with **Tailwind CSS**.

---

## 🚀 Features

- **Lead Management**: Create, view, update, and delete client leads.
- **Lead Fields**: Name, Email, Company, Source, Status (`New`, `Contacted`, `Converted`), Follow-up Date, and Notes.
- **Concurrent Development**: Run both frontend and backend development servers simultaneously with a single command.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Icons**: React Icons
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Dev Tooling**: Nodemon

---

## 💻 Quick Start

### 1. Prerequisites
Make sure you have **Node.js** and **MongoDB** installed and running on your system.

### 2. Installation
Install dependencies for both the frontend and backend from the root directory:
```bash
npm run install-all
```

### 3. Environment Configuration
Create a `.env` file in the `server` directory. You can copy the template provided:
```bash
cp server/.env.example server/.env
```
Inside `server/.env`, verify or update:
- `PORT`: The backend server port (defaults to `5000`).
- `MONGODB_URI`: Your MongoDB connection string (defaults to a local MongoDB database `mongodb://localhost:27017/mini-crm`).

### 4. Running the Application
To launch both the backend server and frontend client concurrently:
```bash
npm run dev
```

- **Frontend** will be running at `http://localhost:5173`
- **Backend API** will be running at `http://localhost:5000`

---

## 📂 Project Structure

```text
├── client/          # React frontend (Vite, Tailwind CSS)
├── server/          # Node.js Express backend (MongoDB, Mongoose)
├── package.json     # Root package manager and scripts
└── README.md        # Project documentation
```
