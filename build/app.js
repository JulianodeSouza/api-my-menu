"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const api_1 = require("./api");
const models_1 = __importDefault(require("./infra/models"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Middleware para CORS se necessário
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use("/", api_1.router);
const PORT = Number(process.env.PORT);
app.listen(PORT, "0.0.0.0", () => {
    models_1.default
        .authenticate()
        .then(() => {
        console.log("Conexão realizada com sucesso!");
        console.log(`Servidor rodando na porta ${PORT}`);
    })
        .catch((error) => {
        console.error("Erro na conexão com o banco:", error);
    });
});
