//services/imagesService.js
const Image = require("../models/images");
const ImageChunk = require("../models/imageChunks");
const fs = require("fs");
const mongoose = require("mongoose");
const chunkSize = 1024 * 1024; // Tamaño de los chunks 1 MB

// Función para obtener una imagen por su ID
const getImageFunction = async Id => {
  const imageId = Id;
  const image = await Image.findById(imageId);

  if (!image) {
    return res.status(404).json({ message: "Imagen no encontrada" });
  }

  try {
    // Obtener los fragmentos del archivo en la colección Imagechunks
    const chunks = await ImageChunk.find(
      { imageId: imageId },
      { data: 1, _id: 0 }
    )
      .sort("chunkIndex")
      .limit(100)
      .allowDiskUse(true);

    // Concatenar los fragmentos en un único buffer de imagen
    const imageBuffer = Buffer.concat(chunks.map(chunk => chunk.data));

    // Devolver el buffer de imagen y el objeto de imagen
    return { imageBuffer, image };
  } catch (error) {
    console.error("Error al recuperar la imagen desde MongoDB:", error);
    res.status(500).send("Error al recuperar la imagen desde MongoDB.");
  }
};
const imagesService = {
  uploadImage: async (req, res) => {
    // Inicializar el bucket de GridFS
    const userId = req.auth._id;
    const title = req.body.title;
    const description = req.body.description;
    const imageType = req.body.imagetype;
    const filename = userId + "-" + req.file.originalname;
    const contentType = req.file.mimetype;
    const filePath = req.file.path;
    const imageBuffer = fs.readFileSync(filePath);
    try {
      // se divide el buffer en chunks
      const totalChunks = Math.ceil(imageBuffer.length / chunkSize);
      // Crear un nuevo video en la colección Video
      const newImage = new Image({
        title: title,
        description: description,
        createDate: Date.now(),
        userId: userId,
        imageType: imageType,
        filename: filename,
        contentType: contentType
      });
      // Guarda el video en la colección
      await newImage.save();
      // Configurar el archivo temporal
      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, imageBuffer.length);
        const chunkImage = imageBuffer.slice(start, end);
        // Crear un nuevo chunk en la colección
        const newChunk = new ImageChunk({
          imageId: newImage._id,
          chunkNumber: i,
          data: chunkImage
        });
        console.log(start, end);
        // Guarda el chunk en la colección
        await newChunk.save();
      }
      res.status(201).json({
        message: "Imagen subida correctamente",
        image: newImage
      });
    } catch (error) {
      res.status(500).json({ message: "Error al subir la imagen", error });
    } finally {
      // Manejar la eliminación del archivo temporal
      fs.unlink(filePath, function(error) {
        if (error) {
          console.error("Error al eliminar el archivo temporal:", error);
        }
      });
    }
  },

  getImage: async (req, res) => {
    const imageId = req.params.id;
    const image = await getImageFunction(imageId);

    res.end(image.imageBuffer);
  },

  getAllImages: async (req, res) => {
    try {
      // Obtener todas las imágenes
      const images = await Image.find();

      // Decodificar todas las imágenes
      const decodedImages = await Promise.all(
        images.map(async image => {
          try {
            // Llamar a la función getImageFunction para obtener la imagen decodificada
            const decoded = await getImageFunction(image._id);

            return {
              userId: image.userId,
              id: image._id,
              title: image.title,
              description: image.description,
              createDate: image.createDate,
              filename: image.filename,
              contentType: image.contentType,
              data: decoded.imageBuffer.toString("base64"),
              imageType: image.imageType
            };
          } catch (error) {
            console.error("Error al obtener la imagen:", error.message);
            return null;
          }
        })
      );
      res.status(200).json(decodedImages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener las imágenes" });
    }
  },

  getImagesByUser: async (req, res) => {
    const userId = req.params.id;
    const image = await Image.find({ userId: userId });
    const allImages = await Promise.all(
      image.map(async image => {
        try {
          // Llamar a la función getImageFunction para obtener la imagen decodificada
          const decoded = await getImageFunction(image._id);

          return {
            userId: image.userId,
            id: image._id,
            title: image.title,
            description: image.description,
            createDate: image.createDate,
            filename: image.filename,
            contentType: image.contentType,
            data: decoded.imageBuffer.toString("base64"),
            imageType: image.imageType
          };
        } catch (error) {
          console.error("Error al obtener la imagen:", error.message);
          return null;
        }
      })
    );

    res.status(200).json(allImages);
  }
};
module.exports = imagesService;
