import db from "../database/db";
import {
  Player,
  User,
  Champion,
  ChampionFusion,
  Team,
  Habitude,
  Match,
  Draft,
  TimeLine,
} from "./databaseModels";

// TImeline

// route /timeline
export const findTimeLine = async (): Promise<TimeLine | undefined> => {
  try {
    const timeline = await db.any(`SELECT * FROM timeline`);
    if (timeline.length === 0) {
      return undefined;
    }
    return timeline[0];
  } catch (e) {
    return undefined;
  }
};

// Champ

// route /champion/:id
export const findChampionById = async (
  id: number
): Promise<Champion | undefined> => {
  try {
    const champion = await db.one(
      `SELECT * FROM champions WHERE id_champion = ${id}`
    );
    return champion;
  } catch (e) {
    return undefined;
  }
};

// route /champions
export const getAllChampions = async (): Promise<Champion[] | undefined> => {
  try {
    const champions = await db.any(`SELECT * FROM champions`);
    return champions;
  } catch (e) {
    return undefined;
  }
};

// Fusion

// route /champion-fusion/:id
export const findChampionFusionById = async (
  id: number
): Promise<ChampionFusion | undefined> => {
  try {
    const fusion = await db.one(
      `SELECT * FROM champion_fusions WHERE id_fusion = ${id}`
    );
    return fusion;
  } catch (e) {
    return undefined;
  }
};

// route /champion-fusions
export const getAllChampionFusions = async (): Promise<
  ChampionFusion[] | undefined
> => {
  try {
    const fusions = await db.any(`SELECT * FROM champion_fusions`);
    return fusions;
  } catch (e) {
    return undefined;
  }
};

/// PLAYERS

// route /player/:id/Team
export const findPlayerTeamById = async (
  id: number
): Promise<number | undefined> => {
  try {
    const player = await db.one(
      `SELECT id_equipe FROM joueur WHERE id_joueur = ${id}`
    );
    return player.id_equipe;
  } catch (e) {
    return undefined;
  }
};

// route /player/:id or /player-route/:username/player/:id or /game-master-route/player/:id
export const findPlayerByIdAs = async (
  id: number,
  currentUserName?: string,
  isGameMaster?: boolean
): Promise<Player | undefined> => {
  try {
    const team = await findPlayerTeamById(id);
    var canWatch: boolean | undefined = false;
    if (currentUserName !== undefined) {
      if (currentUserName != "") {
        const currentTeamId = (await db.one(
          `SELECT id_equipe FROM equipe INNER JOIN users ON equipe.id_user = users.id_user  WHERE username = '${currentUserName}'`
        )) as Team;
        canWatch = team === currentTeamId.id_equipe;
      }
    }
    if (isGameMaster !== undefined) {
      canWatch = isGameMaster || canWatch;
    }
    if (canWatch) {
      const player = await db.one(
        `SELECT * FROM joueur WHERE id_joueur = ${id}`
      );
      return player;
    } else {
      const player = await db.one(
        `SELECT id_joueur, pseudo, poste, image_joueur, id_equipe FROM joueur WHERE id_joueur = ${id}`
      );
      return player;
    }
  } catch (e) {
    console.log(e);
    return undefined;
  }
};

//route /players or /player-route/players or /game-master-route/players
export const getAllPlayers = async (
  currentUserName?: string,
  isGameMaster?: boolean
): Promise<(Player | undefined)[] | undefined> => {
  try {
    console.log("here");
    const ids = (await db.any(`SELECT id_joueur FROM joueur`)) as Player[];
    console.log(ids);
    const players = await Promise.all(
      ids.map((id) =>
        findPlayerByIdAs(id.id_joueur, currentUserName, isGameMaster)
      )
    );
    return players;
  } catch (e) {
    return undefined;
  }
};

// TEAMS

// route /team/:id
export const findTeamById = async (id: number): Promise<Team | undefined> => {
  try {
    const team = await db.one(`SELECT * FROM equipe WHERE id_equipe = ${id}`);
    return team;
  } catch (e) {
    return undefined;
  }
};

//route /teams
export const getAllTeams = async (): Promise<Team[] | undefined> => {
  try {
    const teams = await db.any(`SELECT * FROM equipe`);
    return teams;
  } catch (e) {
    return undefined;
  }
};

// TO BE USED TO LOGIN
export const findUserByUsername = async (
  username: string
): Promise<User | undefined> => {
  try {
    const user = await db.one(
      `SELECT * FROM users WHERE username = '${username}'`
    );
    return user;
    // success
  } catch (e) {
    // error
    return undefined;
  }
};

// habitude

//route /habitude/:id
export const findHabitudeById = async (
  id: number
): Promise<Habitude | undefined> => {
  try {
    const habitude = await db.one(
      `SELECT * FROM habitudes WHERE id_habitude = ${id}`
    );
    return habitude;
  } catch (e) {
    return undefined;
  }
};

//route /habitudes
export const getAllHabitudes = async (): Promise<Habitude[] | undefined> => {
  try {
    const habitudes = await db.any(`SELECT * FROM habitudes`);
    return habitudes;
  } catch (e) {
    return undefined;
  }
};

// Match
// route /match/:id
export const findMatchById = async (id: number): Promise<Match | undefined> => {
  try {
    const match = await db.one(`SELECT * FROM match WHERE id_match = ${id}`);
    return match;
  } catch (e) {
    return undefined;
  }
};

// route /matchs
export const getAllMatchs = async (): Promise<Match[] | undefined> => {
  try {
    const matches = await db.any(`SELECT * FROM match`);
    return matches;
  } catch (e) {
    return undefined;
  }
};

// Draft

// route /draft/:id/Team
export const findDraftTeamById = async (
  id: number
): Promise<number[] | undefined> => {
  try {
    const draft = (await db.one(
      `SELECT match.id_equipe1, match.id_equipe2 FROM match INNER JOIN draft ON match.id_match = draft.id_match WHERE draft.id_draft = ${id}`
    )) as Match;
    const ids = [draft.id_equipe1, draft.id_equipe2];
    return ids;
  } catch (e) {
    return undefined;
  }
};

// route /draft/:id/Semaine
export const findDraftSemaineById = async (
  id: number
): Promise<number | undefined> => {
  try {
    const semaine = (await db.one(
      `SELECT semaine FROM match INNER JOIN draft ON match.id_match = draft.id_match WHERE draft.id_draft = ${id}`
    )) as number;
    return semaine;
  } catch (e) {
    return undefined;
  }
};

// route /draft/:id or /player-route/:username/draft/:id or /game-master-route/draft/:id
export const findDraftByIdAs = async (
  id: number,
  currentUserName?: string,
  isGameMaster?: boolean
): Promise<Draft | undefined> => {
  try {
    if (isGameMaster) {
      const draft = await db.one(`SELECT * FROM draft WHERE id_draft = ${id}`);
      return draft;
    }
    var currentTeamId: number | undefined = undefined;
    if (currentUserName !== undefined) {
      if (currentUserName !== "") {
        const currentTeam = (await db.one(
          `SELECT id_equipe FROM equipe INNER JOIN users ON equipe.id_user = users.id_user  WHERE username = '${currentUserName}'`
        )) as Team;
        currentTeamId = currentTeam.id_equipe;
      }
    }
    console.log("team qui demande du link", currentTeamId);
    const teams = await findDraftTeamById(id);
    console.log("teams", teams);
    const semaine = await findDraftSemaineById(id);
    console.log("semaine de la draft", semaine);
    if (teams === undefined || semaine === undefined) {
      return undefined;
    }
    const currentTimeLine = await findTimeLine();
    console.log(
      "current timeline",
      currentTimeLine?.semaine,
      currentTimeLine?.isdraftpassed,
      currentTimeLine?.isbanpassed
    );
    if (currentTimeLine === undefined) {
      return undefined;
    }
    if (semaine > currentTimeLine.semaine) {
      // le match se passe la semaune prochaine ou après, pas d'accès au draft
    } else if (semaine < currentTimeLine.semaine) {
      // le match s'est déjà passé, tt le monde peut voir la draft
      const draft = await db.one(`SELECT * FROM draft WHERE id_draft = ${id}`);
    } else {
      // le match est en cours, ca depend des phases
      if (currentTimeLine.isdraftpassed === true) {
        /// PHASE DE DRAFT passée tout le monde peut voir la draft
        console.log("draft passée");
        const draft = await db.one(
          `SELECT * FROM draft WHERE id_draft = ${id}`
        );
        return draft;
      } else {
        console.log("draft pas passée");
        if (currentTimeLine.isbanpassed === false) {
          console.log("ban pas passés");
          /// PHASE DE BAN, SEULS LES EQUIPES PEUVENT AVOIR ACCES A LEUR PROPRE BANS
          const canWatch1 = teams[0] === currentTeamId;
          const canWatch2 = teams[1] === currentTeamId;
          console.log(teams[0], teams[1], currentTeamId);
          console.log("can watch", canWatch1, canWatch2);
          if (canWatch1) {
            const draft = await db.one(
              `SELECT id_draft, id_match, id_joueur1mid, id_joueur1bot, id_joueur1sup, id_joueur2mid, id_joueur2bot, id_joueur2sup, id_ban1_1, id_ban1_2 FROM draft WHERE id_draft = ${id}`
            );
            return draft;
          } else if (canWatch2) {
            const draft = await db.one(
              `SELECT id_draft, id_match, id_joueur1mid, id_joueur1bot, id_joueur1sup, id_joueur2mid, id_joueur2bot, id_joueur2sup, id_ban2_1, id_ban2_2 FROM draft WHERE id_draft = ${id}`
            );
            return draft;
          } else {
            const draft = await db.one(
              `SELECT id_draft, id_match, id_joueur1mid, id_joueur1bot, id_joueur1sup, id_joueur2mid, id_joueur2bot, id_joueur2sup FROM draft WHERE id_draft = ${id}`
            );
            //random qui se connecte et qui n'est pas dans les équipes
            return draft;
          }
        } else {
          //BAN PAssés, tt le monde peut voir les bans mais pas les picks
          console.log("ban passés");
          console.log(currentTimeLine.isbanpassed);
          const canWatch1 = teams[0] === currentTeamId;
          const canWatch2 = teams[1] === currentTeamId;
          if (canWatch1) {
            const draft = await db.one(
              `SELECT id_draft, id_match, id_joueur1mid, id_joueur1bot, id_joueur1sup, id_joueur2mid, id_joueur2bot, id_joueur2sup, id_champion1mid, id_champion1bot, id_champion1sup, id_ban1_1, id_ban1_2, id_ban2_1, id_ban2_2 FROM draft WHERE id_draft = ${id}`
            );
            return draft;
          } else if (canWatch2) {
            const draft = await db.one(
              `SELECT id_draft, id_match, id_joueur1mid, id_joueur1bot, id_joueur1sup, id_joueur2mid, id_joueur2bot, id_joueur2sup, id_champion2mid, id_champion2bot, id_champion2sup, id_ban1_1, id_ban1_2, id_ban2_1, id_ban2_2 FROM draft WHERE id_draft = ${id}`
            );
            return draft;
          } else {
            //random qui se connecte et qui n'est pas dans les équipes, peut voir les bans mais pas les picks
            const draft = await db.one(
              `SELECT id_draft, id_match, id_joueur1mid, id_joueur1bot, id_joueur1sup, id_joueur2mid, id_joueur2bot, id_joueur2sup, id_ban1_1, id_ban1_2, id_ban2_1, id_ban2_2 FROM draft WHERE id_draft = ${id}`
            );
            return draft;
          }
        }
      }
    }
  } catch (e) {
    return undefined;
  }
};
