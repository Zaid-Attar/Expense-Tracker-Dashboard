import express from "express"
import bodyParser from "body-parser"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js"  
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";


dotenv.config(); // Load environment variables from .env file
console.log(process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5090;
const __dirname = path.resolve();

//
// order of these middlewares is important, cors should be before rateLimiter and bodyParser
//
if(process.env.NODE_ENV === "production"){
app.use(cors({
  origin: "http://localhost:5173", // Allow requests from this origin
}));
}

//connectDB();
// Changed from express.json() to bodyParser.json() to ensure proper parsing of JSON bodies
app.use(bodyParser.json()); // Middleware to parse JSON bodies
app.use(rateLimiter); // Apply rate limiting middleware

app.use((req,res,next)=>{
  console.log("We just got a new request!");
  console.log("Request Method:", req.method);
  console.log("Request URL:", req.url);
  next();
});

app.use("/api/notes", notesRoutes);

if(process.env.NODE_ENV === "production"){
app.use(express.static(path.join(__dirname,"../frontend/dist")));

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"));
});  

}

connectDB().then(() => {
  //console.log("Connected to MongoDB successfully.");
  app.listen(PORT, () => {
    console.log(`Server is running on Port : ${PORT}`);
  });
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});