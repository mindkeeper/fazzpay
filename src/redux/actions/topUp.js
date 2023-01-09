import { ACTION_STRING } from "./actionStrings";
import { topUp as topUpApi } from "../../modules/api/topUp";
const { topUp, pending, rejected, fulfilled } = ACTION_STRING;

const topUpPending = () => ({
  type: topUp.concat(pending),
});
const topUpRejected = (error) => ({
  type: topUp.concat(rejected),
  payload: { error },
});
const topUpFulfilled = (data) => ({
  type: topUp.concat(fulfilled),
  payload: { data },
});

const topUpThunk = (body, token, cbSuccess, cbDenied) => {
  return async (dispatch) => {
    try {
      dispatch(topUpPending());
      const result = await topUpApi(body, token);
      dispatch(topUpFulfilled(result.data));
      typeof cbSuccess === "function" &&
        cbSuccess(result.data.data.redirectUrl);
    } catch (error) {
      dispatch(topUpRejected(error));
      typeof cbDenied === "function" && cbDenied(error.response.data.msg);
    }
  };
};

const topUpAction = {
  topUpThunk,
};
export default topUpAction;
