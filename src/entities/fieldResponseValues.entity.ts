import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';
import { FormFields } from './formFields.entity';

@Entity()
export class FieldResponseValues extends BaseEntity {
  @ManyToOne(() => FormFields, (field) => field.id)
  @Column({ primary: true })
  fieldId: number;
  @Column({ primary: true })
  value: string;
}
