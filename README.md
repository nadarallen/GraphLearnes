# 🧠 GraphEDU: The Non-Linear Learning Platform
>
> *Connecting concepts the way your brain actually works.*

<!-- HOSTING BADGES -->
![Status](https://img.shields.io/badge/Status-Production-success?style=for-the-badge)
![Tech](https://img.shields.io/badge/Stack-PERN-blue?style=for-the-badge)
![Deployment](https://img.shields.io/badge/Deploy-Render-black?style=for-the-badge)

## 🚀 Live Demo

**Production URL:** [ADD_YOUR_PRODUCTION_LINK_HERE]

---

## 📺 Project Walkthrough

Check out our video explanation covering the inspiration, architecture, and live demo of GraphEDU.

[![Watch the video](https://img.youtube.com/vi/INSERT_VIDEO_ID_HERE/maxresdefault.jpg)](https://www.youtube.com/watch?v=INSERT_VIDEO_ID_HERE)

*(Click the image above to watch)*

---

## 💡 The Problem

Traditional education follows a linear path: Chapter 1 → Chapter 2 → Chapter 3.
**But learning isn't linear.** Concepts are interconnected web-like structures. Forgetting a prerequisite often halts progress completely, and traditional LMS platforms fail to visualize these dependencies.

## 🛠️ The Solution

**GraphEDU** is an interactive learning platform that visualizes the "Knowledge Graph" of a curriculum.

* **Visual Dependency Mapping**: See how "Linked Lists" connects to "Pointers" and "Memory Allocation".
* **Adaptive Compiling**: Write and compile C code directly in the browser to test Data Structures concepts instantly.
* **Smart Prerequisites**: The system warns you if you attempt a module without mastering its dependencies.

---

## 🏗️ System Architecture

GraphEDU uses a monolithic architecture optimized for ease of deployment and tight integration between the compiler and the API.

```mermaid
graph TD
    subgraph Client ["Frontend (Client)"]
        UI[React + Vite UI]
        3D[Three.js 3D Backgrounds]
        Graph[D3.js Knowledge Graph]
    end

    subgraph Server ["Backend (Server)"]
        API[Express.js REST API]
        Compiler[GCC Compiler Engine]
        Init[Auto-DB Init Script]
    end

    subgraph Database ["Persistence"]
        DB[(PostgreSQL)]
    end

    UI <-->|JSON / REST| API
    API <-->|SQL Queries| DB
    API -->|Child Process| Compiler
    Compiler -->|Stdout/Stderr| API
```

---

## ⚡ Key Features

### 1. 🕸️ Interactive Knowledge Graph

Users can explore modules as nodes in a network. Clicking a node reveals its relationships, effectively gamifying the curriculum map.

### 2. 💻 In-Browser C Compiler

Securely compile and run C code on the server.

* **Sandboxed Execution**: Code runs in temporary isolated processes.
* **Instant Feedback**: stdout/stderr streaming back to the frontend.
* **Standard Input Support**: Test algorithms with custom input.

### 3. 🛡️ Robust Backend

* **Postgres Migrations**: Custom auto-init script seeds the database on deployment if empty.
* **Environment Agnostic**: Runs on Localhost, Vercel (read-only mode), or Render (full compiled mode).

---

## 🧰 Tech Stack

### Frontend

* **React 19 + Vite**
  * Utilized for its concurrent rendering features and blazing fast HMR (Hot Module Replacement) during development.
  * Serves as the core component-based architecture for the application.

* **React Force Graph (2D)**
  * The engine behind the **"Galaxy View"**. It renders the entire curriculum as an interactive force-directed graph.
  * Handles physics simulations for node repulsion/attraction, creating a "living" network of knowledge.
  * Custom node rendering logic draws the "halo" glow effects around active modules.

* **GSAP (GreenSock Animation Platform)**
  * Powering the **Landing Page experience**.
  * **ScrollTrigger**: Triggers parallax effects and element fade-ins as users scroll.
  * **Timelines**: Orchestrates complex SVG animations (like the "Success Check" and "Path Flow" cards) to explain features visually without text.

* **Three.js & React Three Fiber**
  * Renders the immersive, floating 3D particle background that persists across pages.
  * Adds depth and specific "cyber" aesthetics without compromising DOM performance.

* **TailwindCSS**
  * Implements the **Glassmorphism** design system (translucent cards, blurs (`backdrop-blur-md`), and vibrant gradients).
  * Ensures full mobile responsiveness for the dashboard and learning views.

### Backend

* **Node.js & Express**
  * A lightweight REST API that handles two core functions:
        1. Serving curriculum metadata (`/api/modules`).
        2. Orchestrating the compilation process (`/api/compile`).

* **GCC (GNU Compiler Collection)**
  * The "Brain" of the coding platform.
  * The server spawns secure child processes to run `gcc`, pipe user input into the executable, and stream the standard output (stdout/stderr) back to the browser in real-time.

* **PostgreSQL**
  * Replaced the legacy file-based system.
  * Stores complex **Many-to-Many relationships** between modules and their prerequisites, allowing the graph to query "What do I need to learn before X?" instantly.

### Deployment & DevOps

* **Render (Infrastructure as Code)**
  * Uses a `render.yaml` Blueprint to auto-deploy both the **Web Service** and the **Managed PostgreSQL Database**.
  * Ensures a production environment where GCC is pre-installed and available.

* **Custom Auto-Seeding**
  * On every deployment, an `init_db.js` script checks the database health. If empty, it automatically builds the schema and seeds the initial curriculum, making the app "self-healing" and instantly demo-ready.

---

## 🏃‍♂️ Getting Started Locally

### Prerequisites

* Node.js (v18+)
* PostgreSQL (Local or Cloud URL)
* GCC (for compiler features)

### Installation

1. **Clone the Repo**

    ```bash
    git clone https://github.com/nadarallen/GraphEDU.git
    cd GraphEDU
    ```

2. **Install Dependencies**

    ```bash
    npm install
    # This automatically installs frontend dependencies too
    ```

3. **Environment Setup**
    Create a `.env` file in the root directory:

    ```env
    PORT=3000
    # Use a local Postgres URL or a Cloud one (Neon/Render/Supabase)
    DATABASE_URL=postgresql://user:password@localhost:5432/graphedu
    ```

4. **Run Development Server**

    ```bash
    npm run dev
    ```

    * Backend: <http://localhost:3000>
    * Frontend: <http://localhost:5173>

---
