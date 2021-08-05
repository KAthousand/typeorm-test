"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getAllPosts = void 0;
// typeorm imports
const Post_1 = __importDefault(require("../db/entities/Post"));
const typeorm_1 = require("typeorm");
//GET ALL
const getAllPosts = async (_req, res) => {
    const postRepository = typeorm_1.getRepository(Post_1.default);
    try {
        const posts = await postRepository.find();
        res.status(200).json(posts);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
};
exports.getAllPosts = getAllPosts;
//GET ONE POST
const getPostById = async (req, res) => {
    const postRepository = typeorm_1.getRepository(Post_1.default);
    try {
        const { id } = req.params;
        const posts = await postRepository.findOne(id);
        res.status(200).json(posts);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
};
exports.getPostById = getPostById;
//CREATE POST
const createPost = async (req, res) => {
    const postRepository = typeorm_1.getRepository(Post_1.default);
    try {
        const post = postRepository.create(req.body);
        const result = await postRepository.save(post);
        res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.createPost = createPost;
//UPDATE POST
const updatePost = async (req, res) => {
    const postRepository = typeorm_1.getRepository(Post_1.default);
    try {
        const { id } = req.params;
        const post = await postRepository.findOne(id);
        if (post) {
            const updatedPost = postRepository.merge(post, req.body);
            const result = await postRepository.save(updatedPost);
            return res.status(200).json(result);
        }
        throw new Error('Post not found');
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.updatePost = updatePost;
//DELETE POST
const deletePost = async (req, res) => {
    const postRepository = typeorm_1.getRepository(Post_1.default);
    try {
        const { id } = req.params;
        const deleted = await postRepository.delete(id);
        if (deleted) {
            return res.status(204).send('Post deleted');
        }
        throw new Error('Post not found');
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
exports.deletePost = deletePost;
