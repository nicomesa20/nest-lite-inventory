import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1671724825956 implements MigrationInterface {
    name = 'InitialMigration1671724825956'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "article" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_40808690eb7b915046558c0f81b" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "quantity" int NOT NULL, "description" nvarchar(255) NOT NULL, "companyId" nvarchar(255) NOT NULL, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_cace4a159ff9f2512dd42373760" DEFAULT NEWSEQUENTIALID(), "email" nvarchar(255) NOT NULL, "name" nvarchar(255) NOT NULL, "password" nvarchar(255) NOT NULL, "role" nvarchar(255) NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_056f7854a7afdba7cbd6d45fc20" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "address" nvarchar(255) NOT NULL, "nit" nvarchar(255) NOT NULL, "phone" nvarchar(255) NOT NULL, CONSTRAINT "UQ_a76c5cd486f7779bd9c319afd27" UNIQUE ("name"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "article"`);
    }

}
