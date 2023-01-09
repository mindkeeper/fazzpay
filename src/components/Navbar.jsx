import React, { useState } from "react";
import Image from "next/image";
import defaultImg from "public/images/default.jpg";
import styles from "../styles/Navbar.module.css";
import Sidebar from "./SideBar";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function Navbar({ children }) {
  const [show, setShow] = useState(false);
  const profile = useSelector((state) => state.user.profile);
  const link = process.env.CLOUDINARY_LINK;
  const received = `${styles["green"]} fa-solid fa-arrow-down`;
  const sent = `${styles["red"]} fa-solid fa-arrow-up`;
  const history = useSelector((state) => state.history.data);
  const router = useRouter();
  const currency = (price) => {
    return (
      "Rp. " +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  };
  const notifHandler = (e) => {
    e.preventDefault();
    setShow(!show);
  };
  const sidebarHandler = (e) => {
    e.preventDefault();
    show === true && setShow(false);
  };

  return (
    <>
      <div className={styles["navbar"]}>
        <div className={styles["navbar-left"]}>
          <div className={styles["on-mobile"]} onClick={sidebarHandler}>
            <Sidebar />
          </div>
          <p onClick={() => router.push("/dashboard")} className={styles.title}>
            FazzPay
          </p>
        </div>
        <div className={styles["navbar-right"]}>
          <div className={styles["mobile"]}>
            <div className={styles["img-container"]}>
              <Image
                src={!profile.image ? defaultImg : `${link}/${profile.image}`}
                alt="profile"
                style={{ cursor: "pointer" }}
                layout="fill"
                objectFit="cover"
                onClick={() => router.push("/profile")}
              />
            </div>
            <div className={styles["name-phone"]}>
              <p className={styles["greating"]}>Hello,</p>
              <p
                className={styles["navbar-name"]}
                onClick={() => router.push("/profile")}
              >{`${profile.firstName} ${profile.lastName}`}</p>
              {/* <p className={styles["navbar-phone"]}>+62 8139 3877 7946</p> */}
            </div>
          </div>
          <div className={styles["pc"]}>
            <div className={styles["img-container"]}>
              <Image
                src={!profile.image ? defaultImg : `${link}/${profile.image}`}
                alt="profile"
                style={{ cursor: "pointer" }}
                layout="fill"
                objectFit="cover"
                onClick={() => router.push("/profile")}
              />
            </div>
            <div className={styles["name-phone"]}>
              <p
                className={styles["navbar-name"]}
                onClick={() => router.push("/profile")}
              >{`${profile.firstName} ${profile.lastName}`}</p>
              <p className={styles["navbar-phone"]}>
                {profile.noTelp
                  ? `+62 ${profile.noTelp}`
                  : "Please save yout phone number"}
              </p>
            </div>
          </div>
          <i
            className="fa-regular fa-bell"
            onClick={notifHandler}
            style={{
              fontSize: "1.6rem",
              color: "#4D4B57",
              marginLeft: "1rem",
              cursor: "pointer",
            }}
          ></i>
        </div>
      </div>
      {show && (
        <>
          <div className={styles.modal}>
            {history?.length < 1 ? (
              <p>No transaction yet</p>
            ) : (
              history?.map((data, index) => {
                return (
                  <>
                    <div className={styles.card}>
                      <i className={data.type === "send" ? sent : received}></i>
                      <div>
                        <p className={styles["name"]}>
                          {data.type === "send"
                            ? `Transfer to ${data.fullName}`
                            : data.type === "topup"
                            ? `Top up`
                            : `Accept from ${data.fullName}`}
                        </p>
                        <p className={styles["price"]}>
                          {currency(data.amount)}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })
            )}
          </div>
        </>
      )}
      {children}
    </>
  );
}

export default Navbar;
