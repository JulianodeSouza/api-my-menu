"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_sync_1 = __importDefault(require("readline-sync"));
const { execSync } = require("child_process");
const migrationName = readline_sync_1.default.question("Write migration name: ");
execSync(`npx sequelize-cli migration:generate --name ${migrationName}`);
