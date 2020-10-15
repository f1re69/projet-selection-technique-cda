const sql = require("./db.js");

// constructor
const Topic = function(topic) {
  this.title = topic.title;
};

Topic.create = (newTopic, result) => {
  sql.query("INSERT INTO TOPIC SET ?", newTopic, (err, res) => {
    if (err) {
      console.log("Topic.create error : ", err);
      result(err, null);
      return;
    }
    
    console.log("created topic : ", {id: res.insertId, ...newTopic});
    result(null, {id: res.insertId, ...newTopic});
  });
};


Topic.findById = (id, result) => {
  sql.query(`SELECT title FROM Topic WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("Topic.findById error : ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found topic : ", res[0]);
      result(null, res[0]);
      return;
    }

    result({kind: "not_found"}, null);
  });
};

Topic.getAll = result => {
  sql.query(`SELECT id, title FROM Topic`, (err, res) => {
    if (err) {
      console.log("Topic.getAll error : ", err);
      result(err, null);
      return;
    }

    console.log("topics : ", res);
    result(null, res);
  });
};

Topic.updateById = (id, title, result) => {
  sql.query(`UPDATE Topic SET title = ? where id = ${id}`, title, (err, res) => {
    if (err) {
      console.log("Topic error : ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0 ) {
      // Not found topic with the id
      result({kind: "not_found"}, null);
      return;
    }

    console.log("Updated topic : ", {id, title})
    result(null, {id, title})
  });
};

Topic.removeAll = result => {
  sql.query(`DELETE FROM Topic`, (err, res) => {
    if (err) {
      console.log("Topic. error : ", err);
      res(err, null);
      return;
    }
    console.log(`Deleted ${res.affectedRows} topics.`);
    result(null, res);
  });
};

Topic.remove = (id, result) => {
  sql.query(`DELETE FROM Topic where id = ?`, id, (err, res) => {
    if (err) {
      console.log("Topic. error : ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
        // not found Topic with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted topic with id: ", id);
    result(null, res);
  });
};

module.exports = Topic;