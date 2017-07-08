import { User } from 'app/shared/models/user';

export class Token {
  requestedAt: Date;
  expires: Date;
  accessToken: string;
  user: User;
}
