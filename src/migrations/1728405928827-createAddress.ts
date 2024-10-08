import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAddress1728405928827 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'addresses',
        columns: [
          {
            name: 'address_id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          { name: 'user_id', type: 'int', isNullable: false },
          {
            name: 'address_line',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          { name: 'city', type: 'varchar', length: '100', isNullable: false },
          { name: 'state', type: 'varchar', length: '100', isNullable: true },
          {
            name: 'postal_code',
            type: 'varchar',
            length: '20',
            isNullable: true,
          },
          {
            name: 'country',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          { name: 'is_default', type: 'boolean', default: false },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            name: 'FK_user_id',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('addresses');
  }
}
