const express = require("express");
const router = express.Router();
const {
  comidas,
  eliminarComida,
  comidasPorCategoria,
  comidasEnOferta,
  agregarComida,
  comidaOferta,
  comidaPorId,
  pedidos,
  // agregarPedido,
  pedidosNoEntregados,
  pedidoEntregado,
  pedidoPorId,
} = require("../controllers/pasiva");

router.get("/pasiva/comidas", comidas);
router.get("/pasiva/comidaPorId/:comida_id", comidaPorId);
router.get("/pasiva/comidas/:categoria", comidasPorCategoria);
router.get("/pasiva/ofertas", comidasEnOferta);

router.get("/pasiva/pedidos", pedidos);
router.get("/pasiva/pedidos/:pedido_id", pedidoPorId);
router.get("/pasiva/pedidosNoEntregados", pedidosNoEntregados);

router.post("/pasiva/agregarComida", agregarComida);

// router.post("/pasiva/agregarPedido", agregarPedido);
router.put("/pasiva/comidaOferta/:comida_id", comidaOferta);

router.put("/pasiva/pedidoEntregado/:pedido_id", pedidoEntregado);

router.delete("/pasiva/eliminarComida/:comida_id", eliminarComida);

module.exports = router;
