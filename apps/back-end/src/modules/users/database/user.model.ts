import { Types } from 'mongoose';

export const UserModelName = 'Users';

export interface UserModel {
  _id: Types.ObjectId;
  email: string;
  password?: string;
}
