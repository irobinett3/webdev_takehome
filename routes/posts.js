const express = require("express");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Post = require("../models/Post");

const router = express.Router();

router.post(
  "/",
  [



    auth, 
    [
        
      check("title", "Title is required and must be under 100 characters")
        .notEmpty()
        .isLength({ max: 100 }),
      check("description", "Description is required and must be under 500 characters")
        .notEmpty()
        .isLength({ max: 500 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description } = req.body;
    try {
      const newPost = new Post({
        title,
        description,
        createdBy: req.user.id, 
      });
      const post = await newPost.save();
      res.status(201).json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("createdBy", ["name"]);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("createdBy", ["name"]);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).json({ msg: "Server error" });
  }
});

router.put("/:id", auth, async (req, res) => {

  const { title, description } = req.body;



  const postFields = {};
  if (title) postFields.title = title;

  if (description) postFields.description = description;



  try {
    let post = await Post.findById(req.params.id);


    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (post.createdBy.toString() !== req.user.id) {

      return res.status(401).json({ msg: "User not authorized" });
    }

    post = await Post.findByIdAndUpdate(req.params.id, { $set: postFields }, { new: true });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
});





router.delete("/:id", auth, async (req, res) => {
  try {
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post not found" });

    if (post.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.deleteOne();


    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);


    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;