const { Pool } = require("pg");
exports.client = new Pool({
  database: "Shopping",
  password: "apka",
  user: "postgres",
});
