// imports
import { Column, Entity, ManyToOne } from "typeorm";
// import model to extend off of
import Model from './Model'
// import User and Post to set relation
import User  from './User'
import Post from './Post'

// Define the entity
@Entity('comments')

// Use the 
export default class Comment extends Model {

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => Post)
  post: Post

  @Column()
  content!: string;

}