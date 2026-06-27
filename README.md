# SpendSync 💸

A beautiful, full-stack Expense Tracker Dashboard built with the MERN stack. Designed with aesthetic UI themes and robust backend protections, SpendSync allows users to track their finances, categorize spending, and maintain a clear view of their overall balance.

### Internship Details
- **Company:** CODTECH IT Solutions Pvt. Ltd.
- **Role:** MERN Stack Web Development Intern
- **Intern ID:** CITS1761

## ✨ Features
- **Secure Authentication:** JWT-based login and registration system with protected routes.
- **Dynamic Dashboard:** Automatically calculates and displays your total balance, total income, and total expenses at a glance.
- **Transaction Management:** Add, view, and safely delete your transactions, assigning them to various dynamic categories.
- **Aesthetic UI:** Powered by Tailwind CSS and daisyUI for a premium, responsive, and visually stunning user experience.
- **Fast Global State:** Snappy frontend state management powered by Zustand.
- **API Rate Limiting:** Built-in Upstash Redis integration to protect backend endpoints from spam, complete with custom frontend UI alerts.

## 🛠️ Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, daisyUI, Zustand, Axios, React Hot Toast, Lucide React
- **Backend:** Node.js, Express, MongoDB (Mongoose), JSON Web Tokens, bcryptjs, Upstash Redis

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- A MongoDB connection string (e.g., MongoDB Atlas)
- Upstash Redis credentials (for rate limiting)

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd SpendSync
   ```
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Environment Variables
Create a `.env` file in the `backend` directory and add the following keys:
```env
PORT=4090
MONGODB_URI=your_mongodb_uri_here
JWT_SECRET=your_secure_jwt_secret
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
NODE_ENV=development
```

### Running the Application

**Development Mode (Recommended):**
Open two separate terminal windows from the root directory:
1. **Start Backend:** `npm run start --prefix backend`
2. **Start Frontend:** `npm run dev --prefix frontend` 
*(The app will be accessible at `http://localhost:5173`)*

**Production Mode:**
1. Build the frontend assets: 
   ```bash
   cd frontend
   npm run build
   ```
2. In your `backend/.env` file, change `NODE_ENV=development` to `NODE_ENV=production`.
3. Start the server from the root directory: 
   ```bash
   npm run start --prefix backend
   ```
*(The fully bundled app will be served directly from `http://localhost:4090`)*

---
