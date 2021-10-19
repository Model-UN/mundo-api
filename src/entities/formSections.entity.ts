import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { ApiBaseEntity } from './base.entity';
import { Forms } from './forms.entity';
import { FormFields } from './formFields.entity';

@Entity()
export class FormSections extends ApiBaseEntity {
  @ManyToOne(() => Forms, (form) => form.id)
  @Column()
  formId: number;
  @Column({ nullable: true })
  title?: string;
  @Column({ nullable: true })
  subtitle?: string;
  @Column({ nullable: true })
  intro?: string;
  @Column({ nullable: true })
  outro?: string;
  @OneToMany(() => FormFields, (field) => field.sectionId)
  fields: FormFields[];
}
