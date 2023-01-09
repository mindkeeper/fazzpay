import React from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/SideBar";
import styles from "../../styles/Status.module.css";
import { currency } from "../../modules/helpers/currency";
import imgDefault from "public/images/default.jpg";
import Image from "next/image";
function Status() {
  const tfResult = useSelector((state) => state.transfer.transferResult);
  const { status, data } = tfResult;
  const transferData = useSelector((state) => state.transfer.transferData);
  const userBalance = useSelector((state) => state.user.profile.balance);
  const { receiverData } = transferData;
  const link = process.env.CLOUDINARY_LINK;
  const dateInfo = `${transferData.date.toLocaleString("en-US", {
    month: "long",
  })} ${transferData.date.getDate()}, ${transferData.date.getFullYear()} ${transferData.date.getHours()}.${transferData.date.getMinutes()}`;
  console.log(status);
  return (
    <>
      <PageTitle title="Transfer Status" />
      <Navbar />
      <div className={styles["main-status"]}>
        <div className="col-lg-3">
          <Sidebar />
        </div>
        <div className={`col-lg-9 ${styles["status-info"]}`}>
          {status == 200 ? (
            <>
              <div className={styles["success"]}>
                <i className={"fa-solid fa-check"}></i>
              </div>
              <p className={styles["status-text"]}>
                <p>Transfer Success</p>
              </p>
            </>
          ) : (
            <>
              <div className={styles["failed"]}>
                <i className={"fa-sharp fa-solid fa-x"}></i>
              </div>
              <p className={styles["status-text"]}>
                <p>Transfer Failed</p>
              </p>
            </>
          )}
          <div className={styles["info"]}>
            <div className={styles["item-container"]}>
              <p className={styles["info-label"]}>Amount</p>

              <p className={styles["info-value"]}>
                {`Rp. ${currency(transferData.amount)}`}
              </p>
            </div>

            <div className={styles["item-container"]}>
              <p className={styles["info-label"]}>Balance Left</p>
              <p className={styles["info-value"]}>{`Rp. ${currency(
                userBalance - transferData.amount
              )}`}</p>
            </div>

            <div className={styles["item-container"]}>
              <p className={styles["info-label"]}>Date & Time</p>
              <p className={styles["info-value"]}>{dateInfo}</p>
            </div>

            <div className={styles["item-container"]}>
              <p className={styles["info-label"]}>Notes</p>
              <p className={styles["info-value"]}>{transferData.notes}</p>
            </div>
          </div>
          <section className={styles["receiver"]}>
            <p className={styles["title"]}>Transfer to</p>
            <div className={styles["contact-item"]}>
              <div className={styles["img"]}>
                <Image
                  src={`${link}/${receiverData.image}` || imgDefault}
                  alt="profile"
                  width={56}
                  height={56}
                  style={{ borderRadius: "10px" }}
                />
              </div>

              <div className={styles["name-phone"]}>
                <p className={styles["name"]}>
                  {`${receiverData.firstName} ${receiverData.lastName}`}
                </p>

                <p className={styles["phone"]}>{receiverData.noTelp}</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Status;
