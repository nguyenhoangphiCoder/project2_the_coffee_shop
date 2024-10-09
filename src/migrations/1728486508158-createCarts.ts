import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCarts1728486508158 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'carts',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: true, // Có thể là null nếu không liên kết với người dùng
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Thêm khóa ngoại cho user_id
    await queryRunner.createForeignKey(
      'carts',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE', // Xóa giỏ hàng khi người dùng bị xóa
        name: 'FK_carts_user_id',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Xóa khóa ngoại trước khi xóa bảng
    await queryRunner.dropForeignKey('carts', 'FK_carts_user_id');

    await queryRunner.dropTable('carts');
  }
}
