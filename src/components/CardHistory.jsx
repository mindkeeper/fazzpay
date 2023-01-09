import Image from "next/image";
import React from "react";
import styles from "../styles/CardHistory.module.css";
import defaultImg from "public/images/default.jpg";

function CardHistory({ data }) {
  const link = process.env.CLOUDINARY_LINK;
  const currency = (price) => {
    const rupiah = data.type === "send" ? "-RP. " : "+Rp. ";
    return (
      rupiah +
      parseFloat(price)
        .toFixed()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    );
  };

  return (
    <>
      <div className={styles["card"]}>
        <div className={styles["image-name"]}>
          <Image
            src={!data.image ? defaultImg : `${link}/${data.image}`}
            alt="user"
            width={56}
            height={56}
          />
          <div>
            <p className={styles["username"]}>{data?.fullName}</p>
            <p className={styles.status}>{data?.type}</p>
          </div>
        </div>
        <div>
          <p
            className={
              data.type === "send"
                ? styles.paid
                : data.status === "pending"
                ? styles.pending
                : styles.recive
            }
          >
            {currency(data?.amount)}
          </p>
        </div>
      </div>
    </>
  );
}

export default CardHistory;
