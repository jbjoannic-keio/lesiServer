// src/index.ts
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes";
import gameRoutes from "./src/routes/gameRoutes";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/game", gameRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
