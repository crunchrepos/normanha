import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.model';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private userModel: Model<User>) {}

  async createUser(email: string, password: string): Promise<User> {
    return this.userModel.create({ email, password });
  }

  async findOne(email: string): Promise<any> {
    return this.userModel.findOne({ email: email });
  }
}
