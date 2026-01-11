# 🍽️ RestaurantHub Inventory Management System

A premium, production-grade frontend for restaurant inventory management, built with **React** and **Vite**. This system features a stunning UI/UX with glassmorphism, responsive design, and built-in Role-Based Access Control (RBAC).

## 🚀 Key Features

-   **✨ Premium UI/UX:** Modern glassmorphism design with vibrant colors, smooth animations, and micro-interactions.
-   **🔐 Simulated RBAC:** Role-based access for Admins and Staff.
    -   **Admins:** Full control over inventory (add, edit, delete, update stock).
    -   **Staff:** View inventory and update stock usage only.
-   **📊 Dynamic Dashboard:** Real-time statistics for total items, low stock alerts, and stock value.
-   **🔍 Advanced Filtering:** Search by name, filter by category, and filter by stock status.
-   **🚨 Low-Stock Alerts:** Automatic visual indicators and animations for items falling below reorder levels.
-   **🌓 Theme Support:** Seamless dark and light mode toggle.
-   **📱 Fully Responsive:** Optimized for desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

-   **Framework:** [React](https://reactjs.org/) (Vite)
-   **Routing:** [React Router v6](https://reactrouter.com/)
-   **State Management:** React Context API & Hooks
-   **Styling:** Pure CSS (Modern Variables & Glassmorphism)
-   **Animations:** CSS Keyframes & Transitions
-   **Storage:** LocalStorage (Simulated database & auth)

## 📁 Project Structure

```text
frontend/
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # Auth & Theme context
│   ├── data/             # Mock inventory data
│   ├── pages/            # Main application pages
│   ├── styles/           # Modular CSS files
│   ├── App.jsx           # Routing & Layout
│   └── main.jsx          # Entry point
├── index.html            # Template & Google Fonts
└── vite.config.js        # Vite configuration
```

## 🚦 Getting Started

### Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or higher)

### Installation

1.  Navigate to the frontend directory:
    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open `http://localhost:3000` in your browser.

## 🔑 Demo Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | admin@restauranthub.com | admin123 |
| **Staff** | staff@restauranthub.com | staff123 |

> [!NOTE]
> These users are pre-configured. You can also create new accounts via the Signup page with either role.

## 🧪 Simulation Details

-   **Authentication:** Simulated JWT token storage in `localStorage`.
-   **Database:** `localStorage` acts as a persistence layer for inventory and user data.
-   **Images:** Image uploads are simulated using base64 encoding (ready for Cloudinary integration later).

---

Built with ❤️ for High-End Restaurant Operations.
