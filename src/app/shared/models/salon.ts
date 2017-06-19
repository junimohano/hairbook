import { User } from 'app/shared/models/user';

export interface Salon {
  salonId: number;
  name: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  url: string | null;
  phone: string | null;

  createdUserId: number | null;
  updatedUserId: number | null;
  createdUser: User | null;
  updatedUser: User | null;
  createdDate: Date | null;
  updatedDate: Date | null;
}
