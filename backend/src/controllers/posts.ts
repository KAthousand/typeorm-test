
// import types
import { Request, Response } from 'express';
// typeorm imports
import Post from '../db/entities/Post'
import {getRepository} from 'typeorm'



//GET ALL
export const getAllPosts = async (_req: Request, res: Response) => {
  const postRepository = getRepository(Post);
  try {
    const posts = await postRepository.find();
    res.status(200).json(posts)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

//GET ONE POST
export const getPostById = async (req: Request, res: Response) => {
  const postRepository = getRepository(Post);
  try {
    const { id } = req.params;
    const posts = await postRepository.findOne(id)
    res.status(200).json(posts)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

//CREATE POST
export const createPost = async (req: Request, res: Response) => {
  const postRepository = getRepository(Post);
  try {
    const post = postRepository.create(req.body);
    const result = await postRepository.save(post);
    res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}

//UPDATE POST
export const updatePost = async (req: Request, res: Response) => {
  const postRepository = getRepository(Post);
  try {
    const { id } = req.params;
    const {title, content} = req.body
    const post = await postRepository.findOne(id)
    if (post) {
      post.title = title || post.title
      post.content = content || post.content
      await postRepository.save(post)
      return res.status(200).json(post)
    } throw new Error('Post not found');
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
};


//DELETE POST
export const deletePost = async (req: Request, res: Response) => {
  const postRepository = getRepository(Post);
  try {
    const { id } = req.params;
    const deleted = await postRepository.delete(id)
    if (deleted) {
      return res.status(204).send('Post deleted');
    }
    throw new Error('Post not found');
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}