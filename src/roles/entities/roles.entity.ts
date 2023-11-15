import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name', 'idProject'])
@ObjectType()
export class Role {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field(type => Int)
  idProject: number;
}

@ObjectType()
export class ResponseRole {
  @Field()
  response: boolean;
}