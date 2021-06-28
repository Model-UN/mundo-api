import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ where: { active: true } });
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id: +id, active: true } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.active = true;
    const insertResult = await this.usersRepository.insert(createUserDto);
    return await this.usersRepository.findOne(insertResult.identifiers[0]);
  }

  async softDelete(id: string): Promise<UpdateResult> {
    return this.usersRepository.update(+id, { active: false });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateResult = await this.usersRepository.update(+id, updateUserDto);
    return await this.usersRepository.findOne(updateResult.affected[0]);
  }
}
