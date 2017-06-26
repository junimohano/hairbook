import { Action } from '@ngrx/store';
import { User } from 'app/shared/models/user';
import { UserSecret } from 'app/logins/shared/user-secret';

export const LOGIN_SOCIAL = '[Login] Login Social';
export const EXIST_USER = '[Login] Exist User';
export const GET_TOKEN = '[Login] Get Token';
export const SET_USER = '[Login] Success User';
export const REGISTER = '[Login] Register';
export const EXIST_USER_NAME = '[Login] Exist UserName';
export const EXIST_USER_NAME_SUCCESS = '[Login] Exist UserName Success';

export class LoginSocial implements Action {
  readonly type = LOGIN_SOCIAL;
  constructor(public payload: string) { }
}

export class ExistUser implements Action {
  readonly type = EXIST_USER;
  constructor(public payload: string) { }
}

export class GetToken implements Action {
  readonly type = GET_TOKEN;
  constructor(public payload: UserSecret) { }
}

export class SetUser implements Action {
  readonly type = SET_USER;
  constructor(public payload: User) { }
}

export class Register implements Action {
  readonly type = REGISTER;
  constructor(public payload: User) { }
}

export class ExistUserName implements Action {
  readonly type = EXIST_USER_NAME;
  constructor(public payload: string) { }
}

export class ExistUserNameSuccess implements Action {
  readonly type = EXIST_USER_NAME_SUCCESS;
  constructor(public payload: boolean) { }
}

export type All
  = LoginSocial
  | ExistUser
  | GetToken
  | SetUser
  | Register
  | ExistUserName
  | ExistUserNameSuccess;
