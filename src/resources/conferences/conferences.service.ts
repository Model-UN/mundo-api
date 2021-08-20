import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { CreateConferenceDto } from './dto/create-conference.dto';
import { UpdateConferenceDto } from './dto/update-conference.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Conferences } from '../../entities/conferences.entity';
import { Repository } from 'typeorm';
import { is_zip_code } from '../../common/utils';

@Injectable()
export class ConferencesService {
  constructor(
    @InjectRepository(Conferences)
    private conferenceRepository: Repository<Conferences>,
  ) {}

  /**
   * Validates and inserts a new conference row.
   *
   * @param createConferenceDto
   * @param userId
   * @return
   */
  async create(
    createConferenceDto: CreateConferenceDto,
    userId,
  ): Promise<Conferences> {
    if (!is_zip_code(createConferenceDto.venuePostalCode)) {
      throw new PreconditionFailedException('Invalid zip/postal code.');
    }

    createConferenceDto.active = false;
    createConferenceDto.createdBy = +userId;
    createConferenceDto.updatedBy = +userId;
    const insertResult = await this.conferenceRepository.insert(
      createConferenceDto,
    );
    return await this.conferenceRepository.findOne(insertResult.identifiers[0]);
  }

  findAll() {
    return this.conferenceRepository.find({ where: { active: true } });
  }

  findOne(id: number) {
    return this.conferenceRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateConferenceDto: UpdateConferenceDto) {
    await this.conferenceRepository.update(+id, updateConferenceDto);
    return await this.conferenceRepository.findOne(+id);
  }

  async activate(id: number) {
    await this.conferenceRepository.update(id, { active: true });
    return await this.conferenceRepository.findOne(+id);
  }

  softDelete(id: number) {
    return this.conferenceRepository.update(id, { active: false });
  }
}
