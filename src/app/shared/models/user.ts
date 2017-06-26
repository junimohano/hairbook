import { Salon } from 'app/shared/models/salon';
import { GenderType } from 'app/shared/models/enums/gender-type';

export interface User {
  userId: number;
  userKey: string;
  userName: string;
  password: string;
  email: string;
  image: string;
  name: string;

  gender: GenderType;
  birthday: Date | null;
  phone: string;

  salonId: number | null;
  salon: Salon | null;

  createdUserId: number | null;
  updatedUserId: number | null;
  createdUser: User | null;
  updatedUser: User | null;
  createdDate: Date | null;
  updatedDate: Date | null;
}
