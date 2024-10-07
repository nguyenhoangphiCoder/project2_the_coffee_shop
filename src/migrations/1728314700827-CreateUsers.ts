import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUsers1728314700827 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true, //khoa chinh
            isGenerated: true, //tu dong tang
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isUnique: true, //dam bao la duy nhat
          },
          {
            name: 'phone_number',
            type: 'varchar',
            length: '20',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'avatar_url',
            type: 'varchar',
            length: '255',
            isNullable: true, //co the null
          },
          {
            name: 'favorite_theme',
            type: 'varchar',
            length: '15',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'enum',
            enum: ['customer', 'employee', 'admin', 'franchise_owner'],
            default: `'customer'`, //gia tri mat dinh la customer
          },
          {
            name: 'create_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }
  //PHONG THUC NAY SE DUOC ROLLBACK MIGRATION

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
