import { body, validationResult } from 'express-validator';
import {Request, Response, NextFunction} from 'express'

export const userValidationRules = [
  body('username')
    .isLength({ min: 1 })
    .withMessage('Username cannot be blank'),
  // body('passwordHash')
  //   .isLength({ min: 6 })
  //   .withMessage('Password must be at least 6 characters.')
]

export const loginValidationRules = [
  body('username')
    .isLength({ min: 1 })
    .withMessage('username'),
  body('passwordHash')
    .isLength({ min: 1 })
    .withMessage('Password cannot be blank')
]

export const postValidationRules = [
  body('title')
    .isLength({ min: 1 })
    .withMessage('Title cannot be blank'),
  body('content')
    .isLength({ min: 1 })
    .withMessage('Content cannot be blank'),
]

export const commentValidationRules = [
  body('content')
    .isLength({ min: 1 })
    .withMessage('Comment cannot be blank'),
]

export const simpleValidation = validationResult.withDefaults({
  formatter: err => err.msg
})

export const checkErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = simpleValidation(req)
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.mapped())
  }
  next()
}
