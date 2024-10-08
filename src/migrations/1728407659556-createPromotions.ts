import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePromotions1728407659556 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'promotions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment', // Chiến lược sinh giá trị là tự động tăng
          },
          { name: 'name', type: 'varchar', length: '100', isNullable: true },
          { name: 'description', type: 'text', isNullable: true },
          {
            name: 'discount_type',
            type: 'varchar',
            length: '50',
            isNullable: true,
          },
          {
            name: 'discount_value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          { name: 'start_date', type: 'date', isNullable: true },
          { name: 'end_date', type: 'date', isNullable: true },
          {
            name: 'status',
            type: 'enum',
            enum: ['active', 'inactive'],
            default: "'inactive'",
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
            onUpdate: 'CURRENT_TIMESTAMP', // Tự động cập nhật thời gian mỗi khi bản ghi thay đổi
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('promotions');
  }
}
