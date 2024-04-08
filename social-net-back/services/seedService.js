require("dotenv").config();
const userService = require("./userService");
const userData = require("../seed/seed");

const seedService = {
  seed: async (req, res) => {
    try {
      // Llamar a la función registerUser del userService con los datos del usuario
      await userService.registerUser({ body: userData }, res);

      // Si necesitas hacer algo más después de registrar el usuario, aquí puedes agregarlo
    } catch (error) {
      console.error("Error en la función de semilla:", error);
      res.status(500).send("Error en la función de semilla");
    }
  }
};

module.exports = seedService;
