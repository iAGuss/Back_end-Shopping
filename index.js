const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 1235;

const pasivaRoutes = require("./routes/pasivaRoutes");

app.use(cors());
app.use(bodyParser.json());

app.use("/", pasivaRoutes);

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
