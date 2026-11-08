if (process.env.NODE_ENV === "production") {
  require("module-alias/register");
}
import express from "express";
import { router } from "./api";
import sequelize from "./infra/models";
import { captureError, initSentry, Sentry } from "./infra/sentry";
import { logMessage } from "./services/utils";

initSentry();

const app = express();

app.use(express.json());

// Middleware para CORS se necessário
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
});

app.use("/", router);

process.on("unhandledRejection", (reason) => {
  logMessage(`Unhandled Rejection: ${reason}`);
  captureError(reason, { processEvent: "unhandledRejection" });
});

process.on("uncaughtException", async (error) => {
  logMessage(`Uncaught Exception: ${error}`);
  captureError(error, { processEvent: "uncaughtException" });
  await Sentry.flush(2000);
  process.exit(1);
});

const PORT = Number(process.env.PORT);
const HOST = String(process.env.HOST);

app.listen(PORT, HOST, () => {
  sequelize
    .authenticate()
    .then(() => {
      logMessage("Conexão realizada com sucesso!");
      logMessage(`Servidor rodando na porta ${PORT}`);
    })
    .catch((error) => {
      logMessage(`Erro na conexão com o banco: ${error}`);
      captureError(error, { processEvent: "databaseAuthenticateError" });
    });
});
