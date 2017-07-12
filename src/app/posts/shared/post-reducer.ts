import * as Actions from './post-actions';
import { User } from 'app/shared/models/user';
import { UserSecret } from 'app/logins/shared/user-secret';
import { HairMenu } from 'app/shared/models/hair-menu';
import { HairType } from 'app/shared/models/hair-type';
import { Customer } from 'app/shared/models/customer';

export interface State {
  hairMenus: HairMenu[];
  hairTypes: HairType[];
  customers: Customer[];
}

const initialState: State = {
  hairMenus: [],
  hairTypes: [],
  customers: []
};

export function reducer(state = initialState, action: Actions.All): State {
  switch (action.type) {

    case Actions.GET_HAIR_MENUS_SUCCESS:
      action.payload.forEach(x => x.isChecked = false);

      return { ...state, hairMenus: action.payload };

    case Actions.GET_HAIR_TYPES_SUCCESS:
      action.payload.forEach(x => x.isChecked = false);

      return { ...state, hairTypes: action.payload };

    case Actions.GET_CUSTOMERS_SUCCESS:
      return { ...state, customers: action.payload };

    default:
      return state;
  }
}
