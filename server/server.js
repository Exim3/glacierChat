import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import connecttoMongoDb from "./db/connectToMongoDb.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import protectRoute from "./middleware/protectRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json()); //to parse the incoming json(from req.body)
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", protectRoute, messageRoutes);

app.listen(PORT, () => {
  connecttoMongoDb();
  console.log(`Server Running on port at ${PORT}`);
});
