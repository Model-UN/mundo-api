import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { AuthService } from '../auth/auth.service';

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

  /**
   * Get user with a provided email. The user must be active in order to be
   * returned.
   *
   * @param {string}  email Required argument representing the email to fetch
   * with.
   * @param {boolean} auth Optional argument to return a password with the user
   * object. For auth purposes only.
   * @returns {Promise<User>} User object containing password if auth, else
   * will not.
   */
  async findByEmail(email: string, auth?: boolean): Promise<User> {
    if (auth) {
      return await this.usersRepository
        .createQueryBuilder('user')
        .where('active = true')
        .andWhere('user.email = :email', { email })
        .addSelect('user.password')
        .getOne();
    }
    return this.usersRepository.findOne({ where: { email, active: true } });
  }

  /**
   * Validates user information and inserts into User table.
   *
   * If the user's information is invalid, then the user will not be created.
   *
   * If the user's email already exists, then the user will not be created.
   *
   * @param createUserDto
   */
  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await AuthService.handleValidatePassword(
      createUserDto.password,
    );
    createUserDto.active = false;
    createUserDto.email = createUserDto.email.toLowerCase();
    createUserDto.createdBy = 0;
    createUserDto.updatedBy = 0;
    const insertResult = await this.usersRepository.insert(createUserDto);
    const uid = insertResult.identifiers[0].id;
    await this.usersRepository.update(uid, {
      createdBy: uid,
      updatedBy: uid,
    });
    return await this.usersRepository.findOne(uid);
  }

  async softDelete(id: string): Promise<UpdateResult> {
    return this.usersRepository.update(+id, { active: false });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updateResult = await this.usersRepository.update(+id, updateUserDto);
    return await this.usersRepository.findOne(updateResult.affected[0]);
  }
}
