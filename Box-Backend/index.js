const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const articles = require("./routes/articles");
const users = require("./routes/users");
const auth = require("./routes/auth");
const config = require("config");
app.use(express.json());
app.use(cors());

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,PUT,POST,DELETE,PATCH,OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, Content-Length, X-Requested-With, x-auth-token"
//   );
//   // allow preflight
//   if (req.method === "OPTIONS") {
//     res.send(200);
//   } else {
//     next();
//   }
// });
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
  .catch((err) => console.error("error in connecting with mongodb "));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
