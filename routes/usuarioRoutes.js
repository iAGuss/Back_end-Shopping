const express = require("express");
const router = express.Router();

const {
  agregarUsuario,
  usuarios,
  actualizarUsuario,
} = require("../controllers/usuarios");
const { verifyToken } = require("../middlewares/validate-jwt");

router.get("/usuarios", usuarios);

router.post("/agregarUsuario", agregarUsuario);

router.put("/actualizarUsuario/:usuario_id", verifyToken, actualizarUsuario);

module.exports = router;
