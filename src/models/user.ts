import db from "../database/db";

export interface User {
  id_user: string;
  username: string;
  hashedpassword: string;
  gamerole: "gameMaster" | "player";
}

// Mock function to simulate database operation
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
