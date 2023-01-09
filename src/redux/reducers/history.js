import { ActionType } from "redux-promise-middleware";
import { ACTION_STRING } from "../actions/actionStrings";

const initialState = {
  isLoading: false,
  isError: false,
  error: false,
  history: [],
  pagination: {},
};

const historyReducer = (prevState = initialState, { type, payload }) => {
  const { transactionHistory } = ACTION_STRING;
  const { Pending, Rejected, Fulfilled } = ActionType;

  switch (type) {
    case transactionHistory.concat("_", Pending):
      return { ...prevState, isLoading: true, isError: false };
    case transactionHistory.concat("_", Rejected):
      return {
        prevState,
        isLoading: false,
        isError: true,
        error: payload.error.response.data.msg,
      };
    case transactionHistory.concat("_", Fulfilled):
      return {
        ...prevState,
        isLoading: false,
        data: payload.data.data,
        pagination: payload.data.pagination,
      };

    default:
      return prevState;
  }
};

export default historyReducer;
