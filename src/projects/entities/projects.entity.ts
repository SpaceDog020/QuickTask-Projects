import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
@ObjectType()
export class Project {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column('integer', { array: true })
  @Field((type) => [Int])
  idTeams: number[];
}

@ObjectType()
export class ResponseProjects {
  @Field()
  response: boolean;
}