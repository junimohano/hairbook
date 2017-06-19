import { HairMenu } from 'app/shared/models/hair-menu';

export interface HairSubMenu {
  hairSubMenuId: number;
  name: string;
  hairMenuId: number;
  hairMenu: HairMenu;
}
