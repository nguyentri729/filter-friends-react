import { GET_USER_INFO, SET_USER_INFO } from "../const/index";
export const actSetUserInfo = (data = []) => {
  return {
    type: SET_USER_INFO,
    data
  };
};

export const actGetUserInfo = () => {
  return {
    type: GET_USER_INFO,
  };
};
