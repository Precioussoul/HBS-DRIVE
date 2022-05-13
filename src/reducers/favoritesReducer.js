import ACTIONS from "./action";

export const favoritesReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TO_FAVORITES:
      return [...state, { ...action.file }];
    case ACTIONS.UPDATE_FAVORITES:
      return [...state, action.newFavored];
    case ACTIONS.REMOVE_FROM_FAVORITES:
      return state.filter((file) => file.id !== action.id);
    default:
      return state;
  }
};
