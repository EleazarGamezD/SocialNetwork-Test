// models/videos.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new mongoose.Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  contentType: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createDate: { type: Date, default: Date.now },
  url: { type: String, required: false } //? url del video campo usado para cuando se usa la función de subir el video a un bucket en este caso carpeta Uploads
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
