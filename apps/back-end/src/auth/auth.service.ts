import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user.model';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
    this.usersService = usersService;
    this.jwtService = jwtService;
    console.log({ usersService });
  }

  async signUp(email: string, password: string): Promise<any> {
    console.log('chamou', { email, password });
    if (!email || !password) {
      throw new HttpException(
        'Please enter a correct email or password!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const createdUser = this.usersService.createUser(email, hashPassword);
    return {
      user: createdUser,
      access_token: this.jwtService.sign({ email, password: hashPassword }),
    };
  }

  async signIn(email: string, password: string) {
    const validUser = await this.validateUser(email, password);
    if (validUser) {
      return {
        user: validUser,
        access_token: this.jwtService.sign({
          email,
          password: validUser.password,
        }),
      };
    }

    throw new HttpException(
      'Please enter a correct email or password!',
      HttpStatus.BAD_REQUEST,
    );
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(email);

    const matchPassword = bcrypt.compareSync(password, user.password);
    if (matchPassword && user.email === email) {
      return user;
    }
    return null;
  }
}
