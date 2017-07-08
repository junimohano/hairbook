import { User } from 'app/shared/models/user';
import { Base } from 'app/shared/models/base';

export class Tag extends Base {
  tagId: number;
  tagName: string;
}
