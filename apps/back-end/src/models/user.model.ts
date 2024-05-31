import { Types } from 'mongoose';

export const UserModelName = 'Users';

export interface User {
  _id: Types.ObjectId;
  email: string;
  password: string;
}
