import { User } from 'app/shared/models/user';

export interface Token {
  requestedAt: Date;
  expires: Date;
  accessToken: string;
  user: User;
}
