const express = require("express");
const router = express.Router();
const { comidas, pedidos } = require("../controllers/pasiva");

router.get("/pasiva/comidas", comidas);
router.get("/pasiva/pedidos", pedidos);

module.exports = router;
