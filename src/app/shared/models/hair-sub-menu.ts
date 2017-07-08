import { HairMenu } from 'app/shared/models/hair-menu';

export class HairSubMenu {
  hairSubMenuId: number;
  name: string;
  hairMenuId: number;
  hairMenu: HairMenu;

  public constructor(init?: Partial<HairSubMenu>) {
    Object.assign(this, init);
  }
}
