import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateAppointments1704632118037 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointments",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "user_id",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "artist_id",
                        type: "int",
                        isNullable: true,
                    },
                    {
                        name: "date",
                        type: "date",                
                     },
                     {
                       name: "time",
                       type: "time",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP"
                    },
                ],
                foreignKeys: [  
                    {
                        columnNames: ["user_id"],
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    },
                    {
                        columnNames: ["artist_id"],
                        referencedTableName: "artists",
                        referencedColumnNames: ["id"],
                        onDelete: "CASCADE",
                    }
                ]
                }),
            true
           
        );
    }
    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
