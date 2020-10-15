const sql = require("./db.js");

const Post = function(post) {
  if (post.idPost) {
    this.idPost = post.idPost
  }
  this.idTopic = post.idTopic;
  this.content = post.content;
  this.author = post.author;
  this.date = post.date;
}

Post.create = (newPost, result) => {
  console.log(newPost);

  sql.query("INSERT INTO Post SET id_topic = ?, content = ?, author = ?, date = ?",
    [newPost.idTopic, newPost.content, newPost.author, newPost.date], (err, res) => {
      if (err) {
        console.log("Post.create error : ", err);
        result(err,null);
        return;
      }

      console.log("created post : ", {id: res.insertId, ...newPost});
      result(null, {id: res.insertId, ...newPost})
    });
};

Post.findById = (idTopic, idPost, result) => {
  sql.query(`SELECT content,author,date FROM Post WHERE id_topic = ${idTopic} AND id=${idPost}`, (err, res) => {
    if (err) {
      console.log("Topic.findById error : ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log(`found ${res.length} posts`);
      result(null, res);
      return;
    }

    result({kind: "not_found"}, null);
  });
};

Post.updateById = (post, result) => {
  console.log(post.idPost);
  sql.query(`UPDATE Post SET content = ?, author = ?, date = ? where id = ? and id_topic = ?`,
    [post.content, post.author, post.date, post.idPost, post.idTopic], (err, res) => {
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

    console.log("Updated post : ", {...post})
    result(null, {...post})
  });
};

Post.remove = (id, result) => {
  console.log(id);
  sql.query(`DELETE FROM Post where id = ?`, id, (err, res) => {
    if (err) {
      console.log("Post. error : ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
        // not found Topic with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted post with id: ", id);
    result(null, res);
  });
};

module.exports = Post;