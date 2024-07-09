import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connecttoMongoDb from "./db/connectToMongoDb.js";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(express.json()); //to parse the incoming json(from req.body)
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connecttoMongoDb();
  console.log(`Server Running on port at ${PORT}`);
});
