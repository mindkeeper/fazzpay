import { ACTION_STRING } from "../actions/actionStrings";

const initialState = {
  isLoading: false,
  isError: false,
  error: null,
  redirectUrl: "",
};

const topUpReducer = (prevState = initialState, { payload, type }) => {
  const { topUp, pending, rejected, fulfilled } = ACTION_STRING;
  switch (type) {
    case topUp.concat(pending):
      return {
        isLoading: true,
        isError: false,
      };
    case topUp.concat(rejected):
      return {
        isLoading: false,
        isError: true,
        error: payload.error.response.data.msg,
      };

    case topUp.concat(fulfilled):
      return {
        isLoading: false,
        isError: false,
        redirectUrl: payload.data.data.redirectUrl,
      };

    default:
      return initialState;
  }
};

export default topUpReducer;
