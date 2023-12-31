import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['idProject','name'])
@ObjectType()
export class Task {
  @PrimaryGeneratedColumn() // TypeORM
  @Field(type => Int) // GraphQL
  id: number;

  @Column({nullable: true})
  @Field(type => Int, {nullable: true})
  idCreator: number;

  @Column()
  @Field(type => Int)
  idProject: number;
  
  @Column({nullable: true})
  @Field(type => Int, {nullable: true})
  idUser: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  status: string;

  @Column("text", { array: true, nullable: true})
  @Field(type => [String], {nullable: true})
  comment: string[];

  @Column({nullable: true})
  @Field({nullable: true})
  startDate: string;

  @Column({nullable: true})
  @Field({nullable: true})
  finishDate: string;
}

@ObjectType()
export class ResponseTasks {
  @Field()
  response: boolean;
}