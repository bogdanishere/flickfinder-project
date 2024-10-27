import Image from "next/image";
import styles from "../styles/pages/footer.module.scss";
import imageIcon from "@/images/icon-test.png";

function Footer() {
  return (
    <footer className={styles.background}>
      <div className={styles.footer}>
        <div className={styles["footer__logo-box"]}>
          <Image
            src={imageIcon}
            alt="Full logo"
            className={styles["footer__logo"]}
          />
        </div>
        <div className={`${styles["u-center-text"]}`}>
          <div className={styles["footer__copyright"]}>
            <span>
              Build by
              <a
                href="https://github.com/bogdanishere"
                className={styles["footer__link"]}
              >
                Bogdan Vasilescu
              </a>
            </span>
            <span>
              Copyright &copy; by Bogdan Vasilescu. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
