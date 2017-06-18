import { GenderType } from 'app/shared/enums/gender-type';
import { User } from 'app/users/shared/models/user';

export interface Customer {
  customerId: number;
  name: string;
  gender: GenderType;
  birthDay: Date;
  phone: string;
  userId: number;
  user: User;

  createdUserId: number | null;
  updatedUserId: number | null;
  createdUser: User | null;
  updatedUser: User | null;
  createdDate: Date | null;
  updatedDate: Date | null;
}
