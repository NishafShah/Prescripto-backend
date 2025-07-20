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

// ✅ CORS config to allow only your frontend domain
const corsOptions = {
  origin: ["https://vercel-frontend-topaz.vercel.app","https://prescripto-admin-weld.vercel.app"], // ✅ Vercel frontend domain (no trailing slash)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions)); // ✅ Apply CORS
app.use(express.json());

// ✅ Debugging incoming origins (optional)
app.use((req, res, next) => {
  console.log("Incoming Origin:", req.headers.origin);
  next();
});

// ✅ API Routes
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Working from deployed backend");
});

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server running on PORT: ${port}`);
});
