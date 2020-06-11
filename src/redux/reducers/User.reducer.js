import { GET_USER_INFO, SET_USER_INFO } from "../const/index"

export const userReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USER_INFO:
      return state;
    case SET_USER_INFO:
        return action.data;
    default:
      break;
  }
  return state
};