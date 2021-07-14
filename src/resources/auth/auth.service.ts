import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../../entities/user.entity';

import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<boolean> {
    const user: User = await this.usersService.findByEmail(email, true);
    if (user) {
      return await AuthService.verifyPassword(user.password, pass);
    }
    return false;
  }

  static async hash(pass: string): Promise<string> {
    return await argon2.hash(pass);
  }

  static async verifyPassword(hash: string, pass: string): Promise<boolean> {
    return await argon2.verify(hash, pass);
  }
}
