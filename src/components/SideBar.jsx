// import { Button, Modal } from "bootstrap";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import authAction from "../redux/actions/auth";
import styles from "../styles/Sidebar.module.css";
import Modal from "./ModalTopUp";

function Sidebar() {
  const [active, setActive] = useState("Dashboard");
  const dispatch = useDispatch();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const logoutSuccess = () => {
    toast.success(`Logout Success`);
    router.push("/login");
  };

  const handleModal = () => setOpenModal(!openModal);
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(authAction.logoutThunk(logoutSuccess));
  };

  useEffect(() => {
    if (
      router.pathname.includes("transfer") ||
      router.pathname.includes("ammount") ||
      router.pathname.includes("confirmation")
    )
      setActive("Transfer");
    if (router.pathname.includes("dashboard")) setActive("Dashboard");
    if (router.pathname.includes("profile")) setActive("Profile");
  }, []);

  const dashboardHandler = (e) => {
    e.preventDefault();
    setActive("Dashboard");

    router.push("/dashboard");
  };
  const transferHandler = (e) => {
    e.preventDefault();
    setActive("Transfer");

    router.push("/transfer");
  };

  const topupHandler = (e) => {
    e.preventDefault();
    setActive("TopUp");
    setShowModal(!showModal);
  };

  const profileHandler = (e) => {
    e.preventDefault();
    setActive("Profile");
    router.push("/profile");
  };

  const toggleHandler = () => {
    setShow(!show);
  };

  return (
    <>
      <div
        className={`${styles["toggle"]} ${styles["close-toggle"]}`}
        onClick={toggleHandler}
      >
        <i className="fa-solid fa-bars"></i>
      </div>
      {show && (
        <>
          <div className={styles["bg-modal"]}></div>
          <div className={styles["toggle-list"]}>
            <div
              className={`${styles.dashboard} ${
                active === "Dashboard" && styles.on
              }`}
              onClick={dashboardHandler}
            >
              {active === "Dashboard" && (
                <div className={styles.rectangle}></div>
              )}
              <i
                className={`bi bi-grid ${styles.icon} ${
                  active === "Dashboard" ? styles.on : styles.off
                }`}
              ></i>
              <p className={`${styles.textDasboard}${styles.close}`}>
                Dashboard
              </p>
            </div>

            <div
              className={`${styles.dashboard} ${
                active === "Transfer" && styles.on
              }`}
              onClick={transferHandler}
            >
              {active === "Transfer" && (
                <div className={styles.rectangle}></div>
              )}
              <i
                className={`fa-solid fa-arrow-up ${styles.icon} ${
                  active === "Transfer" ? styles.on : styles.off
                }`}
              ></i>
              <p className={`${styles.textDasboard}  ${styles.close}`}>
                Transfer
              </p>
            </div>

            <div
              className={`${styles.dashboard} ${
                active === "TopUp" && styles.on
              }`}
              onClick={topupHandler}
            >
              {active === "TopUp" && <div className={styles.rectangle}></div>}
              <i
                className={`fa-solid fa-plus ${styles.icon} ${
                  active === "TopUp" ? styles.on : styles.off
                }`}
              ></i>
              <p className={`${styles.textDasboard} ${styles.close}`}>Top Up</p>
            </div>

            <div
              className={`${styles.dashboard} ${
                active === "Profile" && styles.on
              }`}
              onClick={profileHandler}
            >
              {active === "Profile" && <div className={styles.rectangle}></div>}
              <i
                className={`fa-regular fa-user ${styles.icon} ${
                  active === "Profile" ? styles.on : styles.off
                }`}
              ></i>
              <p className={`${styles.textDasboard} ${styles.close}`}>
                Profile
              </p>
            </div>

            <div className={styles.logout} onClick={handleModal}>
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <p className={styles["close"]}>Logout</p>
            </div>
          </div>
        </>
      )}
      <div className={styles["container"]}>
        <div
          className={`${styles.dashboard} ${
            active === "Dashboard" && styles.on
          }`}
          onClick={dashboardHandler}
        >
          {active === "Dashboard" && <div className={styles.rectangle}></div>}
          <i
            className={`bi bi-grid ${styles.icon} ${
              active === "Dashboard" ? styles.on : styles.off
            }`}
          ></i>
          <p className={`${styles.textDasboard} ${styles.close}`}>Dashboard</p>
        </div>

        <div
          className={`${styles.dashboard} ${
            active === "Transfer" && styles.on
          }`}
          onClick={transferHandler}
        >
          {active === "Transfer" && <div className={styles.rectangle}></div>}
          <i
            className={`fa-solid fa-arrow-up ${styles.icon} ${
              active === "Transfer" ? styles.on : styles.off
            }`}
          ></i>
          <p className={`${styles.textDasboard} ${styles.close}`}>Transfer</p>
        </div>

        <div
          className={`${styles.dashboard} ${active === "TopUp" && styles.on}`}
          onClick={topupHandler}
        >
          {active === "TopUp" && <div className={styles.rectangle}></div>}
          <i
            className={`fa-solid fa-plus ${styles.icon} ${
              active === "TopUp" ? styles.on : styles.off
            }`}
          ></i>
          <p className={`${styles.textDasboard} ${styles.close}`}>Top Up</p>
        </div>

        <div
          className={`${styles.dashboard} ${active === "Profile" && styles.on}`}
          onClick={profileHandler}
        >
          {active === "Profile" && <div className={styles.rectangle}></div>}
          <i
            className={`fa-regular fa-user ${styles.icon} ${
              active === "Profile" ? styles.on : styles.off
            }`}
          ></i>
          <p className={`${styles.textDasboard} ${styles.close}`}>Profile</p>
        </div>

        <div className={styles.logout} onClick={handleModal}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <p className={styles["close"]}>Logout</p>
        </div>
      </div>
      <Modal open={showModal} setOpen={setShowModal} />
      {openModal && (
        <div className={styles.modal}>
          <div className={styles["modal-container"]}>
            <div className={styles["title-modal"]}>
              <p>Logout</p>
            </div>
            <div className={styles.ask}>
              <p>Are you sure want to logout?</p>
            </div>
            <div className={styles["container-btn"]}>
              <div className={`${styles.btn}`} onClick={logoutHandler}>
                <p>YES</p>
              </div>
              <div className={styles["btn-close"]} onClick={handleModal}>
                <p>NO</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
