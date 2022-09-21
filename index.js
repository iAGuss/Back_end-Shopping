const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 1235;

const pasivaRoutes = require("./routes/pasivaRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");

app.use(cors());
app.use(bodyParser.json());

app.use("/", pasivaRoutes, usuarioRoutes);

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
