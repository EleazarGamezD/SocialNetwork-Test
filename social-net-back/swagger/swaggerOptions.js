const path = require("path");

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Social Network API",
      version: "1.0.0",
      description:
        "Backend de una red social donde puedes interactuar con imágenes, videos y usuarios.",
      contact: {
        name: "Eleazar Gámez",
        url: "https://eleazargamezd.github.io/portfolio/",
        email: "eleazar.gamezd@gmail.com"
      },
      servers: [
        {
          url:
            process.env.API_BASE_URL ||
            "https://test-video-uploader-back.vercel.app/",
          description: "Development server"
        }
      ]
    }
  },
  apis: [path.resolve(__dirname, "../swagger/swagger.yaml")]
};

module.exports = swaggerOptions;
