import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsController } from './forms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Forms } from '../../entities/forms.entity';
import { FormSections } from '../../entities/formSections.entity';
import { FormFields } from '../../entities/formFields.entity';
import { FieldResponseValues } from '../../entities/fieldResponseValues.entity';
import { SubmissionsController } from './submissions/submissions.controller';
import { SubmissionsService } from './submissions/submissions.service';
import { UsersService } from '../users/users.service';
import { FormSubmissions } from '../../entities/formSubmissions.entity';
import { Users } from '../../entities/users.entity';
import { FormFieldResponses } from '../../entities/formFieldResponses.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Forms,
      FormSections,
      FormFields,
      FieldResponseValues,
      FormSubmissions,
      FieldResponseValues,
      Users,
      FormFieldResponses,
    ]),
  ],
  controllers: [FormsController, SubmissionsController],
  providers: [FormsService, SubmissionsService, UsersService],
})
export class FormsModule {}
