export const initialState = {
  limit: 12,
  q: "",
  order: "",
  sortBy: "",
  skip: 0,
};

export const TYPE_ACTION = {
  CHANGE_SORT: "CHANGE_SORT",
  CHANGE_PAGE: "CHANGE_PAGE",
  CHANGE_QUERY: "CHANGE_QUERY",
  CHANGE_INITIAL: "CHANGE_INITIAL",
  CHANGE_RESET: "CHANGE_RESET",
};

export const filterProductReducer = (state, action) => {
  const { sortBy, order } = action.payload;
  switch (action.type) {
    case TYPE_ACTION.CHANGE_SORT:
      return {
        ...state,
        order,
        sortBy,
      };
    case TYPE_ACTION.CHANGE_PAGE:
      return {
        ...state,
        skip: action.payload,
      };
    case TYPE_ACTION.CHANGE_QUERY:
      return {
        ...state,
        q: action.payload,
      };
    case TYPE_ACTION.CHANGE_INITIAL:
      return {
        ...state,
        ...action.payload,
      };
    case TYPE_ACTION.CHANGE_RESET:
      delete state.q,
        delete state.sortBy,
        delete state.order,
        delete state.skip;
      return {
        ...state,
        limit1: 12,
        q: "",
        sortBy: "",
        order: "",
        skip: "",
      };
    default:
      break;
  }
};
