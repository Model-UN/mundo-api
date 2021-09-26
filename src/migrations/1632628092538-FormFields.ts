import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class FormFields1632628092538 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.addColumn(
      'form_fields',
      new TableColumn({
        name: 'index',
        type: 'INTEGER',
        default: 1,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return await queryRunner.dropColumn('form_fields', 'index');
  }
}
