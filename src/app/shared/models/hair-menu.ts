import { HairSubMenu } from 'app/shared/models/hair-sub-menu';

export interface HairMenu {
  hairMenuId: number;
  name: string;
  hairSubMenus: HairSubMenu[];
}