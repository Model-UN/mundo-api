import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Forms } from '../../../entities/forms.entity';
import { InsertResult, Repository } from 'typeorm';
import { FormSections } from '../../../entities/formSections.entity';
import { FormFields } from '../../../entities/formFields.entity';
import { FieldResponseValues } from '../../../entities/fieldResponseValues.entity';
import { FormsService } from '../forms.service';
import { SubmitFormDto } from '../dto/submit-form.dto';
import { FormSubmissions } from '../../../entities/formSubmissions.entity';
import { UsersService } from '../../users/users.service';
import { FieldTypes } from '../../../common/enumerations/fieldTypes.enum';
import { is_zip_code } from '../../../common/utils';
import { isEmail, isPhoneNumber } from 'class-validator';
import { FormFieldResponseDto } from '../dto/form-field-response.dto';
import { FormFieldResponses } from '../../../entities/formFieldResponses.entity';

@Injectable()
export class SubmissionsService {
  constructor(
    private readonly formService: FormsService,
    private readonly userService: UsersService,
    @InjectRepository(Forms)
    private formRepository: Repository<Forms>,
    @InjectRepository(FormSections)
    private sectionRepository: Repository<FormSections>,
    @InjectRepository(FormFields)
    private fieldRepository: Repository<FormFields>,
    @InjectRepository(FieldResponseValues)
    private fieldValueRepository: Repository<FieldResponseValues>,
    @InjectRepository(FormSubmissions)
    private submissionRepository: Repository<FormSubmissions>,
    @InjectRepository(FormFieldResponses)
    private responsesRepository: Repository<FormFieldResponses>,
  ) {}

  /**
   * Handles the submission of responses for a new form. Should first validate
   * that the form responses are complete and acceptable for their respective
   * field. Then, should insert a new FormSubmissions object, followed by the
   * FormFieldResponses provided by the user.
   *
   * @param confId
   * @param formId
   * @param submitFormDto
   * @param register
   */
  async handleSubmit(
    confId,
    formId,
    submitFormDto: SubmitFormDto,
    register?: string,
  ) {
    // const form = await this.formService.findOne(formId);
    // if (SubmissionsService.validateForm(form, submitFormD
    const submissionInsertResult = await this.createNewSubmission(formId);
    const submissionId = submissionInsertResult.identifiers[0].id;
    return await this.handleSubmitResponses(
      submissionId,
      submitFormDto.responses,
    );
    // }
  }

  async handleSubmitResponses(
    submissionId: number,
    formFieldResponses: FormFieldResponseDto[],
  ): Promise<FormSubmissions> {
    for (const fieldResponse of formFieldResponses) {
      const response = new FormFieldResponses();
      response.submissionId = submissionId;
      response.fieldId = fieldResponse.id;
      response.response =
        Object.prototype.toString.call(response.response) !== '[object Array]'
          ? [fieldResponse.response]
          : fieldResponse.response;
      await this.responsesRepository.insert(response);
    }
    const output = await this.submissionRepository.findOne(submissionId);
    output.responses = await this.responsesRepository.find({
      where: { submissionId },
    });
    return output;
  }

  async createNewSubmission(formId: number): Promise<InsertResult> {
    const submission = new FormSubmissions();
    submission.formId = formId;
    submission.active = true;
    return await this.submissionRepository.insert(submission);
  }

  private static validateForm(
    form: Forms,
    submitFormDto: SubmitFormDto,
  ): boolean {
    // Create data maps for forms
    const formFieldIds = [];
    const formFields = {};
    const formRequiredFieldIds = [];
    const formFieldTypeMap = {};
    for (const section of form.sections) {
      for (const field of section.fields) {
        formFieldIds.push(field.id);
        formFields[field.id] = field;
        formFieldTypeMap[field.id] = field.fieldType;
        if (field.required) {
          formRequiredFieldIds.push(field.id);
        }
      }
    }
    console.log(formFieldIds);
    console.log(formRequiredFieldIds);
    console.log(formFieldTypeMap);

    // Create data map for type to fieldType
    // annoying, but enum name cannot be used here.
    // #TODO refactor this to use enum name somehow / bring to enum level
    const responseTypeFieldTypeMap = {
      SHORT_ANSWER: 'string',
      EMAIL: 'string',
      TELEPHONE: 'string',
      POSTAL_CODE: 'string',
      DATE: '[object Date]',
      LONG_ANSWER: 'string',
      SELECTION: 'number',
      MULTIPLE_SELECTION: '[object Array]',
      RANK: '[object Array]',
    };
    console.log(responseTypeFieldTypeMap);

    // Create data map for response ids
    const responseFieldIds = [];
    const invalidFieldTypes = [];
    const badFields = [];
    for (const response of submitFormDto.responses) {
      const responseId = response.id;
      responseFieldIds.push(response.id);
      console.log(formFields[response.id].fieldType);
      const fieldType = formFields[response.id].fieldType;

      // Check data type of response matches with accepted fieldType
      if (
        typeof response.response !== responseTypeFieldTypeMap[fieldType] &&
        Object.prototype.toString.call(response.response) !==
          responseTypeFieldTypeMap[fieldType]
      ) {
        invalidFieldTypes.push({
          id: responseId,
          content: formFields[response.id].content,
          fieldType: formFields[response.id].fieldType,
          expected: responseTypeFieldTypeMap[fieldType],
          received:
            typeof response.response === 'object'
              ? Object.prototype.toString.call(response.response)
              : typeof response.response,
        });
      }

      // Additional validation by fieldType
      switch (fieldType) {
        case 'EMAIL':
          if (!isEmail(response.response)) {
            badFields.push({
              field: formFields[response.id],
              error: `${response.response} is not a valid email.`,
            });
          }
          break;
        case 'SHORT_ANSWER':
          if (response.response.length > 120) {
            badFields.push({
              received: response.response,
              fieldId: response.id,
              fieldType: formFields[response.id].fieldType,
              content: formFields[response.id].content,
              error: `Short answer field response must contain fewer than 120 characters.`,
            });
          }
          break;
        case 'TELEPHONE':
          if (!isPhoneNumber(response.response)) {
            badFields.push({
              received: response.response,
              fieldId: response.id,
              fieldType: formFields[response.id].fieldType,
              content: formFields[response.id].content,
              error: `Phone number is not valid.`,
            });
          }
          break;
        case 'LONG_ANSWER':
          if (response.response.length > 9999) {
            badFields.push({
              received: response.response,
              fieldId: response.id,
              fieldType: formFields[response.id].fieldType,
              content: formFields[response.id].content,
              error: `Paragraph field response must contain fewer than 10,000 characters.`,
            });
          }
          break;
        case 'POSTAL_CODE':
          if (!is_zip_code(response.response)) {
            badFields.push({
              received: response.response,
              fieldId: response.id,
              fieldType: formFields[response.id].fieldType,
              content: formFields[response.id].content,
              error: `Zip/Postal Code is invalid.`,
            });
          }
          break;
        case 'RANK':
        case 'MULTIPLE_SELECTION':
        case 'SELECTION':
        case 'DATE':
          break;
        default:
          badFields.push({
            received: response.response,
            fieldId: response.id,
            fieldType: formFields[response.id].fieldType,
            content: formFields[response.id].content,
            error: `Field does not contain proper field type.`,
          });
          break;
      }
    }
    console.log(invalidFieldTypes);

    // Check required fields are all filled out
    console.log(responseFieldIds);
    const missingRequiredFields = formRequiredFieldIds.filter(
      (id) => !responseFieldIds.includes(id),
    );
    console.log(missingRequiredFields);

    if (missingRequiredFields || badFields || invalidFieldTypes) {
      throw new PreconditionFailedException({
        error: 'Bad or missing fields found.',
        missingRequiredFields,
        badFields,
        invalidFieldTypes,
      });
    }
    return true;
  }
}
