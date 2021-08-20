import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
} from 'typeorm';
import { FormFields } from './formFields.entity';

@Entity()
@Tree('nested-set')
export class FieldResponseValues extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => FormFields, (field) => field.id)
  @Column({ primary: true })
  fieldId: number;
  @Column({ primary: true })
  value: string;
}
