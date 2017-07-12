import { Action } from '@ngrx/store';
import { User } from 'app/shared/models/user';
import { HairMenu } from 'app/shared/models/hair-menu';
import { HairType } from 'app/shared/models/hair-type';
import { Post } from 'app/shared/models/post';
import { Customer } from 'app/shared/models/customer';

export const GET_HAIR_MENUS = '[Post] GET_HAIR_MENUS';
export const GET_HAIR_MENUS_SUCCESS = '[Post] GET_HAIR_MENUS_SUCCESS';
export const GET_HAIR_TYPES = '[Post] GET_HAIR_TYPES';
export const GET_HAIR_TYPES_SUCCESS = '[Post] GET_HAIR_TYPES_SUCCESS';
export const ADD_POST = '[Post] ADD_POST';
export const EDIT_POST = '[Post] EDIT_POST';
export const GET_CUSTOMERS = '[Post] GET_CUSTOMERS';
export const GET_CUSTOMERS_SUCCESS = '[Post] GET_CUSTOMERS_SUCCESS';

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
  constructor(public payload: Post) { }
}

export class EditPost implements Action {
  readonly type = EDIT_POST;
  constructor(public payload: Post) { }
}

export class GetCustomers implements Action {
  readonly type = GET_CUSTOMERS;
  constructor(public payload: number) { }
}

export class GetCustomersSuccess implements Action {
  readonly type = GET_CUSTOMERS_SUCCESS;
  constructor(public payload: Customer[]) { }
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
  ;
