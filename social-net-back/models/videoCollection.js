const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoCollectionSchema = new mongoose.Schema({
  videoId: { type: Schema.Types.ObjectId, ref: "Video", required: true },
  data: Buffer
});

// Definir el índice compuesto en videoId y chunkIndex
videoCollectionSchema.index({ videoId: 1, chunkIndex: 1 });

const VideoCollection = mongoose.model(
  "VideoCollection",
  videoCollectionSchema
);

module.exports = VideoCollection;
