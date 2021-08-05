"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.loginUser = exports.registerUser = exports.getUserById = exports.getAllUsers = void 0;
//import functions
const auth_1 = require("../utils/auth");
//import entity and typeorm
const User_1 = __importDefault(require("../db/entities/User"));
const typeorm_1 = require("typeorm");
// const connection = getConnection();
//GET ALL
const getAllUsers = async (req, res) => {
    const userRepository = typeorm_1.getRepository(User_1.default);
    try {
        const users = await userRepository.find();
        res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
};
exports.getAllUsers = getAllUsers;
//GET ONE 
const getUserById = async (req, res) => {
    const userRepository = typeorm_1.getRepository(User_1.default);
    const { id } = req.params;
    try {
        const { id } = req.params;
        const users = await userRepository.findOne(id);
        res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
};
exports.getUserById = getUserById;
//REGISTER USER, REQUIRES AUTH
const registerUser = async (req, res) => {
    const userRepository = typeorm_1.getRepository(User_1.default);
    try {
        const hashedPassword = await auth_1.hashPassword(req.body.passwordHash);
        const user = userRepository.create({ ...req.body, passwordHash: hashedPassword });
        const results = await userRepository.save(user);
        const accessToken = auth_1.generateToken({ ...results });
        res.status(200).json({ accessToken: accessToken, user: results });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json(error.message);
    }
};
exports.registerUser = registerUser;
//LOGIN USER, REQUIRES AUTH
const loginUser = async (req, res) => {
    const userRepository = typeorm_1.getRepository(User_1.default);
    const user = await userRepository.findOne({
        where: { username: req.body.username },
    });
    if (user == null) {
        return res.status(400).json({ error: "Cannot find user" });
    }
    try {
        const passwordMatch = await auth_1.comparePass(req.body.passwordHash, user.passwordHash);
        if (passwordMatch) {
            const accessToken = auth_1.generateToken({ ...user });
            res.status(200);
            res.json({ accessToken: accessToken });
        }
        else {
            res.status(401).send("Incorrect Email or Password");
        }
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
};
exports.loginUser = loginUser;
//UPDATE USER
const updateUser = async (req, res) => {
    const userRepository = typeorm_1.getRepository(User_1.default);
    try {
        const { id } = req.params;
        const { username, passwordHash } = req.body;
        const user = await userRepository.findOne(id);
        if (user) {
            user.username = username || user.username;
            user.passwordHash = passwordHash || user.passwordHash;
            await userRepository.save(user);
            return res.status(200).json(user);
        }
        throw new Error('User not found');
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
};
exports.updateUser = updateUser;
//DELETE USER
const deleteUser = async (req, res) => {
    const userRepository = typeorm_1.getRepository(User_1.default);
    try {
        const { id } = req.params;
        const deleted = await userRepository.delete(id);
        if (deleted) {
            return res.status(204).send('User deleted');
        }
        throw new Error('User not found');
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.deleteUser = deleteUser;
