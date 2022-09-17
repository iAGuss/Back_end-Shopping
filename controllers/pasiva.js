const { Pool } = require("pg");
const client = new Pool({
  database: "Shopping",
  password: "apka",
  user: "postgres",
});

// GETS:

exports.comidas = async (req, res) => {
  const { rows } = await client.query(
    "SELECT comida_id, comida, categoria, descripcion, precio, imagen, oferta, eliminado FROM la_pasiva WHERE eliminado = false ORDER BY comida_id ASC"
  );
  return res.send(rows);
};

exports.comidasPorCategoria = async (req, res) => {
  const { categoria } = req.params;
  const { rows } = await client.query(
    "SELECT categoria, comida_id, comida, descripcion, precio, imagen, oferta, eliminado FROM la_pasiva WHERE lower(categoria)=$1 ORDER BY comida_id ASC",
    [categoria.toLowerCase()]
  );
  return res.send(rows);
};

exports.comidasEnOferta = async (req, res) => {
  const { rows } = await client.query(
    "SELECT oferta, comida_id, comida, categoria, descripcion, precio, imagen FROM la_pasiva WHERE oferta = true ORDER BY comida_id ASC"
  );
  return res.send(rows);
};

exports.pedidos = async (req, res) => {
  const { rows } = await client.query(
    "SELECT pedido_id, fecha_pedido, entregado, usuario_id FROM la_pasiva_pedidos ORDER BY pedido_id ASC"
  );
  return res.send(rows);
};

// POSTS:

exports.agregarComida = async (req, res) => {
  try {
    const nuevaComida = {
      comida: req.body.comida,
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      oferta: req.body.oferta,
      imagen: req.body.imagen,
      categoria: req.body.categoria,
    };

    await client.query(
      `INSERT INTO public.la_pasiva(
        comida, descripcion, precio, imagen, categoria)
        VALUES ($1, $2, $3, $4, $5);`,
      [
        nuevaComida.comida,
        nuevaComida.descripcion,
        nuevaComida.precio,
        nuevaComida.imagen,
        nuevaComida.categoria,
      ]
    );
    return res.json({ success: true, nuevaComida });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// DELETES:

exports.eliminarComida = async (req, res) => {
  const id = req.params.id;
  await client.query("UPDATE la_pasiva SET eliminado=true WHERE comida_id=$1", [
    id,
  ]),
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    };
};
