"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const connection_1 = require("./db/connection");
const server_1 = __importDefault(require("./server/server"));
connection_1.initConnection().then(() => {
    server_1.default();
});
