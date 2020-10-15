const Post = require("../models/post.model");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const post = new Post({
    idTopic: parseInt(req.params.idTopic),
    content: req.body.content,
    author: req.body.author,
    date: new Date().toJSON().slice(0, 19).replace('T', ' ')
  });

  Post.create(post, (err,data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Topic."
      });
      else res.send(data);
  });

}

exports.findOne = (req, res) => {
  Post.findById(req.params.idTopic, req.params.idPost, (err, data) => {
    if (err) {
      if(err.kind === "not_found") {
        res.status(404).send({
          message: `Not found post with id ${req.params.id}`
        });
      }
      else {
        res.status(500).send({
          message: `Error retrieving post with id ${req.params.id}`
        });
      }
    }
    else res.send(data);
  });
}

exports.update = (req, res) => {
  // update a topic
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const post = new Post({
    idPost: parseInt(req.params.idPost),
    idTopic: parseInt(req.params.idTopic),
    content: req.body.content,
    author: req.body.author,
    date: new Date().toJSON().slice(0, 19).replace('T', ' ')
  });
  Post.updateById(post, (err, data) => {    
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not post topic with id ${req.params.id}`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving post with id ${req.params.id}`
        });
      }
    }
    else res.send(data)
  })
};

exports.delete = (req, res) => {
  console.log("hello");
  Post.remove(req.params.idPost, (err, data) => {
    if (err) {
      if(err.kind === "not_found") {
        res.status(404).send({
          message: `Not found topic with id ${req.params.idPost}`
        });
      }
      else {
        res.status(500).send({
          message: `Error retrieving topic with id ${req.params.idPost}`
        });
      }
    }
    else res.send(data);
  });
};