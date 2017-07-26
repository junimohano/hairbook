import { SocialUser } from 'angular4-social-login/dist';
import { Action } from '@ngrx/store';
import { UserSecret } from 'app/logins/shared/user-secret';
import { User } from 'app/shared/models/user';

export const LOGIN_SOCIAL = '[Login] LOGIN_SOCIAL';
export const EXIST_USER = '[Login] EXIST_USER';
export const GET_TOKEN = '[Login] GET_TOKEN';
export const SET_USER = '[Login] SET_USER';
export const REGISTER = '[Login] REGISTER';
export const EXIST_USER_NAME = '[Login] EXIST_USER_NAME';
export const EXIST_USER_NAME_SUCCESS = '[Login] EXIST_USER_NAME_SUCCESS';

export class LoginSocial implements Action {
  readonly type = LOGIN_SOCIAL;
  constructor(public payload: string) { }
}

export class ExistUser implements Action {
  readonly type = EXIST_USER;
  constructor(public payload: SocialUser) { }
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
