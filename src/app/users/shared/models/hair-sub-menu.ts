import { HairMenu } from 'app/users/shared/models/hair-menu';

export interface HairSubMenu {
  hairSubMenuId: number;
  name: string;
  hairMenuId: number;
  hairMenu: HairMenu;
}
