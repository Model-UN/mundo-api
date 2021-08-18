import { Column, Entity, ManyToOne } from 'typeorm';
import { ApiBaseEntity } from './base.entity';
import { Forms } from './forms.entity';

@Entity()
export class FormSections extends ApiBaseEntity {
  @ManyToOne(() => Forms, (form) => form.id)
  formId: number;
  @Column({ nullable: true })
  title?: string;
  @Column({ nullable: true })
  subtitle?: string;
  @Column({ nullable: true })
  intro?: string;
  @Column({ nullable: true })
  outro?: string;
}
