import { Action } from '@ngrx/store';

import { Customer } from '../../shared/models/customer';
import { HairMenu } from '../../shared/models/hair-menu';
import { HairType } from '../../shared/models/hair-type';
import { Post } from '../../shared/models/post';
import { PostInfo } from '../../shared/models/post-info';

export const GET_HAIR_MENUS = '[Post] GET_HAIR_MENUS';
export const GET_HAIR_MENUS_SUCCESS = '[Post] GET_HAIR_MENUS_SUCCESS';
export const GET_HAIR_TYPES = '[Post] GET_HAIR_TYPES';
export const GET_HAIR_TYPES_SUCCESS = '[Post] GET_HAIR_TYPES_SUCCESS';
export const ADD_POST = '[Post] ADD_POST';
export const EDIT_POST = '[Post] EDIT_POST';
export const GET_CUSTOMERS = '[Post] GET_CUSTOMERS';
export const GET_CUSTOMERS_SUCCESS = '[Post] GET_CUSTOMERS_SUCCESS';
export const SET_POST_UPLOAD = '[Post] SET_POST_UPLOAD';
export const GO_USER_PAGE = '[Post] GO_USER_PAGE';

export class GetHairMenus implements Action {
  readonly type = GET_HAIR_MENUS;
  constructor() { }
}

export class GetHairMenusSuccess implements Action {
  readonly type = GET_HAIR_MENUS_SUCCESS;
  constructor(public payload: HairMenu[]) { }
}

export class GetHairTypes implements Action {
  readonly type = GET_HAIR_TYPES;
  constructor() { }
}

export class GetHairTypesSuccess implements Action {
  readonly type = GET_HAIR_TYPES_SUCCESS;
  constructor(public payload: HairType[]) { }
}

export class AddPost implements Action {
  readonly type = ADD_POST;
  constructor(public payload: PostInfo) { }
}

export class EditPost implements Action {
  readonly type = EDIT_POST;
  constructor(public payload: PostInfo) { }
}

export class GetCustomers implements Action {
  readonly type = GET_CUSTOMERS;
  constructor(public payload: number) { }
}

export class GetCustomersSuccess implements Action {
  readonly type = GET_CUSTOMERS_SUCCESS;
  constructor(public payload: Customer[]) { }
}

export class SetPostUpload implements Action {
  readonly type = SET_POST_UPLOAD;
  constructor(public payload: PostInfo) { }
}

export class GoUserPage implements Action {
  readonly type = GO_USER_PAGE;
  constructor() { }
}


export type All
  = GetHairMenus
  | GetHairMenusSuccess
  | GetHairTypes
  | GetHairTypesSuccess
  | AddPost
  | EditPost
  | GetCustomers
  | GetCustomersSuccess
  | SetPostUpload
  | GoUserPage
  ;
