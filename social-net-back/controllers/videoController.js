//./controllers/videoController.js
const videosService = require("../services/videoService");

const videoController = {
  uploadVideo: async (req, res) => {
    await videosService.uploadVideo(req, res);
  },
  getAllVideos: async (req, res) => {
    await videosService.getAllVideos(req, res);
  },
  getAllUserVideos: async (req, res) => {
    await videosService.getAllUserVideos(req, res);
  },
  streamVideo: async (req, res) => {
    await videosService.streamVideo(req, res);
  },
  deleteVideo: async (req, res) => {
    await videosService.deleteVideo(req, res);
  }
};

module.exports = videoController;
