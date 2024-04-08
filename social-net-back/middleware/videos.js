const multer = require("multer");
const path = require("path");

// Función para limpiar el nombre del archivo y eliminar caracteres especiales
function cleanFileName(filename) {
  // Limpia el nombre del archivo
  return filename.replace(/[^a-zA-Z0-9.]/g, ""); // Solo permite letras, números y puntos en el nombre del archivo
}

// Configuración de Multer para manejar la subida de archivos
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads/Tmp"); // Directorio donde se almacenarán los archivos
  },
  filename: function(req, file, cb) {
    const cleanedFileName = cleanFileName(file.originalname); // Limpia el nombre del archivo
    cb(null, Date.now() + path.extname(cleanedFileName)); // Nombre del archivo con marca de tiempo y extensión
    console.log(cleanedFileName);
  }
});

const upload = multer({
  storage: storage,

  // Filtrar archivos por tipo de extensión
  fileFilter: function(req, file, cb) {
    const filetypes = /\.(mp4|mov|mkv|avi)$/i;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (extname) {
      return cb(null, true);
    } else {
      cb("Error: El archivo debe ser un video válido (mp4, mov, mkv, avi).");
    }
  }
});

const handleVideoToUpload = upload.single("video"); // "video" es el nombre del campo en el formulario

module.exports = handleVideoToUpload;
