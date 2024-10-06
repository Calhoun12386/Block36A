const { Pool } = require("pg");
const db = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://user:password@localhost:3000/34a-classroom_manager" /* dont know the user and password */
});

async function query(sql, params, callback) {
  return db.query(sql, params, callback);
}

module.exports = { query };
