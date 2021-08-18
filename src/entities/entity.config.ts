import { Users } from './users.entity';
import { Conferences } from './conferences.entity';
import { ConferenceUsers } from './conferenceUsers.entity';
import { FieldResponseValues } from './fieldResponseValues.entity';
import { FormFields } from './formFields.entity';
import { Forms } from './forms.entity';
import { FormSections } from './formSections.entity';
import { UserRoles } from './userRoles.entity';

export const EntityConfig = [
  Conferences,
  ConferenceUsers,
  FieldResponseValues,
  FormFields,
  Forms,
  FormSections,
  Users,
  UserRoles,
];
