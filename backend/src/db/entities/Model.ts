// imports
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  VersionColumn
} from 'typeorm'
import { v4 as uuid } from 'uuid'

// create an abstract class that extends from BaseEntity from typeORM
export default abstract class Model extends BaseEntity {
  // Generate an id
  @PrimaryGeneratedColumn()
  id!: number

  // Generate a uuid
  @Column({ type: 'uuid' })
  uuid!: string

  // CreatedAt
  @CreateDateColumn()
  createdAt!: Date

  // UpdatedAt
  @UpdateDateColumn()
  updatedAt!: Date

  @DeleteDateColumn()
  deletedDateTime!: Date

  // BeforeInsert: TypeORM will call it before the entity is inserted using repository/manager save.
  @BeforeInsert()
  // Generate a uuid from the library
  createUuid() {
    this.uuid = uuid()
  }

  constructor(model?: Partial<any>) {
    super()
    Object.assign(this, model)
  }

  // toJSON() {
  //   return { ...this, id: undefined }
  // }
}