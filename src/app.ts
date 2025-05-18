import express from "express";
import { router } from "./api";
import sequelize from "./infra/models";
const app = express();

app.use(express.json());

app.use("/", router);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão realizada com sucesso!");
    console.log(`Servidor rodando na porta ${PORT}`);
  } catch (error) {
    console.error("Erro na conexão com o banco:", error);
  }
});
