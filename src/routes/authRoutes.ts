// src/routes/authRoutes.ts
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findUserByUsername, User } from "../models/user";
import test from "node:test";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username);
  console.log(user);

  if (!user) {
    return res.status(401).send("User not found");
  }

  const passwordIsValid = await bcrypt.compare(password, user.hashedpassword);
  if (!passwordIsValid) {
    return res.status(403).send("Incorrect password");
  }

  const token = jwt.sign(
    { userId: user.id_user, role: user.gamerole, username: user.username },
    process.env.JWT_SECRET || "your_secret_key",
    { expiresIn: "1h" }
  );

  res.json({ token });
});

export default router;
