import styles from "../styles/Footer.module.css";

const Footer = ({ page }) => {
  return (
    <footer className={styles["footer"]}>
      {page === "landing" ? (
        <div className={styles["top"]}>
          <div className={styles["profile"]}>
            <h1 className={styles["title"]}>Zwallet</h1>
            <p>
              Simplify financial needs and saving much time in banking needs
              with one single app.
            </p>
          </div>
          <hr />
        </div>
      ) : (
        <></>
      )}
      <div className={styles["bottom"]}>
        <div className={styles["contact"]}>
          <p>+62 5637 8882 9901</p>
          <p>contact@zwallet.com</p>
        </div>
        <p>2020 Zwallet. All right reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
