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
import { validate } from 'class-validator';
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
import { RankDto } from '../dto/fieldResponseValidators/rank.dto';

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
   * Retrieve a single submission based on its conference, form, and submission IDs
   *
   * @param confId
   * @param formId
   * @param submissionId
   */
  async fetchOne(confId, formId, submissionId) {
    // Get map of fieldValues
    const fieldValues = await this.getFieldValues();

    // Get responses based on submission ids
    const responses = await this.responsesRepository.query(
      `
        SELECT submission_id, content, response, field_type FROM form_field_responses
        INNER JOIN form_fields ff on ff.id = form_field_responses.field_id_id
        WHERE submission_id = $1
        ORDER BY index
        `,
      [submissionId],
    );

    const output = { id: submissionId };

    responses.map((response) => {
      // Set response data into responsesObj
      output[`${response.content}`] = this.getResponseValues(
        response,
        fieldValues,
      );
    });

    return output;
  }

  /**
   * Retrieve all submissions corresponding to a formId with a confId
   * @param confId
   * @param formId
   */
  async fetchAll(confId, formId) {
    // Get all submission IDs corresponding to formId
    const submissionIdsQuery: FormSubmissions[] =
      await this.submissionRepository.find({
        select: ['id'],
        where: { formId },
      });

    // Extracted array of just the form's respective submission IDs
    const submissionIds = submissionIdsQuery.map((submission) => submission.id);

    // Get map of fieldValues
    const fieldValues = await this.getFieldValues();

    // All responses corresponding to the submission id
    const responses = await this.responsesRepository.query(
      `
        SELECT submission_id, content, response, field_type FROM form_field_responses
        INNER JOIN form_fields ff on ff.id = form_field_responses.field_id_id
        WHERE array_position($1, submission_id) > 0
        ORDER BY index
        `,
      [submissionIds],
    );

    /**
     * All of this just to generate the output below
     */

    const output = [];

    // Cheeky way to iterate through the submission ids
    submissionIds.map((id) => {
      const responsesObj = { id };

      // for each submission id, we want all the corresponding responses so:
      responses.map((response) => {
        if (response.submission_id === id) {
          // Set response data into responsesObj
          responsesObj[`${response.content}`] = this.getResponseValues(
            response,
            fieldValues,
          );
        }
      });

      // If the object has values other than just "id", add to output array
      if (Object.keys(responsesObj).length > 1) {
        output.push(responsesObj);
      }
    });

    return output;
  }

  /**
   * Handles the submission of responses for a new form. Should first validate
   * that the form responses are complete and acceptable for their respective
   * field. Then, should insert a new FormSubmissions object, followed by the
   * FormFieldResponses provided by the user.
   *
   * @param confId
   * @param formId
   * @param submitFormDto
   */
  async handleSubmit(confId, formId, submitFormDto: SubmitFormDto) {
    const form = await this.formService.findOne(formId);
    submitFormDto = await SubmissionsService.normalizeForm(form, submitFormDto);
    const submissionInsertResult = await this.createNewSubmission(formId);
    const submissionId = submissionInsertResult.identifiers[0].id;
    return await this.handleSubmitResponses(
      submissionId,
      submitFormDto.responses,
    );
  }

  /**
   *
   * @param submissionId
   * @param formFieldResponses
   */
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

  private async getFieldValues() {
    // Create map for fieldValues
    const fieldValues = new Map();

    // Get all field values and IDs
    const fieldValuesQuery: FieldResponseValues[] =
      await this.fieldValueRepository.find({
        select: ['id', 'value'],
      });

    // Set id-value key-pairs in fieldValues
    fieldValuesQuery.map((fieldValue) => {
      fieldValues.set(fieldValue.id, fieldValue.value);
    });

    return fieldValues;
  }

  private getResponseValues(response, fieldValues) {
    // Value of the response to the content
    let val = response.response[0];

    // FieldType for the response's field
    const fieldType = response.field_type;

    // Transform the data containing ids as needed:
    switch (fieldType) {
      case 'SELECTION':
        val = fieldValues.get(+val);
        break;
      case 'MULTIPLE_SELECTION':
      case 'RANK':
        val = val.map((id) => fieldValues.get(+id));
        break;
    }
    return val;
  }

  /**
   *
   * @param formId
   */
  async createNewSubmission(formId: number): Promise<InsertResult> {
    const submission = new FormSubmissions();
    submission.formId = formId;
    submission.active = true;
    return await this.submissionRepository.insert(submission);
  }

  /**
   *
   * @param form
   * @param submitFormDto
   * @private
   */
  private static async normalizeForm(
    form: Forms,
    submitFormDto: SubmitFormDto,
  ) {
    const outputSubmitFormDto = new SubmitFormDto();
    outputSubmitFormDto.responses = [];

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
    const validationErrors = [];

    for (const response of submitFormDto.responses) {
      responseFieldIds.push(response.id);
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
        RANK: RankDto,
      };

      // "cast" DTOs to their field type

      const normalized = new clsFieldTypeMap[fieldType]();
      normalized.id = response.id;
      normalized.response = response.response;
      if (fieldType === 'DATE') {
        normalized.response = new Date(response.response);
      }
      outputSubmitFormDto.responses.push(normalized);
      const error = await validate(normalized);
      if (error.length) {
        validationErrors.push(error);
      }
    }

    // Check required fields are all filled out
    const missingRequiredFields = formRequiredFieldIds.filter(
      (id) => !responseFieldIds.includes(id),
    );

    if (missingRequiredFields.length || validationErrors.length) {
      throw new PreconditionFailedException({
        error: 'Bad or missing fields found.',
        missing: missingRequiredFields,
        validationErrors,
      });
    }
    return outputSubmitFormDto;
  }
}
