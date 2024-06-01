import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from './database/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private userModel: Model<UserModel>) {}

  async createUser(email: string, password: string): Promise<UserModel> {
    return this.userModel.create({ email, password });
  }

  async findOne(email: string): Promise<any> {
    return this.userModel.findOne({ email: email });
  }
}
