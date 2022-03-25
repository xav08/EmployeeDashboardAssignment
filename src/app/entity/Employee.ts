import {
    Column, Entity, ManyToMany, PrimaryGeneratedColumn,
  } from "typeorm";

import { Department } from "./Department";

  
  @Entity()
  export class Employee {
  
    @PrimaryGeneratedColumn("uuid")
    public id: string;
    
    @Column({ nullable: false })
    public name: string;
  
    @Column({ type: "timestamptz", nullable: false })
    public joiningDate: Date;

    @Column({ nullable: false })
    public role: string;

    @Column({ nullable: false })
    public experience: number;
  
    @Column({ nullable: false })
    public status: string;

    @Column({ nullable: true })
    public designation?: string;

    @Column({ nullable: true })
    public employeeProofUrl?: string;

    @Column({ nullable: false })
    public email: string;

    @Column({ nullable: false })
    public password: string;

    @ManyToMany(() => Department, department => department.employees)
    departments: Department[];
  }
  