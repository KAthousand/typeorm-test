
// import types
import { Request, Response } from 'express';
//import functions
import { comparePass, generateToken, hashPassword } from '../utils/auth';

//import entity and typeorm
import User from '../db/entities/User'
import {getRepository} from 'typeorm'




//GET ALL
export const getAllUsers = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  try {
    const users = await userRepository.find();
    res.status(200).json(users)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

//GET ONE 
export const getUserById = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const { id } = req.params
  try {
    const { id } = req.params;
    const users = await userRepository.findOne(id)
    res.status(200).json(users)
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

//REGISTER USER, REQUIRES AUTH
export const registerUser = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  try {
    const hashedPassword = await hashPassword(req.body.passwordHash)
    const user = userRepository.create({...req.body, passwordHash: hashedPassword});
    const results = await userRepository.save(user)
    const accessToken =  generateToken({...results})
    res.status(200).json({accessToken: accessToken, user: results})
  } catch (error) {
    console.log(error.message)
    return res.status(500).json(error.message)
  }
}

//LOGIN USER, REQUIRES AUTH
export const loginUser = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({
    where: { username: req.body.username },
  })
  if (user == null) {
    return res.status(400).json({error: "Cannot find user"})
  }
  try {
    const passwordMatch = await comparePass(req.body.passwordHash, user.passwordHash)
    if (passwordMatch) {
      const accessToken = generateToken({...user})
      res.status(200)
      res.json({accessToken: accessToken})
    } else {
      res.status(401).send("Incorrect Email or Password")
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

//UPDATE USER
export const updateUser = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  try {
    const { id } = req.params;
    const {username, passwordHash} = req.body
    const user = await userRepository.findOne( id )
    if (user) {
      user.username = username || user.username
      user.passwordHash = passwordHash || user.passwordHash
      await userRepository.save(user)
      return res.status(200).json(user)
    } throw new Error('User not found');
  } catch (error) {
    return res.status(500).send(error.message)
  }
}


//DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
  const userRepository = getRepository(User);
  try {
    const { id } = req.params;
    const deleted = await userRepository.delete(id)
    if (deleted) {
      return res.status(204).send('User deleted');
    }
    throw new Error('User not found');
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}
