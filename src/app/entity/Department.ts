import {
    Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn,
  } from "typeorm";

  import { Employee } from "./Employee";

  
  @Entity()
  export class Department {
  
    @PrimaryGeneratedColumn("uuid")
    public id: string;
  
    @Column({ nullable: false })
    public name: string;

    @ManyToMany(() => Employee, employee => employee.departments)
    @JoinTable()
    employees: Employee[];

  }
  