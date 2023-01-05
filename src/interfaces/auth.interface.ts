import { User } from '@interfaces/users.interface';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser {
  user: User;
}

export interface AuthResponse {
  findUser: User;
  cookie?: string;
  tokenData?: TokenData;
}
