const mongoose = require("mongoose");

const imageChunkSchema = new mongoose.Schema({
  imageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    required: true
  },
  chunkNumber: { type: Number, required: true },

  data: { type: Buffer, required: true }
});
imageChunkSchema.index({ imageId: 1, chunkIndex: 1 });
const ImageChunk = mongoose.model("ImageChunk", imageChunkSchema);

module.exports = ImageChunk;
