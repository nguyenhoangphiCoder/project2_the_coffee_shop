import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrders1728472176436 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Kiểm tra và xóa ràng buộc khóa ngoại cũ nếu nó đã tồn tại
    await queryRunner.dropForeignKey('orders', 'FK_orders_user_id');
    await queryRunner.dropForeignKey('orders', 'FK_orders_payment_method_id');
    await queryRunner.dropForeignKey('orders', 'FK_orders_managed_by');
    await queryRunner.dropForeignKey('orders', 'FK_orders_franchise_id');

    // Tạo bảng mới
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'user_id', type: 'int' },
          { name: 'payment_method_id', type: 'int' },
          { name: 'managed_by', type: 'int' },
          { name: 'buyer_name', type: 'varchar', length: '255' },
          { name: 'buyer_phone', type: 'varchar', length: '20' },
          { name: 'buyer_email', type: 'varchar', length: '100' },
          { name: 'franchise_id', type: 'int' },
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
          {
            name: 'status',
            type: 'enum',
            enum: ['pending', 'completed', 'cancelled'],
            default: "'pending'",
          },
        ],
      }),
      true,
    );

    // Tạo các ràng buộc khóa ngoại mới
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        name: 'FK_orders_user_id',
      }),
    );
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['payment_method_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'payment_methods',
        onDelete: 'CASCADE',
        name: 'FK_orders_payment_method_id',
      }),
    );
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['managed_by'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        name: 'FK_orders_managed_by',
      }),
    );
    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['franchise_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'franchise',
        onDelete: 'CASCADE',
        name: 'FK_orders_franchise_id',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
