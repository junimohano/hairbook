import { User } from 'app/shared/models/user';
import { GenderType } from 'app/shared/models/enums/gender-type';
import { Base } from 'app/shared/models/base';

export class Customer extends Base {
  customerId: number;
  name: string;
  gender: GenderType;
  birthDay: Date;
  phone: string;
}
