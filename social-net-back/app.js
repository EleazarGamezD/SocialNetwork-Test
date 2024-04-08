require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const cors = require("cors");

app.use(cors());

// para que me lea los archivos css
app.use(express.static(__dirname + "/public"));

// Configuración de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
const mongoUrl = process.env.MONGOATLAS;
mongoose.set("strictQuery", false);
mongoose.connect(mongoUrl, { ssl: true });

// Carga de rutas
const userRoutes = require("./routes/user");
const videoRoutes = require("./routes/video");
const imagesRoutes = require("./routes/images");
const seedRoutes = require("./routes/seed");

// Rutas
app.use("/user", userRoutes);
app.use("/video", videoRoutes);
app.use("/images", imagesRoutes);
app.use("/seed", seedRoutes);

const swaggerOptions = require("./swagger/swaggerOptions"); // importamos la configuración de swagger
const swaggerCustomJs = require("./swagger/swaggerCustomOptions"); // importamos la configuración del custom css y js de swagger
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Middleware para servir la documentación de Swagger UI
app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerCustomJs));

// Puerto de escucha
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
