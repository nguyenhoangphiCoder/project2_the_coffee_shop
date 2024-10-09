import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrderItemToppings1728485624835
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_item_toppings',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'order_item_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'topping_id',
            type: 'int',
            isNullable: false,
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

    // Thêm khóa ngoại cho order_item_id
    await queryRunner.createForeignKey(
      'order_item_toppings',
      new TableForeignKey({
        columnNames: ['order_item_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'order_items',
        onDelete: 'CASCADE',
        name: 'FK_order_item_toppings_order_item_id',
      }),
    );

    // Thêm khóa ngoại cho topping_id
    await queryRunner.createForeignKey(
      'order_item_toppings',
      new TableForeignKey({
        columnNames: ['topping_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'toppings',
        onDelete: 'CASCADE',
        name: 'FK_order_item_toppings_topping_id',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Xóa các khóa ngoại trước khi xóa bảng
    await queryRunner.dropForeignKey(
      'order_item_toppings',
      'FK_order_item_toppings_order_item_id',
    );
    await queryRunner.dropForeignKey(
      'order_item_toppings',
      'FK_order_item_toppings_topping_id',
    );

    await queryRunner.dropTable('order_item_toppings');
  }
}
