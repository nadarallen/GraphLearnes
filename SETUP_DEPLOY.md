# Deployment & Setup Guide

## Project Overview

This project is a **Node.js + Express** backend serving a **Vite + React** frontend. It includes a C compiler endpoint (`/api/compile`) which requires GCC.

## Prerequisites

- **Node.js** (v18+ recommended)
- **MySQL Database**
- **GCC** (GNU Compiler Collection) - *Required only for the compilation feature.*

## Local Setup

1. **Install Dependencies**

    ```bash
    npm install
    # This will also install frontend dependencies via postinstall script
    ```

2. **Environment Variables**
    - Copy `.env.example` to `.env`.
    - Update the values with your database credentials.

    ```properties
    PORT=3000
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=your_password
    DB_PORT=3306
    DB_NAME=datastructures_db
    ```

3. **Run in Development Mode**

    ```bash
    npm run dev
    ```

    - Starts Backend usually on port 3000.
    - Starts Frontend (Vite) usually on port 5173.

## Deployment (Production)

1. **Build the Frontend**
    The backend is configured to serve the static frontend files. You must build them first.

    ```bash
    npm run build
    ```

    This creates the `frontend/dist` folder.

2. **Start the Server**

    ```bash
    npm start
    ```

    - The server will run on the port defined in `.env` (or 3000).
    - It serves the API at `/api/...`.
    - It serves the React app at `/`.

## Edge Cases & Handling

### 1. Database Connection Failed

- **Symptom**: Server logs "WARNING: Database connection failed".
- **Handling**: The server will start even if the DB is down, but API endpoints requiring DB will return 500 errors.
- **Fix**: Check your `.env` credentials and ensure MySQL is running.

### 2. GCC Not Found

- **Symptom**: Server logs "WARNING: GCC not found".
- **Handling**: The `/api/compile` endpoint will not function, but the rest of the app will work.
- **Fix**: Install GCC on your server/machine.
  - **Linux (Ubuntu/Debian)**: `sudo apt install build-essential`
  - **Windows**: Install MinGW or use WSL.

### 3. Frontend Not Found (404 on /)

- **Symptom**: "Frontend not built" message when accessing the root URL.
- **Handling**: The server checks for `frontend/dist/index.html`.
- **Fix**: Run `npm run build` locally or only your deployment server.

### 4. CORS Issues

- **Handling**: In production (when served by `server.js`), CORS is not needed since frontend and backend share the same origin.
- **Dev Mode**: `frontend/vite.config.js` uses a proxy to forward `/api` requests to the backend, avoiding CORS.

## Deployment Guide: Vercel

Vercel is great for the frontend, but because your app needs a MySQL connection and GCC, there are extra steps.

### 1. Database (Crucial)

Vercel does **not** host databases. You need a cloud MySQL database.
- **Recommendation**: Use **Aiven**, **PlanetScale**, or **Railway** (MySQL service).
- **Get the Credentials**: Host, User, Password, Port, Database Name.

### 2. Configure Vercel

1. **Install Vercel CLI** (optional, or use the website): `npm i -g vercel`
2. **Deploy**:

    ```bash
    vercel
    ```

3. **Environment Variables**:
    On the Vercel Dashboard for your project, go to **Settings > Environment Variables** and add:
    - `DB_HOST` (your cloud DB host)
    - `DB_USER`
    - `DB_PASSWORD`
    - `DB_NAME`
    - `DB_PORT`

### 3. Known Limitations on Vercel

* **GCC / Compilation**: Vercel "Serverless Functions" do **not** guarantee `gcc` is installed.
  - If the `/api/compile` endpoint fails with "GCC not found", you cannot fix this on Vercel.
  - **Alternative**: You would need to host the backend on **Render** or **DigitalOcean** (which give you a full OS) to use GCC, OR use an external Compiler API (like Judge0).
- **Filesystem**: usage of `fs.writeFile` is restricted to `/tmp` (which we handled in the code), but files are deleted immediately after the request.

### Alternative: Render (Recommended for Full Features)

If you want the compiler to work 100% without hassle:

1. Push code to GitHub.
2. Create a "Web Service" on **Render.com**.
3. Connect your repo.
4. Build Command: `npm install && npm run build`
5. Start Command: `npm start`
6. Add Env Vars.
Render offers a full environment where `gcc` is usually available or installable.
