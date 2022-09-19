const { Pool } = require("pg");
const client = new Pool({
  database: "Shopping",
  password: "apka",
  user: "postgres",
});

// GETS:

exports.comidas = async (req, res) => {
  const { rows } = await client.query(
    "SELECT comida_id, comida, categoria, descripcion, precio, imagen, oferta, eliminado FROM la_pasiva_comidas WHERE eliminado = false ORDER BY comida_id ASC"
  );
  return res.send(rows);
};

exports.comidaPorId = async (req, res) => {
  const { comida_id } = req.params;
  const { rows } = await client.query(
    "SELECT comida_id, comida, categoria, descripcion, precio, imagen, oferta, eliminado FROM la_pasiva_comidas WHERE comida_id=$1",
    [comida_id]
  );
  return res.send(rows);
};

exports.comidasPorCategoria = async (req, res) => {
  const { categoria } = req.params;
  const { rows } = await client.query(
    "SELECT categoria, comida_id, comida, descripcion, precio, imagen, oferta, eliminado FROM la_pasiva_comidas WHERE lower(categoria)=$1 ORDER BY comida_id ASC",
    [categoria.toLowerCase()]
  );
  return res.send(rows);
};

exports.comidasEnOferta = async (req, res) => {
  const { rows } = await client.query(
    "SELECT oferta, comida_id, comida, categoria, descripcion, precio, imagen FROM la_pasiva_comidas WHERE oferta = true ORDER BY comida_id ASC"
  );
  return res.send(rows);
};

exports.pedidos = async (req, res) => {
  const { rows } = await client.query(
    `SELECT * FROM la_pasiva_pedidos pedidos
    JOIN la_pasiva_comidas comidas
    ON comidas.comida_id = pedidos.comida_id `
  );
  return res.send(rows);
};

exports.pedidoPorId = async (req, res) => {
  const { pedido_id } = req.params;
  const { rows } = await client.query(
    `SELECT * FROM la_pasiva_pedidos pedidos
    JOIN la_pasiva_comidas comidas
    ON comidas.comida_id = pedidos.comida_id 
    WHERE pedido_id = $1`,
    [pedido_id]
  );
  return res.send(rows);
};

exports.pedidosNoEntregados = async (req, res) => {
  const { rows } = await client.query(
    "SELECT distinct pedido_id, entregado FROM la_pasiva_pedidos WHERE entregado= false"
  );
  return res.send(rows);
};

exports.pedidoEntregado = async (req, res) => {
  const { pedido_id } = req.params;

  await client.query(
    `UPDATE public.la_pasiva_pedidos SET entregado=true WHERE pedido_id=$1`,
    [pedido_id]
  );
  res.sendStatus(200);
};

// exports.agregarPedido = async (req, res) => {
//   try {
//     const nuevoPedido = {
//       pedido_id: req.body.pedido_id,
//       comida_id: req.body.comida_id,
//     };

//     await client.query(
//       `INSERT INTO public.la_pasiva_pedidos(
//         pedido_id, comida_id)
//         VALUES ($1, $2);`,
//       [nuevoPedido.pedido_id, nuevoPedido.comida_id]
//     );

//     await client.query(
//       `INSERT INTO public.la_pasiva_pedido_usuario`
//     )

//     return res.json({ success: true, nuevoPedido });
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// };

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

// UPDATES:

exports.comidaOferta = async (req, res) => {
  const { comida_id } = req.params;
  // const { rows } = await client.query(
  //   `SELECT oferta FROM public.la_pasiva WHERE comida_id=$1`
  // );
  await client.query(
    `UPDATE public.la_pasiva SET oferta=$1, precio=$2 WHERE comida_id=$3`,
    [req.body.oferta, req.body.precio, comida_id]
  );
  res.sendStatus(200);
  // if (rows[0] === req.body.oferta) {
  //   res.send("No se aplicaron cambios");
  // } else res.sendStatus(200);
};

// DELETES:

exports.eliminarComida = async (req, res) => {
  const { comida_id } = req.params;
  await client.query(
    `UPDATE public.la_pasiva SET eliminado=true WHERE comida_id=$1`,
    [comida_id]
  ),
    res.sendStatus(200);
};
