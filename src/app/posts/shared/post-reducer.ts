import { Customer } from '../../shared/models/customer';
import { HairMenu } from '../../shared/models/hair-menu';
import { HairType } from '../../shared/models/hair-type';
import { Post } from '../../shared/models/post';
import * as Actions from './post-actions';

export interface State {
  hairMenus: HairMenu[];
  hairTypes: HairType[];
  customers: Customer[];
  postUploadIndex: number;
  post: Post;
}

const initialState: State = {
  hairMenus: [],
  hairTypes: [],
  customers: [],
  postUploadIndex: 0,
  post: null
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
