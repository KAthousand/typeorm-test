"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// import routes
const auth_1 = require("../routes/auth");
const users_1 = require("../routes/users");
const posts_1 = require("../routes/posts");
const comments_1 = require("../routes/comments");
// const PORT = parseInt(accessEnv("PORT", "3000"));
const PORT = 8000;
const startServer = () => {
    const app = express_1.default();
    app.use(express_1.default.json());
    app.use(cors_1.default({
    // origin: accessEnv("CORS_ORIGIN", "*")
    }));
    app.use(morgan_1.default('dev'));
    app.use('/api', auth_1.router);
    app.use('/api', users_1.router);
    app.use('/api', posts_1.router);
    app.use('/api', comments_1.router);
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
};
exports.default = startServer;
