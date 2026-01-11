# 🚀 RestaurantHub Backend API

A production-grade Node.js/Express backend for the Restaurant Inventory Management System. Features robust RBAC, JWT authentication, and Cloudinary image processing.

## 🛠️ Tech Stack

-   **Runtime:** [Node.js](https://nodejs.org/)
-   **Framework:** [Express.js](https://expressjs.com/)
-   **Database:** [MongoDB](https://www.mongodb.com/) (Mongoose)
-   **Auth:** [JWT](https://jwt.io/) & [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
-   **Storage:** [Cloudinary](https://cloudinary.com/) (Images)
-   **Middleware:** [Multer](https://github.com/expressjs/multer) (File uploads), CORS, JSON Parser

## 🔑 Key Features

-   **🔐 Robust Security:** Password hashing with bcrypt and route protection via JWT.
-   **🛡️ Role-Based Access (RBAC):** Middleware to restrict Admin/Staff permissions on specific endpoints.
-   **📦 Inventory Management:** CRUD operations with strict schema validation.
-   **📸 Image Handling:** Automatic upload to Cloudinary with local cleanup using Multer.
-   **⚡ Stock Logic:** Atomic stock updates with validation to prevent negative quantities.

## 🚦 Getting Started

### Prerequisites

-   Node.js (v16+)
-   MongoDB instance (local or Atlas)

### Installation

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Configure environment variables in `.env`:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_url
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_NAME=your_cloudinary_name
    CLOUDINARY_API_KEY=your_key
    CLOUDINARY_API_SECRET=your_secret
    ```

4.  Start the server:
    ```bash
    # Development mode
    npm run dev

    # Production mode
    npm start
    ```

## 🛣️ API Endpoints

### Auth Routes
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Authenticate & get token

### Inventory Routes (All Protected)
- `GET /api/inventory` - Fetch all items (Admin/Staff)
- `POST /api/inventory` - Add new item (Admin Only, supports image)
- `PUT /api/inventory/:id` - Update item (Admin Only, supports image)
- `DELETE /api/inventory/:id` - Remove item (Admin Only)
- `PATCH /api/inventory/:id/stock` - Update stock quantity (Admin/Staff)

---

Developed with ❤️ for Restaurant Operations.
