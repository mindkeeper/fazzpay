import { ACTION_STRING } from "./actionStrings";
import { ActionType } from "redux-promise-middleware";
import historyApi from "../../modules/api/history";

const { getHistory } = historyApi;
const { Pending, Rejected, Fulfilled } = ActionType;

const getHistoryPending = () => ({
  type: ACTION_STRING.transactionHistory.concat("_", Pending),
});
const getHistoryRejected = (error) => ({
  type: ACTION_STRING.transactionHistory.concat("_", Rejected),
  payload: { error },
});
const getHistoryFulfilled = (data) => ({
  type: ACTION_STRING.transactionHistory.concat("_", Fulfilled),
  payload: { data },
});

const getHistoryThunk = (token, params) => {
  return async (dispatch) => {
    try {
      dispatch(getHistoryPending());
      const result = await getHistory(token, params);
      dispatch(getHistoryFulfilled(result.data));
    } catch (error) {
      dispatch(getHistoryRejected(error));
    }
  };
};

const historyAction = {
  getHistoryThunk,
};

export default historyAction;
