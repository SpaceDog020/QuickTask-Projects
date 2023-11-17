import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, Unique, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './roles.entity';

@Entity()
@Unique(['idRole', 'idProject'])
@ObjectType()
export class Role_User {
  @PrimaryGeneratedColumn()
  @Field(type => Int)
  id: number;

  @Column()
  @Field(type => Int)
  idRole: number;

  @Column()
  @Field(type => Int)
  idUser: number;

  @Column()
  @Field(type => Int)
  idProject: number;
}

@ObjectType()
export class ResponseRole_User {
  @Field()
  response: boolean;
}