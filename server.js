import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// ✅ Allow only your Vercel frontend origin
const corsOptions = {
  origin: ["https://prescripto-backend-lake.vercel.app/"], // 🔁 replace with your actual frontend domain from Vercel
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions)); // ✅ Use secure CORS
app.use(express.json());

// ✅ Debug incoming origins (optional)
app.use((req, res, next) => {
  console.log("Incoming Origin:", req.headers.origin);
  next();
});

// API routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API Working from deployed backend");
});

// Start server
app.listen(port, () => console.log(`✅ Server running on PORT: ${port}`));
