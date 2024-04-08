// services/videoService.js
const Video = require("../models/videos");
const User = require("../models/user");
const VideoCollection = require("../models/videoCollection");
const path = require("path");
const fs = require("fs");

require("dotenv").config();

const baseUrl = process.env.API_BASE_URL;

const videoService = {
  /**
   * Uploads a video file to the server.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<Video>} - A promise that resolves when the video is uploaded successfully.
   */
  uploadVideo: async (req, res) => {
    const userId = req.auth._id;
    const videoFile = req.file;
    // Nuevo nombre del archivo donde le agregamos el ID del usuario y eliminamos espacios
    const videoName = userId + `-` + videoFile.originalname.replace(/\s+/g, "");
    const videoPath = videoFile.path; // Ruta del archivo subido
    const videoTitle = req.body.title;
    const contentType = videoFile.mimetype;
    const videoDescription = req.body.description;

    // Lógica para mover el archivo a la carpeta temporal de uploads
    const tempPath = path.join(__dirname, "..", "uploads", "tmp", videoName);
    // Crear un stream de lectura para el archivo subido
    const src = fs.createReadStream(videoPath);
    // Crear un stream de escritura para el archivo temporal
    const destTemp = fs.createWriteStream(tempPath);
    // Mover el archivo subido a la carpeta temporal
    src.pipe(destTemp);
    // Manejar el evento de finalización del stream de escritura en la carpeta temporal
    destTemp.on("finish", function() {
      // Mover el archivo temporal a la carpeta final de videos
      const finalPath = path.join(
        __dirname,
        "..",
        "uploads",
        "videos",
        videoName
      );
      fs.rename(tempPath, finalPath, function(err) {
        if (err) {
          console.log("Error al mover el archivo a la carpeta final:", err);
          res.status(500).send("Error al subir el video.");
        } else {
          // Borrar el archivo temporal subido
          fs.unlink(videoPath, function(err) {
            if (err) {
              res.status(500).json("Error al borrar el archivo temporal.");
            }
          });
        }
      });
    });
    // Manejar errores en el stream de escritura en la carpeta temporal
    destTemp.on("error", function(err) {
      console.log("Error al escribir en la carpeta temporal:", err);
      res.status(500).send("Error al subir el video.");
    });

    // Ahora se crea la información del video en la base de datos
    let existingVideo = await Video.findOne({ name: videoName, userId });
    let existingUser = await User.findById(userId);

    // Si no existe, crea la nueva categoría
    if (!existingVideo) {
      // Creamos la informacion del video en la base de datos
      const newVideo = await Video.create({
        title: videoTitle,
        description: videoDescription,
        url: videoName,
        userId: userId,
        contentType: contentType,
        createDate: Date.now()
      });
      // Crear un objeto de respuesta limpio
      cleanResponse = {
        id: newVideo._id,
        url: `${baseUrl}/uploads/videos/${newVideo.url}`,
        title: newVideo.title,
        description: newVideo.description,
        path: newVideo.path,
        createDate: newVideo.createDate,
        userId: newVideo.userId,
        userName: existingUser.userName
      };
      res.status(201).json(cleanResponse);
    }
  },

  /**
   * Streams a video from the server to the client.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<videoStream>} Returns a promise that resolves when the video is successfully streamed.
   */
  streamVideo: async (req, res) => {
    const videoId = req.params.id;
    try {
      // Buscar el video en la base de datos
      const video = await Video.findById(videoId);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }

      // Ruta del archivo de vídeo en el almacenamiento
      const videoPath = `${process.cwd()}/uploads/videos/${video.url}`;

      // Obtener el tamaño del archivo de vídeo
      const fileSizeInBytes = fs.statSync(videoPath).size;

      // Configurar encabezados de respuesta
      const headers = {
        "Content-Type": "video/mp4",
        "Accept-Ranges": "bytes",
        "Content-Length": fileSizeInBytes
      };

      // Si se trata de una solicitud de byte parcial, extraer el rango solicitado
      const range = req.headers.range;
      if (range) {
        const [start, end] = range.replace(/bytes=/, "").split("-");
        const startByte = parseInt(start, 10);
        const endByte = end ? parseInt(end, 10) : fileSizeInBytes - 1;

        // Configurar encabezados de respuesta para el rango solicitado
        headers[
          "Content-Range"
        ] = `bytes ${startByte}-${endByte}/${fileSizeInBytes}`;
        headers["Content-Length"] = endByte - startByte + 1;

        // Enviar los encabezados de respuesta con el código de estado 206 (Partial Content)
        res.writeHead(206, headers);

        // Crear un stream de lectura para el archivo de vídeo con el rango especificado
        const videoStream = fs.createReadStream(videoPath, {
          start: startByte,
          end: endByte
        });

        // Transmitir el vídeo en trozos
        videoStream.pipe(res);
      } else {
        // Si no se especifica un rango, enviar el archivo completo con el código de estado 200 (OK)
        res.writeHead(200, headers);
        // Crear un stream de lectura para el archivo de vídeo completo
        const videoStream = fs.createReadStream(videoPath);
        // Transmitir el vídeo completo
        videoStream.pipe(res);
      }
    } catch (error) {
      console.error("Error al reproducir el video:", error);
      res.status(500).json({ message: "Error al reproducir el video:" });
    }
  },

  /**
   * Retrieves all videos from the database and sends them as a JSON response.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Array<Video>} - A promise that resolves when the videos are retrieved and sent.
   */
  getAllVideos: async (req, res) => {
    const videos = await Video.find();
    const cleanResponse = videos.map(video => {
      return {
        id: video._id,
        url: `${baseUrl}/video/streamVideo/${video._id}`,
        title: video.title,
        description: video.description,
        createDate: video.createDate,
        userId: video.userId
      };
    });
    res.json(cleanResponse);
  },

  /**
   * Retrieves all videos for a specific user.
   *
   * @param {Object} req - the request object
   * @param {Object} res - the response object
   * @return {Array} an array of videos belonging to the user
   */
  getAllUserVideos: async (req, res) => {
    const userId = req.params.id;
    const videos = await Video.find({ userId });
    res.json(videos);
  },

  /**
   * Deletes a video from storage and the MongoDB database.
   *
   * @param {Object} req - The request object.
   * @param {Object} res - The response object.
   * @return {Promise<void>} A promise that resolves when the video is deleted successfully or rejects with an error.
   */
  deleteVideo: async (req, res) => {
    const videoId = req.params.id; // se pasa el ID del video como parámetro en la URL

    try {
      // Eliminar el archivo de vídeo del almacenamiento
      const video = await Video.findById(videoId);
      if (!video) {
        return res.status(404).json({ message: "Video not found" });
      }

      const videoPath = `${process.cwd()}/uploads/videos/${video.url}`; // Ruta del archivo de vídeo en el almacenamiento

      fs.unlink(videoPath, async err => {
        if (err) {
          console.error("Error deleting video file:", err);
          return res.status(500).json({ message: "Error deleting video file" });
        }

        // Eliminar la información del vídeo de MongoDB
        await Video.findByIdAndDelete(videoId);
        res.status(200).json({ message: "Video deleted successfully" });
      });
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({ message: "Error deleting video" });
    }
  },

  //!!importante funcion para subir videos a mongodb, no se usara en el front
  /**
   * Uploads a video to MongoDB in chunks and creates corresponding documents in Video and VideoCollection collections.
   *
   * @param {Object} req - the request object containing file, auth, and body information
   * @param {Object} res - the response object
   * @return {Object} - returns a JSON response with a success message and the new video object
   */
  uploadVideoToMongo: async (req, res) => {
    const videoFile = req.file;
    const videoBuffer = fs.readFileSync(videoFile.path); // Leer el video como un buffer
    const userId = req.auth._id;
    const videoTitle = req.body.title;
    const videoDescription = req.body.description;
    const contentType = videoFile.mimetype;

    const chunkSize = 15 * 1024 * 1024; // Tamaño de los chunks 10 MB

    try {
      const totalChunks = Math.ceil(videoBuffer.length / chunkSize);

      // Crear un nuevo video en la colección Video
      const newVideo = new Video({
        title: videoTitle,
        description: videoDescription,
        createDate: Date.now(),
        userId: userId,
        url: "",
        contentType: contentType
      });
      await newVideo.save();

      // Subir cada chunk a MongoDB como un documento en la colección VideoCollection
      for (let i = 0; i < totalChunks; i++) {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, videoBuffer.length);
        const chunkData = videoBuffer.slice(start, end);
        const base64Data = chunkData.toString("base64");

        // Crear un documento para el chunk
        const chunkDocument = new VideoCollection({
          videoId: newVideo._id,
          data: Buffer.from(base64Data, "base64"),
          userId: userId
        });
        console.log(start, end);
        // Insertar el chunk en la colección VideoCollection
        await chunkDocument.save();
      }

      // Enviar una respuesta exitosa
      res.status(201).json({ message: "Video subido exitosamente.", newVideo });
    } catch (error) {
      console.error("Error al subir el video:", error);
      res.status(500).send("Error al subir el video.");
    } finally {
      // Borrar el archivo temporal subido
      fs.unlink(videoFile.path, function(err) {
        if (err) {
          console.error("Error al borrar el archivo temporal:", err);
          res.status(500).send("Error al subir el video.");
        }
      });
    }
  },

  //!!Streams los videos desde mongoDB con el id, no se usara en el front
  /**
   * A function that streams a video from MongoDB based on the specified video ID and range.
   *
   * @param {Object} req - The request object containing parameters like video ID and range.
   * @param {Object} res - The response object used to send back the video data.
   * @return {Promise} A promise that resolves once the video streaming is complete or rejects on error.
   */
  streamVideoFromMongo: async (req, res) => {
    const videoId = req.params.id;
    const range = req.headers.range;

    try {
      // Buscar los chunks relacionados con el video en la base de datos
      const chunks = await VideoCollection.find(
        { videoId },
        { data: 1, _id: 0 }
      )
        .sort("chunkIndex")
        .limit(100)
        .allowDiskUse(true);

      // Concatenar los datos de los chunks para reconstruir el video completo
      const videoBuffer = Buffer.concat(chunks.map(chunk => chunk.data));

      const fileSizeInBytes = videoBuffer.length;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSizeInBytes - 1;
        const chunkSize = end - start + 1;

        res.writeHead(206, {
          "Content-Range": `bytes ${start}-${end}/${fileSizeInBytes}`,
          "Accept-Ranges": "bytes",
          "Content-Length": chunkSize,
          "Content-Type": "video/mp4"
        });

        // Enviar el segmento del video
        res.end(videoBuffer.slice(start, end + 1));
      } else {
        res.writeHead(200, {
          "Content-Length": fileSizeInBytes,
          "Content-Type": "video/mp4"
        });

        // Transmitir el video completo
        res.end(videoBuffer);
      }
    } catch (error) {
      console.error("Error al recuperar el video desde MongoDB:", error);
      res.status(500).send("Error al recuperar el video desde MongoDB.");
    }
  }
};
module.exports = videoService;
