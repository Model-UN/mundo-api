import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiBaseEntity } from './base.entity';
import { FormSections } from './formSections.entity';
import { FieldTypes } from '../common/enumerations/fieldTypes.enum';

@Entity()
export class FormFields extends ApiBaseEntity {
  @ManyToOne(() => FormSections, (section) => section.id)
  formId: number;
  @Column()
  required: boolean;
  @Column()
  fieldType: FieldTypes;
  @Column()
  content: string;
  @Column({ nullable: true })
  description?: string;
}
