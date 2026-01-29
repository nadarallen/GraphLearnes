# 🧠 GraphEDU: The AI-Powered Learning Simplifier
>
> *Democratizing complex academic concepts through visualization and interaction.*

<!-- TECHNOLOGIES -->
<p align="center">
  <img src="https://img.shields.io/badge/SDG-4_Quality_Education-C5192D?style=flat&logo=un&logoColor=white" />
  <img src="https://img.shields.io/badge/SDG-10_Reduced_Inequalities-DD1367?style=flat&logo=un&logoColor=white" />
  <br/>
  <img src="https://img.shields.io/badge/React_19-20232A?style=flat&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/GSAP-88CE02?style=flat&logo=greensock&logoColor=white" />
  <img src="https://img.shields.io/badge/Render-46E3B7?style=flat&logo=render&logoColor=white" />
</p>

## 🚀 Live Demo

**Production URL:** [ADD_YOUR_PRODUCTION_LINK_HERE]

## 📺 Video Walkthrough

[![GraphEDU Demo](https://img.youtube.com/vi/418n3zMDfMM/hqdefault.jpg)](https://youtu.be/418n3zMDfMM)
> *Click the thumbnail above to watch the full project explanation.*

---

## 🎯 The Problem Statement

**"Many students struggle to understand academic content due to dense language, unstructured lecture notes, and information overload."**

This issue disproportionately affects:

* **First-generation learners** who lack academic mentorship.
* **Non-traditional students** overwhelmed by linear, text-heavy curricula.
* **Educators** who lack the time to manually create varying levels of simplified content for every student.

There is a critical need for a tool that breaks down this "Wall of Text" into structured, digestible, and visual learning resources.

## � The GraphEDU Solution

GraphEDU addresses the **LearnEase** problem statement by transforming linear, dense academic material into an **Interactive Knowledge Graph**. Instead of just simplifying text, we simplify the *structure* of learning itself.

### How we map to the Requirements

* **Requirements**: *Visual aids (Concept maps) & Reduced Cognitive Load.*
  * **Our Solution**: The **Galaxy View** (Force Graph) auto-generates a dynamic concept map, highlighting relationships between topics like "Pointers" and "Memory". This eliminates rote memorization and builds intuition.
* **Requirement**: *Quick Knowledge Check.*
  * **Our Solution**: Integrated **Adaptive Quizzes** provide immediate feedback (Corret/Incorrect) to validate understanding before moving to the next node.
* **Requirement**: *Dual-View Learning Interface.*
  * **Our Solution**: The **Split-Screen Compiler** allows students to read concepts on the left and immediately experiment with code on the right, bridging theory and practice in real-time.
* **Requirement**: *Accessibility & Ease of Use.*
  * **Our Solution**: A **Glassmorphism UI** optimized for focus, dark mode support for localized environments, and sub-5-second load times via Vite.

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

## 🗺️ Roadmap & Future Scope

While GraphEDU currently focuses on the *structural visualization* of knowledge, our vision aligns fully with the **LearnEase** problem statement to become a comprehensive simplification platform.

* **Phase 1 (Current)**: Interactive Knowledge Graph & Compiler Integration.
* **Phase 2**: **AI Content Processing**
  * Integrate LLMs to allow students to **upload PDFs** and auto-generate new graph nodes and relationships.
* **Phase 3**: **Multi-Language Support**
  * Translation of core concepts into regional languages (Hindi, Marathi, Tamil) to further address **SDG 10 (Reduced Inequalities)**.
* **Phase 4**: **Offline Export**
  * Allow students to download simplified concept maps and notes as PDFs for offline study.

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
