import { Injectable } from '@nestjs/common';
import { CreateFormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Forms } from '../../entities/forms.entity';
import { InsertResult, Repository } from 'typeorm';
import { FormSections } from '../../entities/formSections.entity';
import { FormFields } from '../../entities/formFields.entity';
import { CreateFormSectionDto } from './dto/create-form-section.dto';
import { FieldResponseValues } from '../../entities/fieldResponseValues.entity';
import { ApiNoContentResponse } from '@nestjs/swagger';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Forms)
    private formRepository: Repository<Forms>,
    @InjectRepository(FormSections)
    private sectionRepository: Repository<FormSections>,
    @InjectRepository(FormFields)
    private fieldRepository: Repository<FormFields>,
    @InjectRepository(FieldResponseValues)
    private fieldValueRepository: Repository<FieldResponseValues>,
  ) {}

  async handleFormCreation(
    creatorId: number,
    confId: number,
    createFormDto: CreateFormDto,
  ) {
    if (createFormDto.sections) {
      const formInsertResult = await this.createForm(creatorId);
      const formId = formInsertResult.identifiers[0].id;
      for (const section of createFormDto.sections) {
        const sectionInsertResult = await this.createFormSection(
          formId,
          creatorId,
          section,
        );
        for (const field of section.fields) {
          const insertField = new FormFields();
          insertField.sectionId = sectionInsertResult.identifiers[0].id;
          insertField.required = field.required;
          insertField.fieldType = field.fieldType;
          insertField.content = field.content;
          insertField.description = field.description;
          insertField.createdBy = insertField.updatedBy = creatorId;
          insertField.active = true;
          const fieldInsertResult = await this.fieldRepository.insert(
            insertField,
          );
          for (const requestValue of field.values) {
            const value = new FieldResponseValues();
            value.fieldId = fieldInsertResult.identifiers[0].id;
            value.value = requestValue;
            await this.fieldValueRepository.insert(value);
          }
        }
      }
    }
  }

  private async createForm(creatorId: number): Promise<InsertResult> {
    const form = new Forms();
    form.createdBy = form.updatedBy = creatorId;
    form.active = true;
    return await this.formRepository.insert(form);
  }

  private async createFormSection(
    formId: number,
    creatorId: number,
    formSection: CreateFormSectionDto,
  ): Promise<InsertResult> {
    const section = new FormSections();
    section.active = true;
    section.createdBy = section.updatedBy = creatorId;
    section.formId = formId;
    section.title = formSection.title;
    section.intro = formSection.intro;
    section.outro = formSection.outro;
    return await this.sectionRepository.insert(section);
  }

  findAll(confId: number) {
    return `This action returns all forms`;
  }

  async findOne(id: number) {
    const form = await this.formRepository.findOne(id);
    form.sections = await this.sectionRepository.find({ formId: form.id });
    for (const section of form.sections) {
      section.fields = await this.fieldRepository.find({
        where: { sectionId: section.id },
      });
      for (const field of section.fields) {
        field.values = await this.fieldValueRepository.find({
          where: { fieldId: field.id },
        });
      }
    }
    return form;
  }

  update(id: number, updateFormDto: UpdateFormDto) {}

  async softDelete(id: number) {
    const form = await this.findOne(id);
    await this.formRepository.update(id, { active: false });
    for (const section of form.sections) {
      await this.sectionRepository.update(section.id, { active: false });
      for (const field of section.fields) {
        await this.fieldRepository.update(field.id, { active: false });
      }
    }
    return ApiNoContentResponse();
  }

  async activate(id: number) {
    const form = await this.findOne(id);
    await this.formRepository.update(id, { active: true });
    for (const section of form.sections) {
      await this.sectionRepository.update(section.id, { active: true });
      for (const field of section.fields) {
        await this.fieldRepository.update(field.id, { active: true });
      }
    }
    return await this.findOne(id);
  }
}
