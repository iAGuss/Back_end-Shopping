const { Pool } = require("pg");
const client = new Pool({
    database: "Shopping",
    password: "apka",
    user: "postgre",
  });

exports.comidas = async (req, res) => {
  const { rows } = await client.query("SELECT comida_id, comida, categoria, descripcion, precio, oferta FROM la_pasiva");
  return res.send(rows);
};

exports.pedidos = async (req, res) => {
  const { rows } = await client.query("SELECT pedido_id, fecha_pedido, entregado, usuario_id la_pasiva_pedidos");
  return res.send(rows);
};


