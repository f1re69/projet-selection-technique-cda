const express = require("express");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3333;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req,res) => {
  res.json({message: "Welcome to the forum."})
});

require("./app/routes/topic.routes.js")(app);
require("./app/routes/post.routes.js")(app);
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}.`);
});