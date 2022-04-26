import config from "./config.js";
import app from "./app.js";
import "./database/mongoConnection.js";

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(
    `Servidor corriendo en el puerto ${PORT}, http://localhost:${PORT} `
  );
});
