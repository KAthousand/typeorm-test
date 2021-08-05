//imports
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
//import types
import { Request, Response } from 'express';

//import entity and typeorm
import User from '../db/entities/User'
import {getRepository} from 'typeorm'

//load env
dotenv.config()

//verify token user
export const verifyTokenUser = async (req: Request, res: Response) => {
  const userRepository = getRepository(User)
  if (req.headers) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).send('Invalid Token')
    try {
        const decoded = <any>jwt.verify(token, process.env.ACCESS_TOKEN_KEY as jwt.Secret);
        const user = await userRepository.findOne({id: decoded.id}, {select: ["id", "username"]});
        if (user) {
          return res.status(200).json({ user });
        }
    } catch (e) {
      return res.status(401).send('Unauthorized');
    }
      return res.status(404).send('User with the specified ID does not exist');
  }
  return res.send(500);
}
