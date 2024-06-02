import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from '@modules/users/database/user.model';

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
  }

  async signUp(
    email: string,
    password: string,
  ): Promise<{ user: UserModel; access_token: string }> {
    if (!email || !password) {
      throw new HttpException(
        'Please enter a correct email or password!',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    const createdUser = await this.usersService.createUser(email, hashPassword);
    return {
      user: {
        _id: createdUser._id,
        email: createdUser.email,
      },
      access_token: this.jwtService.sign({ email, password: hashPassword }),
    };
  }

  async signIn(user: UserModel) {
    return {
      user: {
        _id: user._id,
        email: user.email,
      },
      access_token: this.jwtService.sign({
        email: user.email,
        password: user.password,
      }),
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserModel | null> {
    const user = await this.usersService.findOne(email);

    const matchPassword = bcrypt.compareSync(password, user.password);
    if (matchPassword && user.email === email) {
      return user;
    }
    return null;
  }
}
