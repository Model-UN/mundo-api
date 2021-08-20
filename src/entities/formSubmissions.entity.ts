import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiBaseEntity } from './base.entity';
import { Forms } from './forms.entity';
import { FormFieldResponses } from './formFieldResponses.entity';

@Entity()
export class FormSubmissions extends ApiBaseEntity {
  @ManyToOne(() => Forms, (form) => form.id)
  @Column()
  formId: number;

  @OneToMany(() => FormFieldResponses, (response) => response.submissionId)
  responses: FormFieldResponses[];
}
