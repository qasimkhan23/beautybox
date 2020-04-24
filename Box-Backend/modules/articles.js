const mongoose = require("mongoose");
const Joi = require("joi");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
  },
  body: {
    type: String,
    // required: true,
  },
  author: {
    type: new mongoose.Schema({
      _id: mongoose.Schema.Types.ObjectId,
      name: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
      },
      email: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
      },
    }),
    required: true,
  },
  comments: {
    type: [
      new mongoose.Schema({
        authorid: mongoose.Schema.Types.ObjectId,
        authorname: {
          type: String,
          minlength: 3,
          maxlength: 255,
          required: true,
        },
        authoremail: {
          type: String,
          minlength: 3,
          maxlength: 255,
          required: true,
        },
        comment: {
          type: String,

          required: true,
        },
      }),
    ],
  },
  tags: {
    type: Array,
    // validate: {
    //   validator: function(v) {
    //     return v && v.length > 0;
    //   },
    //   message: "An article should have atleast one tag"
    // },
    // match: /^a-z$/
  },
  date: { type: Date, default: Date.now },
  isPublished: {
    type: Boolean,
    // required: false,
  },
});
const Article = mongoose.model("Article", articleSchema);

const ValidateArticles = (article) => {
  const schema = {
    title: Joi.string().min(3).required(),
    body: Joi.string().min(3).required(),
    // author: Joi.string()
    //     .min(3)
    //     .required(),
    tags: Joi.array(),
    isPublished: Joi.bool().required(),
  };
  return Joi.validate(article, schema);
};

module.exports.Article = Article;
module.exports.Validate = ValidateArticles;
