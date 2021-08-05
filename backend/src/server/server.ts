// Imports
import express,{ NextFunction, Request, Response } from 'express'
import cors from 'cors'
import logger from 'morgan'
// Import env variables
import accessEnv from '../config/envs'

// import routes
import { router as authRoutes } from '../routes/auth';
import { router as userRoutes } from '../routes/users';
import { router as postRoutes } from '../routes/posts';
import { router as commentRoutes } from '../routes/comments';


// const PORT = parseInt(accessEnv("PORT", "3000"));
const PORT = 8000

const startServer = () => {
  const app = express();

  app.use(express.json())
  app.use(cors({
    // origin: accessEnv("CORS_ORIGIN", "*")
  }))
  app.use(logger('dev'))

  app.use('/api', authRoutes);
  app.use('/api', userRoutes);
  app.use('/api', postRoutes);
  app.use('/api', commentRoutes);


  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
}

export default startServer;
