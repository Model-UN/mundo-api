import { Injectable } from '@nestjs/common';
import { CreateConferenceDto } from './dto/create-conference.dto';
import { UpdateConferenceDto } from './dto/update-conference.dto';

@Injectable()
export class ConferencesService {
  create(createConferenceDto: CreateConferenceDto) {
    return 'This action adds a new conference';
  }

  findAll() {
    return `This action returns all conferences`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conference`;
  }

  update(id: number, updateConferenceDto: UpdateConferenceDto) {
    return `This action updates a #${id} conference`;
  }

  remove(id: number) {
    return `This action removes a #${id} conference`;
  }
}
