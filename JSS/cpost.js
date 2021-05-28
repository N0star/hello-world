const Post = require("./mpost");

exports.getPost = (req,res) => {
  res.json({
    posts: [{title: 'First post'},{title: 'Sec title'}]
  });
};

exports.createPost = (req,res) => {
  const post = new Post(req.body)
  console.log("Creating post... ",post);
}
