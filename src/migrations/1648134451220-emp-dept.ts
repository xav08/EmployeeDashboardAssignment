import {MigrationInterface, QueryRunner} from "typeorm";

export class empDept1648134451220 implements MigrationInterface {
    name = 'empDept1648134451220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "joining_date" TIMESTAMP WITH TIME ZONE NOT NULL, "role" character varying NOT NULL, "experience" integer NOT NULL, "status" character varying NOT NULL, "designation" character varying, "employee_proof_url" character varying, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_9a2213262c1593bffb581e382f5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "department_employees_employee" ("department_id" uuid NOT NULL, "employee_id" uuid NOT NULL, CONSTRAINT "PK_28f8915cfb9a9bf022224644a50" PRIMARY KEY ("department_id", "employee_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_afc7c348b7fc7ccf13a9faed1c" ON "department_employees_employee" ("department_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_b9b16ef5c97722546990e28835" ON "department_employees_employee" ("employee_id") `);
        await queryRunner.query(`ALTER TABLE "department_employees_employee" ADD CONSTRAINT "FK_afc7c348b7fc7ccf13a9faed1cc" FOREIGN KEY ("department_id") REFERENCES "department"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "department_employees_employee" ADD CONSTRAINT "FK_b9b16ef5c97722546990e28835b" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "department_employees_employee" DROP CONSTRAINT "FK_b9b16ef5c97722546990e28835b"`);
        await queryRunner.query(`ALTER TABLE "department_employees_employee" DROP CONSTRAINT "FK_afc7c348b7fc7ccf13a9faed1cc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b9b16ef5c97722546990e28835"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_afc7c348b7fc7ccf13a9faed1c"`);
        await queryRunner.query(`DROP TABLE "department_employees_employee"`);
        await queryRunner.query(`DROP TABLE "department"`);
        await queryRunner.query(`DROP TABLE "employee"`);
    }

}
