import express from "express"
import bodyParser from "body-parser"
import expenseRoutes from "./routes/expenseRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { connectDB } from "./config/db.js"  
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config(); // Load environment variables from .env file
console.log("Connecting to MongoDB...");

const app = express();
const PORT = process.env.PORT || 4090;
const __dirname = path.resolve();

// order of these middlewares is important, cors should be before rateLimiter and bodyParser
if(process.env.NODE_ENV === "production"){
  app.use(cors({
    origin: "http://localhost:5173", // Allow requests from this origin
  }));
} else {
  // Allow all for dev
  app.use(cors());
}

app.use(bodyParser.json()); // Middleware to parse JSON bodies

app.use((req,res,next)=>{
  console.log("New Request:", req.method, req.url);
  next();
});

// Apply rate limiting ONLY to API routes, so it doesn't block the frontend from loading
app.use("/api", rateLimiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")));

  app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
  });  
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on Port : ${PORT}`);
  });
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});