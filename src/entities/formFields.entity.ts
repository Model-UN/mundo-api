import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiBaseEntity } from './base.entity';
import { FieldTypes } from '../common/enumerations/fieldTypes.enum';
import { FieldResponseValues } from './fieldResponseValues.entity';
import { FormSections } from './formSections.entity';

@Entity()
export class FormFields extends ApiBaseEntity {
  @Column({ nullable: true })
  index?: number;
  @ManyToOne(() => FormSections, (section) => section.id)
  @Column()
  sectionId: number;
  @Column()
  required: boolean;
  @Column('text')
  fieldType: FieldTypes;
  @Column()
  content: string;
  @Column({ nullable: true })
  description?: string;
  @OneToMany(() => FieldResponseValues, (value) => value.fieldId)
  values?: FieldResponseValues[];
}
