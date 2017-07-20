import { HairSubMenu } from 'app/shared/models/hair-sub-menu';

import { PostHairMenu } from './post-hair-menu';

export class HairMenu {
  hairMenuId: number;
  name: string;
  hairSubMenus: HairSubMenu[];

  isChecked: boolean;
  postHairMenu: PostHairMenu;
  public constructor(init?: Partial<HairMenu>) {
    Object.assign(this, init);
  }
}
