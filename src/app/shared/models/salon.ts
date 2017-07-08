import { User } from 'app/shared/models/user';
import { Base } from 'app/shared/models/base';

export class Salon extends Base {
  salonId: number;
  name: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  url: string | null;
  phone: string | null;
}
