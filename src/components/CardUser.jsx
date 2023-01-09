import Image from "next/image";
import React from "react";
import styles from "../styles/CardHistory.module.css";
import defaultImg from "public/images/default.jpg";
import Link from "next/link";

function Card({ data }) {
  const link = process.env.CLOUDINARY_LINK;

  return (
    <Link
      href={`/transfer/amount?receiver=${data.id}`}
      passHref
      style={{ textDecoration: "none" }}
    >
      <div className={styles["card"]}>
        <div className={styles["image-name"]}>
          <Image
            src={!data.image ? defaultImg : `${link}/${data.image}`}
            alt="user"
            width={56}
            height={56}
          />
          <div>
            <p className={styles["username"]}>
              {`${data?.firstName} ${data?.lastName}`}
            </p>
            <p className={styles["no-telp"]}>
              {data.noTelp ? data.noTelp : "Phone number not available"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
