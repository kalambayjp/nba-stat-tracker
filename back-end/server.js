const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.listen(8080, () => {
  console.log("running on port 8080");
});

app.use("/api/users", require("./routes/users"));
app.use("/api/teams", require("./routes/teams"));
app.use("/api/players", require("./routes/players"));
