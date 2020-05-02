const express = require("express");
const router = express.Router();
const Joi = require("joi");

const { Auth } = require("../middlewares/auth");
const { getUser } = require("../middlewares/getUser");

const { Validate, Article } = require("../modules/articles");
router.get("/", async (req, res) => {
  const result = await Article.find({ isPublished: true })
    .skip(req.query.pageSize * req.query.pageNumber - req.query.pageSize)
    .limit(parseInt(req.query.pageSize));
  let totalCount = await Article.countDocuments();
  totalCount = totalCount / 6;
  totalCount = Math.ceil(totalCount);
  res.send({ articles: result, totalCount });
});
router.get("/profile", Auth, async (req, res) => {
  const result = await Article.find({
    isPublished: true,
    "author._id": req.user._id,
  })
    .skip(req.query.pageSize * req.query.pageNumber - req.query.pageSize)

    .limit(parseInt(req.query.pageSize));

  let totalCount = await Article.find({
    isPublished: true,
    "author._id": req.user._id,
  }).countDocuments();
  totalCount = totalCount / 6;
  totalCount = Math.ceil(totalCount);

  if (result.length < 1)
    return res.send({ status: 404, message: "You dont have any articles yet" });
  res.send({ articles: result, totalCount });
  // res.send({ req: result });
});
router.get("/:id", async (req, res) => {
  const result = await Article.findById(req.params.id);
  if (!result)
    return res.status(404).send("the article with the given id not found");
  res.send(result);
});
router.post("/comments", [Auth, getUser], async (req, res) => {
  const { error } = ValidateComments(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const article = await Article.findById(req.body.articleid);
  if (!article)
    return res.status(404).send("article with the given id is not found");

  article.comments.push({
    authorid: req.user._id,
    authoremail: req.user.email,
    authorname: req.user.name,
    comment: req.body.comment,
    profileImage: req.userInfo.profileImage,
  });
  const result = await article.save();
  res.send(result);
});

router.put("/comments/:id", Auth, async (req, res) => {
  const { error } = ValidateComments(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const article = await Article.findById(req.body.articleid);
  if (!article)
    return res.status(404).send("article with the given id is not found");
  for (var i = 0; i < article.comments.length; i++) {
    if (article.comments[i]._id == req.params.id) {
      article.comments[i].comment = req.body.comment;
    }
  }

  const result = await article.save();
  res.send(result);
});

router.delete("/comments/:id", Auth, async (req, res) => {
  const article = await Article.findById(req.body.articleid);
  if (!article)
    return res.status(404).send("article with the given id is not found");
  for (var i = 0; i < article.comments.length; i++) {
    if (article.comments[i]._id == req.params.id) {
      article.comments.splice(i, 1);
    }
  }

  const result = await article.save();
  res.send(result);
});

router.post("/", Auth, async (req, res) => {
  const { error } = Validate(req.body);
  const a = await Article.find({
    title: req.body.title,
    "author._id": req.user._id,
  });
  if (a.length > 0)
    return res.send("Article already exist with the same title");
  if (error) return res.status(400).send(error.details[0].message);
  const article = new Article({
    title: req.body.title,
    body: req.body.body,
    author: {
      _id: req.user._id,
      email: req.user.email,
      name: req.user.name,
    },
    tags: req.body.tags,
    isPublished: req.body.isPublished,
  });
  try {
    const result = await article.save();
    res.send(result);
  } catch (ex) {
    console.log(ex);
  }
});

router.put("/:id", Auth, async (req, res) => {
  const { error } = Validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const article = await Article.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      body: req.body.body,
      author: {
        _id: req.user._id,
        email: req.user.email,
        name: req.user.name,
      },
      tags: req.body.tags,
      isPublished: req.body.isPublished,
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

const ValidateComments = (req) => {
  const schema = {
    articleid: Joi.string().required(),
    comment: Joi.string().required(),
  };
  return Joi.validate(req, schema);
};
module.exports = router;
