const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require('cors')

const articles = require("./routes/articles");
const users = require("./routes/users");
const auth = require("./routes/auth");
const config = require("config");
app.use(express.json());
app.use(cors());

app.use("/api/articles", articles);
app.use("/api/users", users);

app.use("/api/auth", auth);

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  console.log("has ", process.env);

  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/beautybox")
  .then(() => console.log("successfully connected to mongodb "))
  .catch(err => console.error("error in connecting with mongodb "));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
