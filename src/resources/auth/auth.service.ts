import {
  BadRequestException,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../../entities/user.entity';

import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<boolean> {
    const userName = email.toLowerCase();
    const user: User = await this.usersService.findByEmail(userName, true);
    if (user) {
      return await AuthService.verifyPassword(user.password, pass);
    }
    return false;
  }

  static async handleValidatePassword(pass: string): Promise<string> {
    if (this.checkSecurePassword(pass)) {
      return await this.hash(pass);
    }
    throw new PreconditionFailedException(
      'Password submitted was invalid, must contain at least one lowercase, uppercase, numeric, and special character.',
    );
  }

  static checkSecurePassword(pass: string): boolean {
    const re =
      /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[!"#$%&'()*+,-.\/:;<=>?@[\r^_`{|}~])[a-zA-Z0-9!"#$%&'()*+,-.\/:;<=>?@[\]^_`{|}~]{8,120}$/;
    return !!re.exec(pass);
  }

  static async hash(pass: string): Promise<string> {
    return await argon2.hash(pass);
  }

  static async verifyPassword(hash: string, pass: string): Promise<boolean> {
    return await argon2.verify(hash, pass);
  }
}
