const express = require("express");
const router = express.Router();
const { comidas, pedidos, eliminar } = require("../controllers/pasiva");

router.get("/pasiva/comidas", comidas);
router.get("/pasiva/pedidos", pedidos);
router.delete("/pasiva/pedidos",eliminar)

module.exports = router;
