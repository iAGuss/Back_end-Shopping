const express = require("express");
const router = express.Router();
const {
  comidas,
  pedidos,
  eliminarComida,
  comidasPorCategoria,
  comidasEnOferta,
  agregarComida,
} = require("../controllers/pasiva");

router.get("/pasiva/comidas", comidas);
router.get("/pasiva/comidas/:categoria", comidasPorCategoria);
router.get("/pasiva/ofertas", comidasEnOferta);

router.get("/pasiva/pedidos", pedidos);

router.post("/pasiva/agregarComida", agregarComida);

router.put("/pasiva/eliminarComida/:comida_id", eliminarComida);

module.exports = router;
