const express = require("express");
const app = express();
const PORT = 1235;

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
