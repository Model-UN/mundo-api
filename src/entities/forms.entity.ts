import { Entity, OneToMany } from 'typeorm';
import { ApiBaseEntity } from './base.entity';
import { FormSections } from './formSections.entity';

@Entity()
export class Forms extends ApiBaseEntity {
  @OneToMany(() => FormSections, (section) => section.formId)
  sections: FormSections[];
}
