"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenUser = void 0;
//imports
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
//import entity and typeorm
const User_1 = __importDefault(require("../db/entities/User"));
const typeorm_1 = require("typeorm");
//load env
dotenv_1.default.config();
//verify token user
const verifyTokenUser = async (req, res) => {
    const userRepository = typeorm_1.getRepository(User_1.default);
    if (req.headers) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null)
            return res.status(401).send('Invalid Token');
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_KEY);
            const user = await userRepository.findOne({ id: decoded.id }, { select: ["id", "username"] });
            if (user) {
                return res.status(200).json({ user });
            }
        }
        catch (e) {
            return res.status(401).send('Unauthorized');
        }
        return res.status(404).send('User with the specified ID does not exist');
    }
    return res.send(500);
};
exports.verifyTokenUser = verifyTokenUser;
