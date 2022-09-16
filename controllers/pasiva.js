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
//↑ falta el llamado where eliminado = false
exports.pedidos = async (req, res) => {
  const { rows } = await client.query("SELECT pedido_id, fecha_pedido, entregado, usuario_id la_pasiva_pedidos");
  return res.send(rows);
  //↑ falta el llamado where eliminado = false
};
exports.eliminar=async(req,res)=>{
  const {rows}=await client.query(`UPDATE public.la_pasiva SET eliminado=true WHERE id=$1;`);
  return res.send(rows);
};


