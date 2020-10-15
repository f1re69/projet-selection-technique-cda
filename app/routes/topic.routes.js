module.exports = app => {
  const topic = require("../controller/topic.controller");

  app.post("/topics", topic.create);
  app.get("/topics", topic.getAll);
  app.get("/topics/:id", topic.findOne);
  app.put("/topics/:id", topic.update);
  app.delete("/topics/:id", topic.delete);
  app.delete("/topics", topic.deleteAll);
};