// src/routes/gameRoutes.ts
import express from "express";
import { Request, Response, NextFunction } from "express";
import {
  authenticateRole,
  authenticateUsername,
} from "../middleware/authentificate";
import {
  findTimeLine,
  findChampionById,
  getAllChampions,
  findChampionFusionById,
  getAllChampionFusions,
  findPlayerByIdAs,
  getAllPlayers,
  findTeamById,
  getAllTeams,
  findHabitudeById,
  getAllHabitudes,
  findMatchById,
  getAllMatchs,
} from "../models/databaseQueries";

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

// TImeline

// route /timeline

router.get("/timeline", async (req: Request, res: Response) => {
  try {
    const timeline = await findTimeLine();
    if (!timeline) {
      res.status(404).send("No timeline found");
    } else {
      res.json(timeline);
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// Champ

// route /champion/:id

router.get("/champion/:id", async (req: Request, res: Response) => {
  try {
    const champion = await findChampionById(parseInt(req.params.id));
    if (!champion) {
      res.status(404).send("No champion found");
    } else {
      res.json(champion);
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// route /champions

router.get("/champions", async (req: Request, res: Response) => {
  try {
    const champions = await getAllChampions();
    if (!champions) {
      res.status(404).send("No champion found");
    } else {
      res.json(champions);
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// Fusion

// route /champion-fusion/:id

router.get("/champion-fusion/:id", async (req: Request, res: Response) => {
  try {
    const fusion = await findChampionFusionById(parseInt(req.params.id));
    if (!fusion) {
      res.status(404).send("No fusion found");
    } else {
      res.json(fusion);
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});
// route /champion-fusions

router.get("/champion-fusions", async (req: Request, res: Response) => {
  try {
    const fusions = await getAllChampionFusions();
    if (!fusions) {
      res.status(404).send("No fusion found");
    } else {
      res.json(fusions);
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

/// PLAYERS

// route /player/:id/Team

// route /player/:id or /player-route/:username/player/:id or /game-master-route/player/:id
//route /players or /player-route/players or /game-master-route/players

router.get("/player/:id", async (req: Request, res: Response) => {
  try {
    const player = await findPlayerByIdAs(parseInt(req.params.id));
    if (!player) {
      res.status(404).send("No player found");
    } else {
      res.json(player);
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

router.get(
  "/player-route/:username/player/:id",
  authenticateRole(["player"]),
  authenticateUsername(),
  async (req: Request, res: Response) => {
    try {
      const player = await findPlayerByIdAs(
        parseInt(req.params.id),
        req.params.username
      );
      if (!player) {
        res.status(404).send("No player found");
      } else {
        res.json(player);
      }
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get(
  "/game-master-route/player/:id",
  authenticateRole(["gameMaster"]),
  async (req: Request, res: Response) => {
    try {
      const player = await findPlayerByIdAs(parseInt(req.params.id), "", true);
      if (!player) {
        res.status(404).send("No player found");
      } else {
        res.json(player);
      }
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get("/players", async (req: Request, res: Response) => {
  try {
    const players = await getAllPlayers();
    if (!players) {
      res.status(404).send("No player found");
    } else {
      res.json(players);
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

router.get(
  "/player-route/:username/players",
  authenticateRole(["player"]),
  authenticateUsername(),
  async (req: Request, res: Response) => {
    try {
      const players = await getAllPlayers(req.params.username);
      if (!players) {
        res.status(404).send("No player found");
      } else {
        res.json(players);
      }
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  }
);

router.get(
  "/game-master-route/players",
  authenticateRole(["gameMaster"]),
  async (req: Request, res: Response) => {
    try {
      const players = await getAllPlayers("", true);
      if (!players) {
        res.status(404).send("No player found");
      } else {
        res.json(players);
      }
    } catch (e) {
      res.status(500).send("Internal Server Error");
    }
  }
);

// TEAMS

// route /team/:id

router.get("/team/:id", async (req: Request, res: Response) => {
  try {
    const team = await findTeamById(parseInt(req.params.id));
    if (!team) {
      res.status(404).send("No team found");
    } else {
      res.json(team);
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

//route /teams

router.get("/teams", async (req: Request, res: Response) => {
  try {
    const teams = await getAllTeams();
    if (!teams) {
      res.status(404).send("No team found");
    } else {
      res.json(teams);
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// TO BE USED TO LOGIN

// habitude

//route /habitude/:id

router.get("/habitude/:id", async (req: Request, res: Response) => {
  try {
    const habitude = await findHabitudeById(parseInt(req.params.id));
    if (!habitude) {
      res.status(404).send("No habitude found");
    } else {
      res.json(habitude);
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

//route /habitudes

router.get("/habitudes", async (req: Request, res: Response) => {
  try {
    const habitudes = await getAllHabitudes();
    if (!habitudes) {
      res.status(404).send("No habitude found");
    } else {
      res.json(habitudes);
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// Match
// route /match/:id

router.get("/match/:id", async (req: Request, res: Response) => {
  try {
    const match = await findMatchById(parseInt(req.params.id));
    if (!match) {
      res.status(404).send("No match found");
    } else {
      res.json(match);
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// route /matchs

router.get("/matchs", async (req: Request, res: Response) => {
  try {
    const matchs = await getAllMatchs();
    if (!matchs) {
      res.status(404).send("No match found");
    } else {
      res.json(matchs);
    }
  } catch (e) {
    res.status(500).send("Internal Server Error");
  }
});

// Draft

// route /draft/:id or /player-route/:username/draft/:id or /game-master-route/draft/:id

export default router;
