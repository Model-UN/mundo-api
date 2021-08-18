import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Users } from '../../entities/users.entity';

import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { email: user.email, id: user.id };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.SECRET_KEY,
      }),
    };
  }

  /**
   * Verify a user's login and password with the database. If good, return true,
   * else false.
   *
   * @param email
   * @param pass
   * @return Promise<boolean>
   */
  async validateUser(email: string, pass: string): Promise<Users> {
    // Case insensitive validation
    const userName = email.toLowerCase();
    // Get the user from the db
    const user: Users = await this.usersService.findByEmail(userName, true);
    // If the user exists
    if (user) {
      // Return password check result
      return (await AuthService.verifyPassword(user.password, pass))
        ? user
        : null;
    }
    // Else, return false
    return null;
  }

  /**
   * Check a password against an argon2 hash.
   *
   * @param hash
   * @param pass
   * @return Promise<boolean>
   */
  static async verifyPassword(hash: string, pass: string): Promise<boolean> {
    return await argon2.verify(hash, pass);
  }

  /**
   * Handles the validation and hashing of a new password.
   *
   * @param pass
   * @return Promise<string> argon2 hash
   * @throws PreconditionFailedException for invalid passwords
   */
  static async handleValidatePassword(pass: string): Promise<string> {
    if (this.checkSecurePassword(pass)) {
      return await this.hash(pass);
    }
    throw new PreconditionFailedException(
      'Password submitted was invalid, must contain at least one lowercase, uppercase, numeric, and special character.',
    );
  }

  /**
   * Sort of check if the password is a SHA-256 hash.
   *
   * @param pass
   * @returns boolean
   */
  static checkSecurePassword(pass: string): boolean {
    const isHash = /^[a-f0-9]{64}$/gi;
    return isHash.test(pass);
  }

  /**
   * Hashes a string using argon2.
   *
   * @param pass
   * @returns Promise<string>
   */
  static async hash(pass: string): Promise<string> {
    return await argon2.hash(pass);
  }
}
