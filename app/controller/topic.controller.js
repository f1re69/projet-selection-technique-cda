const Topic = require("../models/topic.model");


exports.create = (req, res) => {
   // Validate request
   if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const topic = new Topic({
    title: req.body.title
  });

  // Save Topic in the database
  Topic.create(topic, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Topic."
      });
    else res.send(data);
  });

};

exports.getAll = (req, res) => {
  // Find all the topics
  Topic.getAll((err, data) => {
      if(err) {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving topics."
        });
      }
      else res.send(data)
  });
};

exports.findOne = (req, res) => {
  // Find a single topic
  Topic.findById(req.params.id, (err, data) => {
    if (err) {
      if(err.kind === "not_found") {
        res.status(404).send({
          message: `Not found topic with id ${req.params.id}`
        });
      }
      else {
        res.status(500).send({
          message: `Error retrieving topic with id ${req.params.id}`
        });
      }
    }
    else res.send(data);
  });
  
};

exports.update = (req, res) => {
  // update a topic
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  Topic.updateById(req.params.id, req.body.title, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found topic with id ${req.params.id}`
        });
      } else {
        res.status(500).send({
          message: `Error retrieving topic with id ${req.params.id}`
        });
      }
    }
    else res.send(data)
  })
};

exports.delete = (req, res) => {
  Topic.remove(req.params.id, (err, data) => {
    if (err) {
      if(err.kind === "not_found") {
        res.status(404).send({
          message: `Not found topic with id ${req.params.id}`
        });
      }
      else {
        res.status(500).send({
          message: `Error retrieving topic with id ${req.params.id}`
        });
      }
    }
    else res.send(data);
  });
};

exports.deleteAll = (req, res) => {
  Topic.removeAll((err, data) => {
    if(err) {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting topics."
      });
    }
    else res.send({message: "All topics were successfully deleted !"});
  });

};