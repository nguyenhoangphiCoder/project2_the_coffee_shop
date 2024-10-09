import {
  Column,
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CraeteFranchisesEmployee1728449575640
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'franchise_employees',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          }, //tang dan tu dong},
          { name: 'franchise_id', type: 'int', isNullable: false }, //ko xho phep null
          { name: 'employee_id', type: 'int', isNullable: false },
          {
            name: 'assigned_id',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
    //tao khoa ngoai voi franchises_id
    await queryRunner.createForeignKey(
      'franchise_employees',
      new TableForeignKey({
        columnNames: ['franchise_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'franchises',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'franchise_employees',
      new TableForeignKey({
        columnNames: ['employee_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //lay bang franchise_employees
    const table = await queryRunner.getTable('franchise_employees');
    //tim va xoa khoa ngoai franchise_id
    const franchiseForeignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('franchises_id') !== -1,
    );
    await queryRunner.dropForeignKey(
      'franchise_employees',
      franchiseForeignKey,
    );
    //tim va xoa khoa ngoai employee_id
    const employeeFroreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('employee_id') !== -1,
    );
    await queryRunner.dropForeignKey(
      'franchise_employees',
      employeeFroreignKey,
    );
    //xoa bang franchise_employees

    await queryRunner.dropTable('franchise_employees');
  }
}
