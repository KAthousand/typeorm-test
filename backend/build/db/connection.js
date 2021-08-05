"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initConnection = void 0;
// Imports
require("reflect-metadata");
const typeorm_1 = require("typeorm");
// Import Entitities
const Model_1 = __importDefault(require("./entities/Model"));
const User_1 = __importDefault(require("./entities/User"));
const Post_1 = __importDefault(require("./entities/Post"));
const Comment_1 = __importDefault(require("./entities/Comment"));
let connection;
const initConnection = async () => {
    connection = await typeorm_1.createConnection({
        entities: [Model_1.default, User_1.default, Post_1.default, Comment_1.default],
        type: "postgres"
    });
    await connection.synchronize();
};
exports.initConnection = initConnection;
const getConnection = () => connection;
exports.default = getConnection;
