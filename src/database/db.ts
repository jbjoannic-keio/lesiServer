import pgPromise from "pg-promise";

const pgp = pgPromise();

const db = pgp({
  host: "localhost",
  port: 5432,
  database: "lesi",
  user: "lesiMaster",
  password: "mycaprica",
});

export default db;
