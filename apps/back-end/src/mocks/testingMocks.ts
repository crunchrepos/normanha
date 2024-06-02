import { FavoriteProductModel } from '@modules/products/database/products.model';
import { Types } from 'mongoose';
// Auth

const MockUserID = new Types.ObjectId('665929e2f03ef2a6a9eba95b');

const MockUser = {
  _id: MockUserID,
  email: 'luiznormanha@test.com',
  password: '$2b$10$rAQVmsVC8VKN9Gp101gDNejaEReY4nA6zXxqVPepdQx8KstNmVUYm',
};
const MockAuthPayload = {
  email: 'luiznormanha@test.com',
  password: '123123',
};

const MockUserSession = {
  user: {
    _id: MockUser._id,
    email: MockUser.email,
  },
  access_token: 'Mock Token',
};

export const AuthMock = {
  userId: MockUserID,
  authPayload: MockAuthPayload,
  userSession: MockUserSession,
};

// Products

const AddToFavoritePayload = {
  userId: '665929e2f03ef2a6a9eba95b',
  productId: '7983591030806',
};

const AddToFavoriteResult = {
  productId: '7983591030806',
};

const ListOfFavorites: FavoriteProductModel[] = [
  {
    _id: new Types.ObjectId('6659659d95df5706397961fc'),
    userId: new Types.ObjectId(MockUserID),
    productId: '7983591030806',
  },
  {
    _id: new Types.ObjectId('665965b795df5706397961fe'),
    userId: new Types.ObjectId(MockUserID),
    productId: '7783591030206',
  },
  {
    _id: new Types.ObjectId('665965e895df570639796201'),
    userId: new Types.ObjectId(MockUserID),
    productId: '7783591030206',
  },
];

const MockProductID = '665929e2f03ef2a6a9eba95b';

const RemoveFromFavoriteResult = {
  message: 'Removed product from favorites succesfully!',
};

export const FavoritesProductsMock = {
  addToFavoritePayload: AddToFavoritePayload,
  addToFavoriteResult: AddToFavoriteResult,
  listOfFavorites: ListOfFavorites,
  mockProductId: MockProductID,
  removeFromFavoriteResult: RemoveFromFavoriteResult,
};
