import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFranchises1728405134405 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'franchises',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          { name: 'name', type: 'varchar', length: '100', isNullable: false },
          { name: 'owner_id', type: 'int', isNullable: true },
          {
            name: 'address',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_owner_id',
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            columnNames: ['owner_id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('franchises');
  }
}
