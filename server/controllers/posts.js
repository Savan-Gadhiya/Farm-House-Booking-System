
// @route    GET api/posts
// @desc     viwe posts
// @access   Private
exports.posts = (req, res) => {
  // We have access req.user to this function..........
  console.log(req.user);

  res.json({
    posts: {
      title: "My First Post",
      description: "This is my first post.",
    },
  });
}
