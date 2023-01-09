import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import styles from "../styles/ModalTopUp.module.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import topUpAction from "../redux/actions/topUp";

const ModalTopUp = ({ setOpen, open }) => {
  const token = useSelector((state) => state.auth.userData.token);
  const dispatch = useDispatch();
  const [body, setBody] = useState({});

  const changeHandler = (e) =>
    setBody({ ...body, [e.target.name]: e.target.value });

  const topUpSuccess = (directedLink) => {
    setOpen(!open);
    toast.success("Redirecting you to payment page");
    window.open(`${directedLink}`, "_blank");
  };
  const topUpFailed = (errorMsg) => {
    setOpen(!open);
    toast.error(`${errorMsg}`);
  };
  const topupHandler = (e) => {
    e.preventDefault();
    dispatch(topUpAction.topUpThunk(body, token, topUpSuccess, topUpFailed));
  };
  return (
    <>
      {open && (
        <div onSubmit={topupHandler} className={styles.modal}>
          <form className={styles["modal-content"]}>
            <div className={styles["modal-header"]}>
              <p className={styles["modal-title"]}>Top Up Amount</p>
            </div>
            <input
              type="text"
              name="amount"
              className={styles["input-amount"]}
              onChange={changeHandler}
            />
            <div className={styles["modal-footer"]}>
              <button className={styles.confirm} type="submit">
                Confirm
              </button>
              <button onClick={() => setOpen(!open)} className={styles.cancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ModalTopUp;
