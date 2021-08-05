// imports
import { Column, Entity, OneToMany, Unique } from "typeorm";
// import model to extend off of
import Model from './Model'
// import post to set relation
import  Post  from './Post'
import Comment from './Comment'

// Define the entity
@Entity('users')
@Unique(['username'])
// Use the 
export default class User extends Model {

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[]

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[]

  @Column({name: 'username'})
  username!: string;
  unique!: true;


  // @Column({ select: false })
  @Column()
  passwordHash!: string;

}