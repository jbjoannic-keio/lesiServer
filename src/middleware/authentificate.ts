// src/middleware/authenticate.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JWTData {
  userId: string;
  role: "gameMaster" | "player" | "disconnected";
  username: string;
}

export const authenticateRole = (
  roles: Array<"gameMaster" | "player" | "disconnected">
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1]; // Assuming "Bearer <token>"
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your_secret_key"
      ) as JWTData;
      if (roles.includes(decoded.role)) {
        next();
      } else {
        res.status(403).send("Access denied.");
      }
    } catch (ex) {
      res.status(400).send("Invalid token.");
    }
  };
};

export const authenticateUsername = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    const username = req.params.username;
    const token = req.headers.authorization?.split(" ")[1]; // Assuming "Bearer <token>"
    if (!token) {
      return res.status(401).send("Access denied. No token provided.");
    }
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your_secret_key"
      ) as JWTData;
      if (username === decoded.username) {
        next();
      } else {
        res.status(403).send("Access denied.");
      }
    } catch (ex) {
      res.status(400).send("Invalid token.");
    }
  };
};
