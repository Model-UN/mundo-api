import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user: User = await this.usersService.findByEmail(email, true);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }
}
