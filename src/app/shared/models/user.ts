import { Salon } from 'app/shared/models/salon';

export interface User {
  userId: number;
  userKey: string;
  userName: string;
  password: string;
  email: string;
  image: string;
  name: string;

  salonId: number | null;
  salon: Salon | null;

  createdUserId: number | null;
  updatedUserId: number | null;
  createdUser: User | null;
  updatedUser: User | null;
  createdDate: Date | null;
  updatedDate: Date | null;
}
