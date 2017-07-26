import { Salon } from 'app/shared/models/salon';
import { GenderType } from 'app/shared/models/enums/gender-type';
import { Base } from 'app/shared/models/base';

export class User extends Base {
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
  provider: string;
  salonId: number | null;
  salon: Salon | null;
}
