// imports
import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
// import model to extend off of
import Model from './Model'
// import User and Comments to set relation
import  User  from './User'
import Comment from './Comment'

// Define the entity
@Entity('posts')

// Use the 
export default class Post extends Model {

  @ManyToOne(() => User)
  user: User

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[]

  @Column()
  title!: string;

  @Column()
  content!: string;

}