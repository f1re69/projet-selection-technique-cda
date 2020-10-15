module.exports = app => {
  const post = require("../controller/post.controller");

  // post a post on the topic with specified id
  app.post("/topics/:idTopic", post.create);
  // get a post on the topic with specified id
  app.get("/topics/:idTopic/post/:idPost", post.findOne);
  // update a post with specified id on the topic with specified id
  app.put("/topics/:idTopic/post/:idPost", post.update);
  // delete post with specified id of topic with specified id
  app.delete("/topics/:idTopic/post/:idPost", post.delete);
};