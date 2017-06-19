import { User } from 'app/shared/models/user';
import { GenderType } from 'app/shared/models/enums/gender-type';

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
