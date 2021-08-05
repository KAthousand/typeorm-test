"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = exports.getCommentById = exports.getAllComments = void 0;
//type orm imports
const Comment_1 = __importDefault(require("../db/entities/Comment"));
const typeorm_1 = require("typeorm");
// GET ALL
const getAllComments = async (req, res) => {
    const commentRepository = typeorm_1.getRepository(Comment_1.default);
    try {
        const comments = await commentRepository.find();
        res.status(200).json(comments);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
};
exports.getAllComments = getAllComments;
//GET ONE
const getCommentById = async (req, res) => {
    const commentRepository = typeorm_1.getRepository(Comment_1.default);
    try {
        const { id } = req.params;
        const comments = await commentRepository.findOne(id);
        res.status(200).json(comments);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
};
exports.getCommentById = getCommentById;
//CREATE COMMENT
const createComment = async (req, res) => {
    const commentRepository = typeorm_1.getRepository(Comment_1.default);
    try {
        const comment = await commentRepository.create(req.body);
        const result = await commentRepository.save(comment);
        res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.createComment = createComment;
//UPDATE COMMENT
const updateComment = async (req, res) => {
    const commentRepository = typeorm_1.getRepository(Comment_1.default);
    try {
        const { id } = req.params;
        const comment = await commentRepository.findOne(id);
        if (comment) {
            const updatedComment = commentRepository.merge(comment, req.body);
            const result = commentRepository.save(updatedComment);
            return res.status(200).json(result);
        }
        throw new Error('Comment not found');
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.updateComment = updateComment;
//DELETE COMMENT
const deleteComment = async (req, res) => {
    const commentRepository = typeorm_1.getRepository(Comment_1.default);
    try {
        const { id } = req.params;
        const deleted = await commentRepository.delete(id);
        if (deleted) {
            return res.status(204).send('Comment deleted');
        }
        throw new Error('Comment not found');
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.deleteComment = deleteComment;
