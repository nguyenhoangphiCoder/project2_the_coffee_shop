import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePasswordResetToken1728397581142
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'password_reset_tokens',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true },
          { name: 'user_id', type: 'int' },
          { name: 'token', type: 'varchar', length: '255' },
          { name: 'expired', type: 'timestamp' },
          {
            name: 'create_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE', //NẾU BẢN GHI TRONG BẢNG USERS BỊ XOÁ , CÁC BẢNG GHI TƯƠNG ỨNG CŨNG BỊ XOÁ
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('password_reset_tokens');
  }
}
