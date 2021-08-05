// import types
import { Request, Response } from 'express';

//type orm imports
import Comment from '../db/entities/Comment'
import {getRepository} from 'typeorm'



// GET ALL
export const getAllComments = async (req: Request, res: Response) => {
  const commentRepository = getRepository(Comment);
  try {
    const comments = await commentRepository.find()
    res.status(200).json(comments)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

//GET ONE
export const getCommentById = async (req: Request, res: Response) => {
  const commentRepository = getRepository(Comment);
  try {
    const { id } = req.params;
    const comments = await commentRepository.findOne(id)
    res.status(200).json(comments)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

//CREATE COMMENT
export const createComment = async (req: Request, res: Response) => { 
  const commentRepository = getRepository(Comment);
  try {
    const comment = await commentRepository.create(req.body);
    const result = await commentRepository.save(comment);
    res.status(200).json(result)
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
}

//UPDATE COMMENT
export const updateComment = async (req: Request, res: Response) => {
  const commentRepository = getRepository(Comment);
  try {
    const { id } = req.params;
    const comment = await commentRepository.findOne(id)
    if (comment) {
      const updatedComment = commentRepository.merge(comment, req.body)
      const result = commentRepository.save(updatedComment)
      return res.status(200).json(result)
    } throw new Error('Comment not found');
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
};

//DELETE COMMENT
export const deleteComment = async (req: Request, res: Response) => {
  const commentRepository = getRepository(Comment);
  try {
    const { id } = req.params;
    const deleted = await commentRepository.delete(id)
    if (deleted) {
      return res.status(204).send('Comment deleted');
    }
    throw new Error('Comment not found');
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}