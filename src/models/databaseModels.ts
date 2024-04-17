export interface Champion {
  id_champion: number;
  nom_champion: string;
  imae_champion: string;
  nom_role: string;
  early_game: number;
  mid_game: number;
  late_game: number;
  description: string;
}

export interface ChampionFusion {
  id_fusion: number;
  champion1_id: number;
  champion2_id: number;
  upgrade_early_game1: number;
  upgrade_mid_game1: number;
  upgrade_late_game1: number;
  upgrade_early_game2: number;
  upgrade_mid_game2: number;
  upgrade_late_game2: number;
}

export interface Player {
  id_joueur: number;
  pseudo: string;
  poste: string;
  image: string;
  id_equipe: number;
  main_champion: number;
}

export interface Team {
  id_equipe: number;
  nom_equipe: string;
  image_equipe: string;
  id_user: number;
}

export interface User {
  id_user: string;
  username: string;
  hashedpassword: string;
  gamerole: "gameMaster" | "player";
}

export interface Habitude {
  id_habitude: number;
  id_joueur: number;
  id_champion: number;
  match_consecutif: number;
}

export interface Match {
  id_match: number;
  finished: boolean;
  id_equipe1: number;
  id_equipe2: number;
  semaine: number;
  is1winner: boolean;
}

export interface Draft {
  id_draft: number;
  id_match: number;
  id_joueur1mid: number;
  id_joueur1bot: number;
  id_joueur1sup: number;
  id_joueur2mid: number;
  id_joueur2bot: number;
  id_joueur2sup: number;
  id_champion1mid: number;
  id_champion1bot: number;
  id_champion1sup: number;
  id_champion2mid: number;
  id_champion2bot: number;
  id_champion2sup: number;
  id_ban1_1: number;
  id_ban1_2: number;
  id_ban2_1: number;
  id_ban2_2: number;
}

export interface TimeLine {
  semaine: number;
  isbanpassed: boolean;
  isdraftpassed: boolean;
}
