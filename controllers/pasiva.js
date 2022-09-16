const { Pool } = require("pg");
const client = new Pool({
  database: "",
  password: "",
  user: "",
});

exports.comidas = async (req, res) => {
  const { rows } = await client.query("SELECT * FROM ...");
  return res.send(rows);
};

exports.pedidos = async (req, res) => {
  const { rows } = await client.query("SELECT * FROM ...");
  return res.send(rows);
};
