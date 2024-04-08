// ./routes/video.js
const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middleware/authentication");
const handleVideoToUpload = require("../middleware/videos");
const videoController = require("../controllers/videoController");

router.post(
  "/uploadVideo",
  isAuthenticated,
  handleVideoToUpload,
  videoController.uploadVideo
);
router.get("/getallvideos", videoController.getAllVideos);
router.get(
  "/getalluservideos/:id",
  isAuthenticated,
  videoController.getAllUserVideos
);
router.get("/streamVideo/:id", videoController.streamVideo);
router.delete("/delete/:id", isAuthenticated, videoController.deleteVideo);

router.get("*", (req, res) => {
  res.status(404).send("Esta página no existe :(");
});
module.exports = router;
