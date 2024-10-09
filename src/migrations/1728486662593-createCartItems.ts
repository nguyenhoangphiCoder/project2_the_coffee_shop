import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCartItems1728486662593 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cart_items',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'cart_id',
            type: 'int',
            isNullable: false, // Không thể là null
          },
          {
            name: 'product_id',
            type: 'int',
            isNullable: false, // Không thể là null
          },
          {
            name: 'quantity',
            type: 'int',
            isNullable: false, // Không thể là null
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

    // Thêm khóa ngoại cho cart_id
    await queryRunner.createForeignKey(
      'cart_items',
      new TableForeignKey({
        columnNames: ['cart_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'carts',
        onDelete: 'CASCADE', // Xóa mặt hàng khi giỏ hàng bị xóa
        name: 'FK_cart_items_cart_id',
      }),
    );

    // Thêm khóa ngoại cho product_id
    await queryRunner.createForeignKey(
      'cart_items',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE', // Xóa mặt hàng khi sản phẩm bị xóa
        name: 'FK_cart_items_product_id',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cart_items', 'FK_cart_items_cart_id');
    await queryRunner.dropForeignKey('cart_items', 'FK_cart_items_product_id');

    await queryRunner.dropTable('cart_items');
  }
}
