// src/routes/gameRoutes.ts
import express from "express";
import { Request, Response, NextFunction } from "express";
import {
  authenticateRole,
  authenticateUsername,
} from "../middleware/authentificate";
import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript";

const router = express.Router();

router.get(
  "/game-master-route",
  authenticateRole(["gameMaster"]),
  (req, res) => {
    res.send("Only accessible by the game master");
  }
);

router.get("/player-route", authenticateRole(["player"]), (req, res) => {
  res.send("Only accessible by players");
});

router.get("/player-route/:username", authenticateUsername(), (req, res) => {
  res.send("Only accessible by the specified player");
});

export default router;
