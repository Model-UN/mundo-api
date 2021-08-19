import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiBaseEntity } from './base.entity';
import { Forms } from './forms.entity';

@Entity()
export class FormFieldResponses extends ApiBaseEntity {
  @ManyToOne(() => Forms, (form) => form.id)
  @Column()
  formId: number;
}
