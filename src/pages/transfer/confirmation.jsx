import Image from "next/image";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import PageTitle from "../../components/PageTitle";
import Sidebar from "../../components/SideBar";
import css from "../../styles/Confirmation.module.css";
import imgDefault from "public/images/default.jpg";
import { currency } from "../../modules/helpers/currency";
import Modal from "../../components/ModalPin";

function Confirmation() {
  const transferData = useSelector((state) => state.transfer.transferData);
  const { receiverData } = transferData;
  const userBalance = useSelector((state) => state.user.profile.balance);
  const link = process.env.CLOUDINARY_LINK;
  const [open, setOpen] = useState(false);
  const dateInfo = `${transferData.date.toLocaleString("en-US", {
    month: "long",
  })} ${transferData.date.getDate()}, ${transferData.date.getFullYear()} ${transferData.date.getHours()}.${transferData.date.getMinutes()}`;
  return (
    <>
      <PageTitle title="Transfer Confirmation" />
      <Navbar />
      <div className={css.container}>
        <div className={`col-lg-3 ${css.onMobile}`}>
          <Sidebar />
        </div>
        <section className={css.side}>
          <aside className={css["bottom-right"]}>
            <div className={css["right-top"]}>
              <p className={css["transaction"]}>Transfer To</p>
            </div>
            <div className={css["card"]}>
              <div className={css["image-name"]}>
                <Image
                  src={`${link}/${receiverData.image}` || imgDefault}
                  alt="user"
                  width={56}
                  height={56}
                  style={{ borderRadius: "10px" }}
                />
                <div>
                  <p
                    className={css["username"]}
                  >{`${receiverData.firstName} ${receiverData.lastName}`}</p>
                  <p className={css.status}>{receiverData.noTelp}</p>
                </div>
              </div>
            </div>
            <div className={css["right-top2"]}>
              <p className={css["transaction"]}>Details</p>
            </div>
            <div className={css["card-detail"]}>
              <div>
                <p className={css.details}>Amount</p>
                <p className={css.subdetails}>{`Rp. ${currency(
                  transferData.amount
                )}`}</p>
              </div>
            </div>
            <div className={css["card-detail"]}>
              <div>
                <p className={css.details}>Balance Left</p>

                <p className={css.subdetails}>{`Rp. ${currency(
                  userBalance - transferData.amount
                )}`}</p>
              </div>
            </div>
            <div className={css["card-detail"]}>
              <div>
                <p className={css.details}>Date & Time</p>
                <p className={css.subdetails}>{dateInfo}</p>
              </div>
            </div>
            <div className={css["card-detail"]}>
              <div>
                <p className={css.details}>Notes</p>
                <p className={css.subdetails}>{transferData.notes || "-"}</p>
              </div>
            </div>
            <div className={css.continue1}>
              <button className={css.continue} onClick={() => setOpen(true)}>
                Continue
              </button>
            </div>
          </aside>
        </section>
      </div>
      <Footer />
      <Modal
        open={open}
        setOpen={setOpen}
        amount={transferData.amount}
        notes={transferData.notes}
        receiverId={receiverData.id}
      />
    </>
  );
}

export default Confirmation;
