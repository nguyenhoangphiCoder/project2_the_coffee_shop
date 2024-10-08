import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProduct1728322431034 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment', // Sử dụng chiến lược auto-increment
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'decimal',
            precision: 10, //độ chính xác đến 10 chữ số
            scale: 2, //số chữ số sau dấu phẩy là 2
            isNullable: false, //ko cho phép giá trị null
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'quantity',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'quantity_sold',
            type: 'int',
            default: 0, // giá trị mặc định là 0(số lượng đã bán )
          },
          {
            name: 'franchise_id',
            type: 'int',
            isNullable: true, // cho phép null ( liên kết với bảng franchise)
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP', //mặc định là thời gian hiện tại
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],

        foreignKeys: [
          {
            columnNames: ['franchise_id'], // Cột khóa ngoại là 'franchise_id'
            referencedColumnNames: ['id'], // Liên kết tới bảng 'franchises'
            referencedTableName: 'franchise', // Khóa chính của bảng 'franchises' là 'id'
          },
        ],
      }),
      true,
    );
  }

  // Hàm `down` được thực thi khi rollback migration (hủy bỏ migration)
  public async down(queryRunner: QueryRunner): Promise<void> {
    //xoa bảng product nếu rollback
    await queryRunner.dropTable('productions');
  }
}
