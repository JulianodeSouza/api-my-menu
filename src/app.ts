import "./instrument";
import express from "express";
import { router } from "./api";
import { errorHandler } from "./api/middlewares/error-handler";
import sequelize from "./infra/models";
import { captureError, Sentry } from "./infra/sentry";
import { logMessage } from "./services/utils";

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

Sentry.setupExpressErrorHandler(app);
app.use(errorHandler);

process.on("unhandledRejection", (reason) => {
  logMessage(`Unhandled Rejection: ${reason}`);
});

process.on("uncaughtException", (error) => {
  logMessage(`Uncaught Exception: ${error}`);
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
