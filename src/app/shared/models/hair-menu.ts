import { HairSubMenu } from 'app/shared/models/hair-sub-menu';

export class HairMenu {
  hairMenuId: number;
  name: string;
  hairSubMenus: HairSubMenu[];

  isChecked: boolean;
  public constructor(init?: Partial<HairMenu>) {
    Object.assign(this, init);
  }
}
