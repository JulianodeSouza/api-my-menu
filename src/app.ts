if (process.env.NODE_ENV === "production") {
  require("module-alias/register");
}
import express from "express";
import { router } from "./api";
import sequelize from "./infra/models";
import { logMessage } from "./services/utils";
const app = express();

app.use(express.json());

// Middleware para CORS se necessário
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/", router);

const PORT = Number(process.env.PORT);

app.listen(PORT, "0.0.0.0", () => {
  sequelize
    .authenticate()
    .then(() => {
      logMessage("Conexão realizada com sucesso!");
      logMessage(`Servidor rodando na porta ${PORT}`);
    })
    .catch((error) => {
      logMessage(`Erro na conexão com o banco: ${error}`);
    });
});
