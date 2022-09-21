const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../middlewares/validate-jwt");
const { client } = require("../Database/database");

// GET:

exports.usuarios = async (req, res) => {
  const { rows } = await client.query(
    "SELECT usuario_id, usuario, mail FROM shopping"
  );
  return res.send(rows);
};

// POST:

exports.agregarUsuario = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const clave = await bcrypt.hash(req.body.clave, salt);

    const { rows } = await client.query(
      "SELECT * FROM public.shopping WHERE mail=$1",
      [req.body.mail]
    );

    console.log(rows[0]);
    if (rows[0]) {
      res.send("Mail ya registrado");
    } else {
      await client.query(
        "INSERT INTO shopping (usuario, mail, clave) VALUES ($1, $2, $3)",
        [req.body.usuario, req.body.mail, clave]
      );
      res.send(200);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// UPDATE:

exports.actualizarUsuario = async (req, res) => {
  const { usuario_id } = req.params;
  const { rows } = await client.query(
    `SELECT usuario FROM public.shopping WHERE usuario_id=$1`,
    [usuario_id]
  );
  if (rows[0].usuario === req.body.usuario) {
    res.send("No se aplicaron cambios");
  } else {
    await client.query(
      `UPDATE public.shopping SET usuario=$1 WHERE usuario_id=$2`,
      [req.body.usuario, usuario_id]
    );
    res.sendStatus(200);
  }
};

// Crear el token
// const token = jwt.sign(
//   {
//     name: rows[0].name,
//     id: rows[0].id,
//   },
//   TOKEN_SECRET
// );

// res.json({ error: null, data: "Login exitoso", token });
