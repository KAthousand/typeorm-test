// Imports
import 'reflect-metadata'
import { Connection, createConnection } from "typeorm";

// Import Entitities
import Model from './entities/Model';
import User from './entities/User';
import Post from './entities/Post'
import Comment from './entities/Comment'

let connection: Connection;

export const initConnection = async () => {
  connection = await createConnection({
    entities: [Model, User, Post, Comment],
    type: "postgres"
  })
  await connection.synchronize();
}

const getConnection = () => connection;

export default getConnection