import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';
import { FormSubmissions } from './formSubmissions.entity';
import { FormFields } from './formFields.entity';

@Entity()
export class FormFieldResponses extends BaseEntity {
  @ManyToOne(() => FormSubmissions, (submission) => submission.id)
  @Column({ primary: true })
  submissionId: number;
  @ManyToOne(() => FormFields, (field) => field.id)
  @Column({ primary: true })
  fieldId: number;
  @Column('text', { array: true })
  response: string[];
}
