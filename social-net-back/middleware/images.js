const multer = require("multer");
const path = require("path");

// Configuración de Multer para manejar la subida de archivos
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/images"); // Directorio donde se almacenarán las imágenes
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre del archivo con marca de tiempo y extensión
  }
});

const upload = multer({
  storage: storage,

  // Filtrar archivos por tipo de extensión
  fileFilter: function(req, file, cb) {
    const filetypes = /\.(png|jpeg|gif|webp|jpg)$/i; // Extensiones de imágenes permitidas
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (extname) {
      return cb(null, true);
    } else {
      cb(
        "Error: El archivo debe ser una imagen válida (png, jpeg, gif, webp,jpg)."
      );
    }
  }
});

const handleImageToUpload = upload.single("image"); // "image" es el nombre del campo en el formulario

module.exports = handleImageToUpload;
