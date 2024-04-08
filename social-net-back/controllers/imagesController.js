//./controllers/imagesController.js
const imagesService = require("../services/imagesService");

const imageController = {
  /**
   * Uploads an image.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise} A promise that resolves when the image is uploaded.
   */
  uploadImage: async (req, res) => {
    console.log("uploadImage Function");
    await imagesService.uploadImage(req, res);
  },

  /**
   * A function to get an image asynchronously.
   *
   * @param {Object} req - the request object
   * @param {Object} res - the response object
   * @return {Promise} a Promise that resolves when the image is retrieved
   */
  getImage: async (req, res) => {
    console.log("getImage Function");
    await imagesService.getImage(req, res);
  },

  /**
   * Retrieves all images.
   *
   * @param {Object} req - the request object
   * @param {Object} res - the response object
   * @return {Promise} a promise that resolves to the result of the imagesService.getAllImages function
   */
  getAllImages: async (req, res) => {
    console.log("getAllImages Function");
    await imagesService.getAllImages(req, res);
  },

  /**
   * A description of the entire function.
   *
   * @param {type} req - description of parameter
   * @param {type} res - description of parameter
   * @return {type} description of return value
   */
  getImagesByUser: async (req, res) => {
    console.log("getImagesByUser Function");
    await imagesService.getImagesByUser(req, res);
  }
};

module.exports = imageController;
