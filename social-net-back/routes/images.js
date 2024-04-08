//./routes/images.js
const express = require("express");
const router = express.Router();
const imagesController = require("../controllers/imagesController");
const handleImages = require("../middleware/images");
const isAuthenticated = require("../middleware/authentication");

router.post(
  "/uploadImage",
  isAuthenticated,
  handleImages,
  imagesController.uploadImage
);
router.get("/getalluserimages/:id", imagesController.getImagesByUser);
router.get("/getimage/:id", imagesController.getImage);
router.get("/getallimages", imagesController.getAllImages);

module.exports = router;
