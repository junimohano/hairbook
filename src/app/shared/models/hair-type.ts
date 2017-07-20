import { PostHairType } from './post-hair-type';

export class HairType {
  hairTypeId: number;
  name: string;

  isChecked: boolean;
  postHairType: PostHairType;

  public constructor(init?: Partial<HairType>) {
    Object.assign(this, init);
  }
}
