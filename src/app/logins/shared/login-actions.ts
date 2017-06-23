import { Action } from '@ngrx/store';
import { User } from 'app/shared/models/user';
import { UserSecret } from 'app/logins/shared/user-secret';

export const LOGIN = '[Login] Login';
export const EXIST_USER = '[Login] Exist User';
export const SUCCESS_EXIST_USER = '[Login] Success Exist User';
export const GET_TOKEN = '[Login] Get Token';
export const SUCCESS_USER = '[Login] Success User';

export class Login implements Action {
  readonly type = LOGIN;
  constructor(public payload: string) { }
}

export class ExistUser implements Action {
  readonly type = EXIST_USER;
  constructor(public payload: string) { }
}

export class SuccessExistUser implements Action {
  readonly type = SUCCESS_EXIST_USER;
  constructor(public payload: boolean) { }
}

export class GetToken implements Action {
  readonly type = GET_TOKEN;
  constructor(public payload: UserSecret) { }
}

export class SuccessUser implements Action {
  readonly type = SUCCESS_USER;
  constructor(public payload: User) { }
}

export type All
  = Login
  | ExistUser
  | SuccessExistUser
  | GetToken
  | SuccessUser;
