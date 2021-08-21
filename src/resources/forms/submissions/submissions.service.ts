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
import { isEmail, isPhoneNumber, validate } from 'class-validator';
import { FormFieldResponseDto } from '../dto/form-field-response.dto';
import { FormFieldResponses } from '../../../entities/formFieldResponses.entity';
import { MultipleSelectionDto } from '../dto/fieldResponseValidators/multiple-selection.dto';
import { ShortAnswerDto } from '../dto/fieldResponseValidators/short-answer.dto';
import { EmailDto } from '../dto/fieldResponseValidators/email.dto';
import { TelephoneDto } from '../dto/fieldResponseValidators/telephone.dto';
import { PostalCodeDto } from '../dto/fieldResponseValidators/postal-code.dto';
import { DateDto } from '../dto/fieldResponseValidators/date.dto';
import { LongAnswerDto } from '../dto/fieldResponseValidators/long-answer.dto';
import { SelectionDto } from '../dto/fieldResponseValidators/selection.dto';

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
    const form = await this.formService.findOne(formId);
    if (SubmissionsService.validateForm(form, submitFormDto)) {
      const submissionInsertResult = await this.createNewSubmission(formId);
      const submissionId = submissionInsertResult.identifiers[0].id;
      return await this.handleSubmitResponses(
        submissionId,
        submitFormDto.responses,
      );
    }
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

    const formFields = {};
    const formRequiredFieldIds = [];

    for (const section of form.sections) {
      for (const field of section.fields) {
        formFields[field.id] = field;

        if (field.required) {
          formRequiredFieldIds.push(field.id);
        }
      }
    }

    // Create data map for response ids

    const responseFieldIds = [];
    const badFields = [];

    for (const response of submitFormDto.responses) {
      responseFieldIds.push(response.id);
      console.log(formFields[response.id].fieldType);
      const fieldType = formFields[response.id].fieldType;

      // Map fieldType with validator dto

      const clsFieldTypeMap = {
        SHORT_ANSWER: ShortAnswerDto,
        EMAIL: EmailDto,
        TELEPHONE: TelephoneDto,
        POSTAL_CODE: PostalCodeDto,
        DATE: DateDto,
        LONG_ANSWER: LongAnswerDto,
        SELECTION: SelectionDto,
        MULTIPLE_SELECTION: MultipleSelectionDto,
      };

      // "cast" DTOs to their field type

      const processed = new clsFieldTypeMap[fieldType]();
      processed.id = response.id;
      processed.response = response.response;
      validate(processed).then((errors) => console.log(errors));
    }

    // Check required fields are all filled out
    console.log(responseFieldIds);
    const missingRequiredFields = formRequiredFieldIds.filter(
      (id) => !responseFieldIds.includes(id),
    );
    console.log(missingRequiredFields);

    if (missingRequiredFields || badFields) {
      throw new PreconditionFailedException({
        error: 'Bad or missing fields found.',
        missing: missingRequiredFields,
        badFields,
      });
    }
    return true;
  }
}
