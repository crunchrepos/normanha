export interface User {
  _id: string;
  email: string;
}

export interface UserSession {
  access_code: string;
  user: User;
}

export interface UserAuthDTO {
  email: string;
  password: string;
}
