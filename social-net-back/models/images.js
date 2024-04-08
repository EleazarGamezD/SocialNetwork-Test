//models/images.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  imageType: { type: String, required: true },
  filename: String,
  contentType: String
});
const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
