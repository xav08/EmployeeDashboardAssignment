import {MigrationInterface, QueryRunner} from "typeorm";

export class EmployeeDepartment1648708747975 implements MigrationInterface {
    name = 'EmployeeDepartment1648708747975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "departmentDetails" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "department_room" character varying NOT NULL, "department_code" character varying, "website" character varying, "department_id" integer NOT NULL, CONSTRAINT "REL_5189490d9259a5fb19cddf726a" UNIQUE ("department_id"), CONSTRAINT "PK_1a19be3ec7fe32e887e665e5806" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying, "age" integer NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "department_id" integer NOT NULL, CONSTRAINT "UQ_389fe2fe09430efb8eabc4e1b6e" UNIQUE ("username"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying NOT NULL, "department_details_id" uuid, CONSTRAINT "REL_cd33326ed8c9f0d2ce5b39dd66" UNIQUE ("department_details_id"), CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "departmentDetails" ADD CONSTRAINT "FK_5189490d9259a5fb19cddf726a4" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "employee" ADD CONSTRAINT "FK_d62835db8c0aec1d18a5a927549" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "department" ADD CONSTRAINT "FK_cd33326ed8c9f0d2ce5b39dd662" FOREIGN KEY ("department_details_id") REFERENCES "departmentDetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department" DROP CONSTRAINT "FK_cd33326ed8c9f0d2ce5b39dd662"`);
        await queryRunner.query(`ALTER TABLE "employee" DROP CONSTRAINT "FK_d62835db8c0aec1d18a5a927549"`);
        await queryRunner.query(`ALTER TABLE "departmentDetails" DROP CONSTRAINT "FK_5189490d9259a5fb19cddf726a4"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "departmentDetails"`);
    }

}
