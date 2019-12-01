const express = require("express");
const router = express.Router();
const { Auth } = require("../middlewares/auth");
const { Validate, Article } = require("../modules/articles");
router.get("/", async (req, res) => {
  const result = await Article.find({ isPublished: true })
    .skip((req.query.pageSize - 1) * req.query.pageNumber)
    .limit(parseInt(req.query.pageSize));

  res.send(result);
});
router.get("/:id", async (req, res) => {
  const result = await Article.findById(req.params.id);
  if (!result)
    return res.status(404).send("the article with the given id not found");
  res.send(result);
});
router.post("/profile", Auth, async (req, res) => {
  console.log("profilee", req.user);
  const result = await Article.find({
    isPublished: true,
    // author: { _id: req.user._id },
    "author._id": req.user._id
  });
  // const result = await Article.find({
  //   // name: req.body.name,
  //   // author: { name: "ali" }
  // });
  console.log("resultttt", result);
  if (result.length < 1)
    return res.status(404).send("You dont have any articles yet");
  res.send(result);
});
router.post("/", Auth, async (req, res) => {
  const { error } = Validate(req.body);
  const a = await Article.find({
    title: req.body.title,
    "author._id": req.user._id
  });
  console.log("same name", a);
  if (a.length > 0)
    return res.send("Article already exist with the same title");
  if (error) return res.status(400).send(error.details[0].message);
  const article = new Article({
    title: req.body.title,
    body: req.body.body,
    author: {
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name
    },
    tags: req.body.tags,
    isPublished: req.body.isPublished
  });
  try {
    // article.validate(err => {
    //   if (err) return res.send(err.errors.tags.message);
    // });
    const result = await article.save();
    res.send(result);
  } catch (ex) {
    console.log(ex);
  }
});

router.put("/:id", Auth, async (req, res) => {
  const { error } = Validate(req.body);
  console.log('reqqqqq',req.body)
  if (error) return res.status(400).send(error.details[0].message);
  const article = await Article.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      body:req.body.body,
        author: {
          _id: req.user._id,
          email: req.user.email,
          name: req.user.name
        },
      tags: req.body.tags,
      isPublished: req.body.isPublished
    },
    { new: true }
  );
  if (!article)
    return res.status(404).send("article with the given id is not found");
  res.send(article);
});
router.delete("/:id", async (req, res) => {
  const article = await Article.findByIdAndRemove(req.params.id);
  if (!article)
    return res.status(404).send("article with the given id is not found");
  res.send(article);
});
module.exports = router;
