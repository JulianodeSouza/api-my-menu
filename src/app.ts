import express from "express";
import { router } from "./api";
import sequelize from "./infra/models";
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
      console.log("Conexão realizada com sucesso!");
      console.log(`Servidor rodando na porta ${PORT}`);
    })
    .catch((error) => {
      console.error("Erro na conexão com o banco:", error);
    });
});
